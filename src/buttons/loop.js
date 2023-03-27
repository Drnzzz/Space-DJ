const { QueueRepeatMode } = require('discord-player');
const { EmbedBuilder } = require('discord.js');
module.exports = async ({  inter, queue }) => { 

    const methods = ['Off', 'Musica', 'Fila'];

    if (!queue || !queue.playing) return inter.reply({ content: `❌ - Nenhuma musica tocando...`, ephemeral: true });

    const repeatMode = queue.repeatMode

    if (repeatMode === 0) queue.setRepeatMode( QueueRepeatMode.TRACK)

    if (repeatMode === 1 ) queue.setRepeatMode( QueueRepeatMode.QUEUE)

    if (repeatMode === 2) queue.setRepeatMode( QueueRepeatMode.OFF)
    
    const embed = new EmbedBuilder()
        .setColor('Orange')
        .setDescription(`**🔁 - Loop setado no modo:** ***${methods[queue.repeatMode]}***`);

    return inter.reply({ embeds: [embed] });



}