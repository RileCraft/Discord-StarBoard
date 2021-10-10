module.exports = {
    name: 'messageReactionAdd',
    run: async (reaction, user, client, Discord) => {
        const name = reaction.emoji.name
        const message = reaction.message
        const size = reaction.message.reactions.cache.size
        const reqSize = client.config.starboard.requiredStars || process.env.requiredStars
        const sbchannel = message.guild.channels.cache.get(await db.get(message.guild.id + ".starboardID"))
        const allowBot = client.config.starboard.allowBots || process.env.allowBots
        let msg = message.content
const data = await db.get(`${message.guild.id}.${message.id}`)
        if (message.content === "") msg = "Visit Message"
        if (!message.guild) throw new Error("No guild found.")
        if (!sbchannel) throw new Error("Invalid starboard channel provided.")
        if (!reqSize) throw new Error("No required amount of stars provided in config.")
        if (!allowBot && user.bot) return;

if (data) {
	message.guild.channels.cache.get(data.channelID).messages.fetch(data.msgid).then(x => {
	const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp(message.createdTimestamp)
            .setDescription(`[${msg}](https://discord.com/channels/${message.guild.id}/{message.channel.id}/${message.id})`)
            .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
            .setImage(message.attachments.map(x => x.url)[0] ?? "")
        x.edit({ embeds: [embed], content: `<#${message.channel.id}> | ⭐ **${size}**` })
        })
	} else {
        if (name !== "⭐" && size < reqSize) return;
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp(message.createdTimestamp)
            .setDescription(`[${msg}](https://discord.com/channels/${message.guild.id}/{message.channel.id}/${message.id})`)
            .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
            .setImage(message.attachments.map(x => x.url)[0] ?? "")
        const starb = await sbchannel.send({ embeds: [embed], content: `<#${message.channel.id}> | ⭐ **${size}**` })
        await db.set(`${message.guild.id}.${message.id}`, {
"channelID": message.channel.id,
"starmsgID": starb.id,
"msgid": message.id,
"guildID": message.guild.id
})
        }
    }
}