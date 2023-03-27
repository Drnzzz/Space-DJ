const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `❌ - Nenhuma musica tocando...`, ephemeral: true });

    const track = queue.current;

    const methods = ['disabled', 'track', 'queue'];

    const timestamp = queue.getPlayerTimestamp();

    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    const progress = queue.createProgressBar();
    

    const embed = new EmbedBuilder()
    .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
    .setThumbnail(track.thumbnail)
    .setDescription(`Volume: **${queue.volume}**%\nDuração: **${trackDuration}**\nTempo:: ${progress}\nLoop mode: **${methods[queue.repeatMode]}**\nPedido Por: ${track.requestedBy}`)
    .setFooter({ text: 'Space DJ - Versão 2.0 🎼', iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
    .setColor('Orange')
    .setTimestamp()

    inter.reply({ embeds: [embed], ephemeral: true });
}