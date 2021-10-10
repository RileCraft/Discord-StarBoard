const { exec } = require("child_process")
exec(`git pull ${process.env.url} && node bot.js`, (error, stdout) => {
	if (stdout) console.log("done")
	})