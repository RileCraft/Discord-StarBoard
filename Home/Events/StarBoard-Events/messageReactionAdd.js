module.exports = {
    name: 'messageReactionAdd',
    run: async (reaction, user, client, Discord) => {
        const name = reaction.emoji.name
        if (name != "⭐") return;
        const message = reaction.message
        const author = message.author
        const size = reaction.count 
        const reqSize = await db.get(message.guild.id + ".starboard.requiredStars")
        const sbchannel = message.guild.channels.cache.get(await db.get(message.guild.id + ".starboard.channelID"))
        const allowBot = await db.get(message.guild.id + ".starboard.allowBots") ?? true
        let msg = message.content
        const data = await db.get(`${message.guild.id}.${message.id}`)
        if (message.content === "") msg = "Visit Message"
        if (!message.guild) throw new Error("No guild found.")
        if (!sbchannel) throw new Error("Invalid starboard channel provided.")
        if (!reqSize) throw new Error("No required amount of stars provided in config.")
        if (!allowBot && user.bot) return;
        if (data) {
            if (size < reqSize) return;
                    let msg = data.message.content
                    const ii = await db.get(`${message.guild.id}.${data.message.id}`)
                    const i = await sbchannel.messages.fetch(data.starmsgID)
                    if (data.message.content === "") msg = "Visit Message"
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTimestamp(data.message.createdTimestamp)
                        .setDescription(`[${msg}](https://discord.com/channels/${data.guildID}/${message.channel.id}/${data.message.id})`)
                        .setAuthor(data.user.tag, data.user.avatar)
                        .setImage(data.message.attachment)
                    i.edit({
                        embeds: [embed],
                        content: `<#${data.channelID}> | ⭐ **${size}**`
                    })
        } else {
            if (size < reqSize) return;
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp(message.createdTimestamp)
                .setDescription(`[${msg}](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .setAuthor(author.tag, author.displayAvatarURL({
                    dynamic: true
                }))
                .setImage(message.attachments.map(x => x.url)[0] ?? "")
            const starb = await sbchannel.send({
                embeds: [embed],
                content: `<#${message.channel.id}> | ⭐ **${size}**`
            })
            
            await db.set(`${message.guild.id}.${message.id}`, {
                "channelID": message.channel.id,
                "starmsgID": starb.id,
                "msgid": starb.id,
                "message": {
                    content: message.content,
                    createdTimestamp: message.createdTimestamp,
                    id: message.id,
                    attachment: message.attachments.map(x => x.url)[0] ?? ""

                },
                user: {
                    tag: author.tag,
                    avatar: author.displayAvatarURL({
                        dynamic: true
                    })
                },
                "guildID": message.guild.id
            })
            
        }
        
    }
}