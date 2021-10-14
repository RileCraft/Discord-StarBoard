const { Collection, Client, Discord, MessageEmbed, Intents, Options} = require('discord.js')
const chalk = require('chalk')
const db = require('quick.db')
require("dotenv").config()
const client = new Client({
	makeCache: Options.cacheEverything(),
    intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
],
partials: ["CHANNEL"]
})
global.HOME = __dirname
global.db = db
client.config = require(`${HOME}/config.json`)
require('figlet')("StarBoard", (err, data) => console.log(data))
client.login(process.env.token || client.config.bot.token)
exports.client = client
client.commands = new Collection()
client.aliases = new Collection()
const { Handler } = require(`${HOME}/Home/Classes/Handler`)
Handler.loadCommands(client)    // COMMAND HANDLER
Handler.loadEvents(client)     // EVENT HANDLER
Handler.loadButtons(client)     // BUTTON HANDLER
Handler.loadSelectMenus(client)     // SELECTMENUS HANDLER
Handler.getSlashCount() // TO GET SLASH COUNT.