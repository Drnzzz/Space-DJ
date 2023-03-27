const { QueryType } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'play',
    description: "Toca uma musica!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'Musica desejada!',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
	await inter.deferReply();
        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `${inter.member}, Sem resultados...`, ephemeral: true });

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            initialVolume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);
            return inter.editReply({ content: `${inter.member}, Não consegui me conectar no canal... ❌`, ephemeral: true});
        }

        const embed = new EmbedBuilder()
        .setAuthor({ name: `Carregando sua ${res.playlist ? 'playlist' : 'musica'}...`, iconURL: 'https://media4.giphy.com/media/LwBTamVefKJxmYwDba/giphy.gif' })
        .setColor('Orange');
    
        const loadingMessage = await inter.editReply({ embeds: [embed] });
    
        setTimeout(async () => {
            const newEmbed = new EmbedBuilder()
                .setColor('Orange')
                .setDescription(`**${res.playlist ? 'Playlist' : 'Musica'} | Adicionada Na Fila ✅**`);
    
            await loadingMessage.edit({ embeds: [newEmbed] });
        }, 3000);
    

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
