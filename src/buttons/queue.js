const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `❌ - Nenhuma musica tocando...`, ephemeral: true });

    if (!queue.tracks[0]) return  inter.reply({ content: `❌ - ${inter.member}, Nenhuma musica a seguir...`, ephemeral: true });

        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.length;

        const nextSongs = songs > 5 ? `e **${songs - 5}** outra(s) musica(s)...` : `Na playlist: **${songs}** musica(s)...`;

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} **(Pedido por: ${track.requestedBy.username})**`)

        const embed = new EmbedBuilder()
        .setColor('Orange')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({name: `Fila do Servidor - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`**🎶 - Atual:** ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: 'Space DJ - Versão 2.0 🎼', iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});

        inter.reply({ embeds: [embed], ephemeral: true });
}
