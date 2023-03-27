const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Veja meu ping!",
    async execute({ client, inter }) {

        const embed = new EmbedBuilder()
            .setColor('Orange')
            .setFooter({ text: 'Space DJ - Versão 2.0 🎼', iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
            .addFields({ name: `🛰️ - Latencia API: ${Math.round(client.ws.ping)}ms`, value: '\u200B', inline: false })
            .addFields({ name: `💗 - Última pulsação calculada: ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} Atras`, value: '\u200B', inline: true })

        const m = await inter.reply({ embeds: [embed] });
    },
};
