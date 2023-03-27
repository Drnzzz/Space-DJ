const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'Limpa a fila!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `⏹ - ${inter.member}, Nenhuma musica tocando...`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `🔜 - ${inter.member}, Sem musicas a seguir...`, ephemeral: true });

        await queue.clear();

        const clearEmbed = new EmbedBuilder()
            .setColor('Orange')
            .setDescription(`**🗑 - Fila Limpa**`);

        inter.reply({ embeds: [clearEmbed] });
    },
};