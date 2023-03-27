const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'remove',
    description: "Remove a musica da fila!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'Nome/Url da musica desejada!',
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
        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `⏹ - ${inter.member}, Nenhuma musica tocando...`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `You have to use one of the options to remove a song ${inter.member}... try again ? ❌`, ephemeral: true });

        if (track) {

        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.remove(song)
                const removetEmbed = new EmbedBuilder()
                    .setColor('Orange')
                    .setDescription(`**🔨 - Musica: ${track} removida!**`);

            inter.reply({ embeds: [removetEmbed] });
            }

        }

        return inter.reply({ content: `❌ - Não foi possível encontrar ${track} ${inter.member}...`, ephemeral: true });    
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks[index].title

            if (!trackname) return inter.reply({ content: `❌ - ${inter.member}, Isso parace não existir!`, ephemeral: true });   

            queue.remove(index);
            
            const removeEmbed = new EmbedBuilder()
                .setColor('Orange')
                .setDescription(`**🔨 - Musica: ${trackname} removida!**`);

            inter.reply({ embeds: [removeEmbed] });
        }


         
    }
}