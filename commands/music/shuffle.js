module.exports = {
    name: 'shuffle',
    description: 'Embaralhar as musicas!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `⏹ - ${inter.member}, Nenhuma musica tocando...`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `❌ - ${inter.member}, Nenhuma música na fila após a atual...`, ephemeral: true });

        await queue.shuffle();

        return inter.reply({ content:`✅ - Fila aleatória **${queue.tracks.length}** música(s) !`});
    },
};