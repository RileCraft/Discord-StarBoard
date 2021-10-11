module.exports = {
    name: 'messageReactionRemove',
    run: async (reaction, user, client, Discord) => {
        const name = reaction.emoji.name
        const message = reaction.message
        let size = message.reactions.cache.first()
        if (!size) size = 0 
        else size = size.count
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

        if (data && size < reqSize) {
                    const i = sbchannel.messages.cache.get(data.starmsgID)
                   i.delete()
                   await db.delete(`${message.guild.id}.${message.id}`)
        }
        
    }
}