const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'back',
    description: "Volta na musica anterior!",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `⏹ - ${inter.member}, Nenhuma musica tocando...`, ephemeral: true });

        if (!queue.previousTracks[1]) return inter.reply({ content: `⏮ - ${inter.member}, Sem musicas anteriores...`, ephemeral: true });

        await queue.back();

        const backEmbed = new EmbedBuilder()
            .setColor('Orange')
            .setDescription(`**⏮ - Tocando Musica Anterior**`);

        inter.reply({ embeds: [backEmbed] });
    },
};