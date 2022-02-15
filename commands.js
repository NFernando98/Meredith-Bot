import ping from './commands/ping.js';
import gif from './commands/gif.js';
import play from './commands/play.js'

const commands = { ping, gif, play };


// 'command' below is like !gif or !ping AND args is any words that come after the command 
export default async function(msg){
    let tokens = msg.content.split(" ");
    let command = tokens.shift();

    // A valid command is only when there is an exclamation point in front of it
    if(command.charAt(0) === "!"){
        command = command.substring(1);

        // This is like commands.gif(msg,tokens)
        // Because [command] will be equal to gif
        commands[command](msg, tokens);
    }
}