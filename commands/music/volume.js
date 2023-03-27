const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'Ajuste!',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'Valor do volume!',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `⏹ - ${inter.member}, Nenhuma musica tocando...`, ephemeral: true });
        const vol = inter.options.getNumber('volume')

        if (queue.volume === vol) return inter.reply({ content: `🔊 - ${inter.member}, Volume já setado!`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `🔊 - Volume alterado para: **${vol}**/**${maxVol}**%` : `❓- ${inter.member}, Erro!`});
    },
};