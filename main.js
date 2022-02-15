import DiscordJS, { Intents, Interaction, ReactionUserManager } from 'discord.js';
import dotenv from 'dotenv';
import commands from './commands.js';

dotenv.config();


const client = new DiscordJS.Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
}) 
client.commands = new DiscordJS.Collection();

// make sure we only read javascript files
// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// for(const file of commandFiles){
//     const command = require(`./commands/${file}`);

//     client.commands.set(command.name, command);
// }

client.on('ready', () => {
    console.log(`${client.user.tag} is ready!`);
})

client.on('messageCreate', commands);






client.login(process.env.JACK);