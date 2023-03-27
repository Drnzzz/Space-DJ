const { EmbedBuilder } = require('discord.js');

module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `❌ - Nenhuma musica tocando...`, ephemeral: true });
    
    const success = queue.skip();

    const embed = new EmbedBuilder()
        .setColor('Orange')
        .setDescription(`**⏩ - Musica skipada com sucesso!**`);

    return inter.reply({ embeds: [embed] });
}