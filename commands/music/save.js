const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'save',
    description: 'Salva a musica atual!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `⏹ - ${inter.member}, Nenhuma musica tocando...`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`:arrow_forward: ${queue.current.title}`)
                    .setURL(queue.current.url)
                    .addFields(
                        { name: ':hourglass: Duração:', value: `\`${queue.current.duration}\``, inline: true },
                        { name: 'Cantor:', value: `\`${queue.current.author}\``, inline: true },
                        { name: 'Views :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                        { name: 'URL:', value: `\`${queue.current.url}\`` }
                    )
                    .setThumbnail(queue.current.thumbnail)
                    .setFooter({text:`Salvo de: ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.reply({ content: `📩 - Musica salva na sua DM!`, ephemeral: true });
        }).catch(error => {
            return inter.reply({ content: `❌ - Erro, Abra sua DM!`, ephemeral: true });
        });
    },
};