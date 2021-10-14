module.exports = {
    name: "setup",
    anyUserPermissions: ["MANAGE_CHANNELS", "MANAGE_GUILD", "ADMINISTRATOR"],
    run: async (client, message, args, Discord) => {
        try {
        const initialEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Please provide the channel ID of the starboard channel.")

        const starEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Please provide the minimum number of stars required.")

        const botsEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Should bot(s) reactions be counted? true / false")

        await message.channel.send({
            embeds: [initialEmbed]
        })
        const filter = m => m.author.id == message.author.id && !m.bot

        const init = await message.channel.awaitMessages({
            filter,
            max: 1,
            time: 30000,
            errors: ['time']
        })
        if (!init) return;
        let content1 = init.map(x => x.content)[0]
        if (isNaN(parseInt(content1))) message.channel.send("Please provide a channel ID.")
        else if (!await message.guild.channels.fetch(content1)) message.channel.send("Please provide a valid channel ID.")
        else if (message.guild.channels.cache.get(content1)?.type != "GUILD_TEXT") message.channel.send("Please provide a text channel ID.")
        else {
            await db.set(message.guild.id + ".starboard.channelID", content1)

            await message.channel.send({
                embeds: [starEmbed]
            })
            const star = await message.channel.awaitMessages({
                filter,
                max: 1,
                time: 30000,
                errors: ['time']
            })
            if (!star) return;
            let content2 = star.map(x => x.content)[0]
            if (isNaN(parseInt(content2))) message.channel.send("Please provide a valid number.")
            else if (parseInt(content2) < 0) message.channel.send("Please provide a number greater than 0.")
            else if (content2.includes(".")) message.channel.send("Provided number must not be a decimal.")
            else {
                await db.set(message.guild.id + ".starboard.requiredStars", content2)

                await message.channel.send({
                    embeds: [botsEmbed]
                })
                const bots = await message.channel.awaitMessages({
                    filter,
                    max: 1,
                    time: 30000,
                    errors: ['time']
                })
                if (!bots) return;
                let content3 = bots.map(x => x.content)[0]
                if (!["true", "false"].some(i => i == content3)) message.channel.send("Please provide either `true` or `false`.")
                else {
                    await db.set(message.guild.id + ".starboard.allowBots", content3)

                    message.channel.send("Server configuration completed. You may now proceed to use starboard.")
                }
            }
        }
    } catch (error) {message.channel.send("Operation cancelled as user didn't send response within 30secs.")}
    }
}