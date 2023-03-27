const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'jump',
    description: "Pula para a musica da fila",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'Nome/Url da musica que deseja pular!',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'Lugar da musica na fila!',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `⏹ - ${inter.member}, Nenhuma musica tocando...`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `❓ - ${inter.member}, Use uma das opções para pular!`, ephemeral: true });

            if (track) {
        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.skipTo(song)
                const skipedEmbed = new EmbedBuilder()
                    .setColor('Orange')
                    .setDescription(`**⏩ - Skipado Para: ${trackname}**`);
    
                inter.reply({ embeds: [skipedEmbed] });
            }
        }
        const findEmbed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle(`**❓ - Não consegui achar essa musica!**`)
            .setDescription(`🎶 - Musica: ${track}`)

        inter.reply({ embeds: [findEmbed] });
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks[index].title
        if (!trackname) return inter.reply({ content: `❓ - ${inter.member}, Isso para não existir...`, ephemeral: true });   
        queue.skipTo(index);
        const jumpEmbed = new EmbedBuilder()
            .setColor('Orange')
            .setDescription(`**⏩ - Pulado Para: ${trackname}**`);

        inter.reply({ embeds: [jumpEmbed] });
    }
         
    }
}