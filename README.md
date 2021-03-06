<p align="center"><img src="https://media.discordapp.net/attachments/774290264764055582/898463519933071381/1634280787072.png"><br>
<a href="https://discord.gg/zqySsESftt"><img src="https://img.shields.io/badge/discord-invite-5865f2?style=for-the-badge&logo=discord&logoColor=white"></a>
<img src="https://img.shields.io/badge/version-1.0.0-05122A?style=for-the-badge">
<img src="https://img.shields.io/github/issues/RileCraft/Discord-StarBoard.svg?style=for-the-badge">
<img src="https://img.shields.io/github/forks/RileCraft/Discord-StarBoard.svg?style=for-the-badge"></p>

# Introduction
Welcome to my another project! This is a template for having starboard in multiple guilds as it stores data in a database. It is a simple starboard so you can customize it to your needs. If you encounter any bugs make sure to report to us!

# Important Notes
* All the informatiom about the handler used in this template can be found here. [Click to visit handler repo](https://github.com/RileCraft/DiscordBot-Template).
* This is for Discord.JS V13.
* You are recommended to use NodeJS V16 and above.
* This template uses **quick.db** as its default database with all the database already in async. If you want to use for eg: **quickmongo** then you can by seeing the notes for it below.

# Configuration
* You can use either `config.json` or `.env` whichever you prefer most.
* Fill the details in either of the files.
* Make sure to use NodeJS V16.
* To start the setup of the starboard for the guild, run the command `(your set prefix)setup` and then fill the details as it asks you.

# Migration to quickmongo
If you already started using starboard using `quick.db` but then want to use `quickmongo` without losing data then do this.
* Upgrade or downgrade to `quickmongo V3.0.2` **Important**
* Eval this code.
```js
const db = require("quick.db");
const { Database } = require("quickmongo");
const mongo = new Database("Put Your MongoDB URI");

function importData() {
    const data = db.all();
    mongo.import(data).then(() => {
        console.log("Successfully imported data!");
    });    
}

mongo.on("ready", () => importData());
```
* After it sends the success message. You can start using ur mongodb for the bot. The database is already used with async/await, so you don't have to do anything.
