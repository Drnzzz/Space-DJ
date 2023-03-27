const { EmbedBuilder } = require('discord.js')

module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `❌ - Nenhuma musica tocando...`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `⏮ - ${inter.member}, Sem musicas anteriores...`, ephemeral: true });

    await queue.back();

    const backEmbed = new EmbedBuilder()
        .setColor('Orange')
        .setDescription(`**⏮ - Tocando Musica Anterior**`);

    inter.reply({ embeds: [backEmbed] });
}
