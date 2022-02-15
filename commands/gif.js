import fetch from 'node-fetch'

const prefix = '!';


export default async function (message, args) {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    args = message.content.slice(prefix.length).split(/ +/);
    // const command = args.shift().toLowerCase();

    let url = `https://g.tenor.com/v1/search?q=${args}&key=${process.env.TENORKEY}&limit=8`
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
    const index = Math.floor(Math.random() * json.results.length);
    message.channel.send(json.results[index].url);
    message.channel.send("GIF from Tenor " + args);
    
}

