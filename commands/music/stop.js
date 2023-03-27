const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'stop',
    description: 'Para a musica!',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content:`⏹ - ${inter.member}, Nenhuma musica tocando...`, ephemeral: true });

        queue.destroy();

        const stopEmbed = new EmbedBuilder()
            .setColor('Orange')
            .setDescription(`**⏹ - Musica parada!**`);

        inter.reply({ embeds: [stopEmbed] });
    },
};