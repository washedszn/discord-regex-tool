require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let cmd = msg.content.split(' ')[0].toLowerCase();
    let regex = msg.content.replace(/^![a-z]+ /g, '');

    if (cmd === '!regex') {
        let result = regex.split('')
        result = result.filter((e, i) => e != result[i - 1]).join('')
        result = result.replace(/(?<=[^!yil1o0a4e3\W])/gmi, '+')
        result = result.replace(/[!il1]+/gi, '[il1!]+')
        result = result.replace(/[o0]+/gi, '[o0]+')
        result = result.replace(/[a4e3]+/gi, '[a4e3]+')
        // result = result.replace(/[a4]+/gi, '[a4]+')
        // result = result.replace(/[e3]+/gi, '[e3]+')
        result = result.replace(/\+\*/gi, '*')
        result = result.replace(/\++/gi, '+')

        const filter = m => m.author.id == msg.author.id;
        const collector = msg.channel.createMessageCollector(filter, { time: 15000 });
        msg.channel.send('Please enter a white space filler. Send `blank` if empty.')

        collector.on('collect', m => {
            result = m.content != 'blank' ? result.replace(' ', m.content) : null;
            collector.stop()
        });

        collector.on('end', () => {
            const embed = new Discord.MessageEmbed()
            .addFields(
                { name: 'Input:', value: `\`${regex}\`` },
                { name: 'Output:', value: `\`${result}\`` }
            )
            msg.channel.send(embed)
        });
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);