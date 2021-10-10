const { exec } = require("child_process")
exec(`git pull ${process.env.url} && node bot.js`)