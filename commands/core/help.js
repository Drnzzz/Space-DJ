const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Veja meus comandos!",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('Orange')
        .setDescription('🤖- Veja meus comando abaixo:')
        .addFields([ { name: `Ativo - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') } ])
        .setTimestamp()
        .setFooter({ text: 'Space DJ - Versão 2.0 🎼', iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});

        inter.reply({ embeds: [embed] });
    },
};