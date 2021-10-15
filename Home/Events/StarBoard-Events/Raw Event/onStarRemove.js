module.exports = {
    name: "onStarRemove",
    clientPermissions: ["MANAGE_MESSAGES"],
    run: async(message, emoji, user, client, Discord) => {
        const data = await db.get(`${message.guild.id}.${message.id}`)
        if (!data) return;
        const reaction = message.reactions.cache.get(emoji)
        let size = reaction?.count 
        if (!size) size = 0 
        const reqSize = await db.get(message.guild.id + ".starboard.requiredStars")
        const sbchannel = message.guild.channels.cache.get(await db.get(message.guild.id + ".starboard.channelID"))
        const allowBot = await db.get(message.guild.id + ".starboard.allowBots") ?? true
        let msg = message.content
        if (message.content === "") msg = "Visit Message"
        if (!message.guild) throw new Error("No guild found.")
        if (!sbchannel) throw new Error("Invalid starboard channel provided.")
        if (!reqSize) throw new Error("No required amount of stars provided in config.")
        if (!allowBot && user.bot) return;

        if (data && size < reqSize) {
                    const i = await sbchannel.messages.fetch(data.starmsgID)
                   i.delete()
                   await db.delete(`${message.guild.id}.${message.id}`)
        }
    }
}