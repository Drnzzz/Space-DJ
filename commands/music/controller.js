const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'controller',
    description: "Seta o canal de controle!",
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'channel',
            description: 'Canal que vc deseja enviar!',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    async execute({ inter, client }) { 
      let Channel = inter.options.getChannel('channel');
      if (Channel.type !== 0) return inter.reply({ content: `❓ - Envie em um canal de txt!`, ephemeral: true})

    
      const embed = new EmbedBuilder()
       .setTitle('🔧 - Space DJ | Painel de controle')
       .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
       .setDescription('back, queue, resume & pause, skip, loop')
       .setThumbnail('https://cdn.discordapp.com/attachments/1089359685112578088/1089370738215108628/download.png')
       .setColor('Orange')
       .setFooter({ text: 'Space DJ - Versão 2.0 🎼', iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})


         inter.reply({ content: `✅ - Painel enviado em: ${Channel}`, ephemeral: true})

         const back = new ButtonBuilder()
         .setLabel('Back')
         .setCustomId(JSON.stringify({ffb: 'back'}))
         .setStyle('Primary')

         const skip = new ButtonBuilder()
         .setLabel('Skip')
         .setCustomId(JSON.stringify({ffb: 'skip'}))
         .setStyle('Primary')

         const resumepause = new ButtonBuilder()
         .setLabel('Resume & Pause')
         .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
         .setStyle('Danger')

         const loop = new ButtonBuilder()
         .setLabel('Loop')
         .setCustomId(JSON.stringify({ffb: 'loop'}))
         .setStyle('Danger')
         
         const queuebutton = new ButtonBuilder()
         .setLabel('Queue')
         .setCustomId(JSON.stringify({ffb: 'queue'}))
         .setStyle('Secondary')


         const row1 = new ActionRowBuilder().addComponents(back, queuebutton, resumepause, skip, loop)



        Channel.send({ embeds: [embed], components: [row1] })

    },
}
