import ytdl from 'ytdl-core';
import ytSearch from 'yt-search';
import { joinVoiceChannel } from "@discordjs/voice";


export default async function (message, args){
    const prefix = '!';
    args = message.content.slice(prefix.length).split(/ +/);


    // Get current user's voice channel
    // If the user is not in voice channel
    const voiceChannel = message.member.voice.channel;
    console.log(voiceChannel);
    if(!voiceChannel) return message.channel.send('You need to be in a voice channel');

    // Check for having right permissions\
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')) return message.channel.send('You do not have the correct permissions');
    if(!permissions.has('SPEAK')) return message.channel.send('You do not have the correct permissions');


    // Check whether they actually send an argument, not only !play command
    if(!args.length) return message.send('You need to send an argument buddy!');

    // Create a variable that is going to hold our connections
    // This is where our bot is going to join the user's voice channel
    const connection = await voiceChannel.join();

    // Create a function that is going to find the video based on user given arguments
    const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);
        // If videoResult length is greater than 1, then get the first element in the array, BECAUSE YouTube SEACH WILL GIVE BACK MORE THAN 1 RESULT using keyword
        // Narrows search result into one element
        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }


    // Create a variable that is going to hold the video that we find from the videoFinder()
    // args.join() basically joins the arguments
    const video = await videoFinder(args.join(' '));

    // Next what we want to do when we get the video
    if(video){
        // Get audio only
        const stream = ytdl(video.url, {filter: 'audioonly'});
        // Next actually play this
        connection.play(stream, {seek: 0, volume: 1})
        // let the bot leave once it is done playing the song
        .on('finish', () => {
            voiceChannel.leave();
        })

        await message.reply(`:thumpsup: Now playing *${video.title}*`);

    }
    else{
        message.channel.send('No video results found');
    }


}