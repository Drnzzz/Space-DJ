const ms = require('ms');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'Pula para o tempo desejado!',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'Tempo desejado!',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `⏹ - ${inter.reply}, Nenhuma musica tocando...`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.current.durationMS) return inter.reply({ content:`O tempo indicado é maior que o tempo total da música atual ${inter.member}... tentar novamente? ❌\n*Tente, por exemplo, um tempo válido como **5s, 10s, 20 segundos, 1m**...*`, ephemeral: true });

        await queue.seek(timeToMS);

        inter.reply({ content: `⏰ - Tempo definido na música atual **${ms(timeToMS, { long: true })}** ✅`});
    },
};