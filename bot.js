// Reference all the cool packages I need for this to work as well as my settings file which holds
//my unique token & preferred prefix 
const botSettings = require("./botSettings.json");
const Discord = require("discord.js"); //requires the node module that I installed and saved 
const fs = require("fs");
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.mutes = require('./mutes.json')

//read and load all the JS files in the cmds folder
fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if (jsfiles.length <= 0){
		console.log("No commands to load!");
		return;
	}

	console.log(`Loading ${jsfiles.length} commands!`);

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});

});

bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);

	//the syntax for await is (blah = await expression) where the 
	//expression is a Promise or any val to wait for
	//this snippet generates an invite that you can use to invite your bot to a discord server 
	// try {
	// 	let link = await bot.generateInvite(["ADMINISTRATOR"]);
	// 	console.log(link);
	// } catch(e) {
	// 	console.log(e.stack);
	// }
});


//Fires every time a message is sent
bot.on("message", async message => {
	//did the bot send this?  TERMINATE
	if(message.author.bot) return;

	//was the message a dm?  TERMINATE
	if(message.channel.type === 'dm') return;

	//Split the message into an array, store the first element in a variable
	//then store everything after it into an array
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
	console.log(args);

	//if you don't start with the accepted prefix TERMINATE
	if(!command.startsWith(prefix)) return;

	//call the run function for whatever command I type
	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args);

});


bot.login(botSettings.token);