module.exports = {
    name: 'messageReactionAdd',
    run: async (reaction, user, client, Discord) => {
        const name = reaction.emoji.name
        const message = reaction.message
        const size = reaction.message.reactions.cache.first().count
        const reqSize = await db.get(message.guild.id + ".starboard.requiredStars")
        const sbchannel = message.guild.channels.cache.get(await db.get(message.guild.id + ".starboard.channelID"))
        const allowBot = client.config.starboard.allowBots || process.env.allowBots
        let msg = message.content
        const data = await db.get(`${message.guild.id}.${message.id}`)
        if (message.content === "") msg = "Visit Message"
        if (!message.guild) throw new Error("No guild found.")
        if (!sbchannel) throw new Error("Invalid starboard channel provided.")
        if (!reqSize) throw new Error("No required amount of stars provided in config.")
        if (!allowBot && user.bot) return;

        if (data) {
            message.guild.channels.cache.get(data.channelID).messages.fetch(data.message.id).then(x => {
                (async () => {
                    let msg = data.message.content
                    const ii = await db.get(`${message.guild.id}.${data.message.id}`)
                    const i = sbchannel.messages.cache.get(data.starmsgID)
                    if (data.message.content === "") msg = "Visit Message"
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTimestamp(data.message.createdTimestamp)
                        .setDescription(`[${msg}](https://discord.com/channels/${data.guildID}/{message.channel.id}/${data.message.id})`)
                        .setAuthor(data.user.tag, data.user.avatar)
                        .setImage(data.message.attachment)
                    i.edit({
                        embeds: [embed],
                        content: `<#${data.channelID}> | ⭐ **${data.size}**`
                    })
                })()
            })
        } else {
            if (name !== "⭐" && size < reqSize) return;
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp(message.createdTimestamp)
                .setDescription(`[${msg}](https://discord.com/channels/${message.guild.id}/{message.channel.id}/${message.id})`)
                .setAuthor(user.tag, user.displayAvatarURL({
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
                    tag: user.tag,
                    avatar: message.author.displayAvatarURL({
                        dynamic: true
                    })
                },
                "size": size,
                "guildID": message.guild.id
            })
        }
    }
}