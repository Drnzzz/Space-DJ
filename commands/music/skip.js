module.exports = {
    name: 'skip',
    description: 'Skipa a musica!',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content:`⏹ - ${inter.member}, Nenhuma musica tocando...`, ephemeral: true });

        const success = queue.skip();

        return inter.reply({ content: success ? `⏩ - Musica skipada!` : `❓- ${inter.member}, Erro!`});
    },
};