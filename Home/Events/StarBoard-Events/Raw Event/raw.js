module.exports = {
    name: "raw",
    clientPermissions: ["MANAGE_MESSAGES"],
    run: async(packet) => {
        if (!["MESSAGE_REACTION_ADD","MESSAGE_REACTION_REMOVE"].some(x => x.includes(packet.t))) return;
        const { client } = require(HOME + "/bot")
        const Discord = require("discord.js")
        if (client.channels.cache.get(packet.d.channel_id).messages.cache.get(packet.d.message_id)) return;
        const guild = client.guilds.cache.get(packet.d.guild_id)
        const channel = await guild.channels.fetch(packet.d.channel_id)
        const message = await channel.messages.fetch(packet.d.message_id)
        const user = client.users.cache.get(packet.d.user_id)
        const emoji = packet.d.emoji.name
        if (packet.t == 'MESSAGE_REACTION_ADD') {
            client.emit('onStarAdd', message, emoji, user, client, Discord)
                    }
                    else if (packet.t == 'MESSAGE_REACTION_REMOVE') {
                        client.emit('onStarRemove', message, emoji, user, client, Discord)
                                }
    }
}