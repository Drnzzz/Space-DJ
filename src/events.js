const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`🆗 - Erro na fila: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`🌐 - Erro na conexão: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
    .setColor("Orange")
    .setThumbnail('https://cdn.discordapp.com/attachments/1089359685112578088/1089370738215108628/download.png')
    .setTitle(`***🎶 - Musica: ${track.title}***`)
    .addFields({ name: ' ', value: '\u200B', inline: false })
    .addFields({ name: '⏸ **- Status: Tocando Agora**', value: '\u200B', inline: false })
	.addFields({ name: `🎤 **- Pedido Por:** ${track.requestedBy.tag}`, value: '\u200B', inline: false })
	.setImage('https://share.creavite.co/aUxwRBkdlPNoxp1i.gif')
	.setTimestamp()
	.setFooter({ text: 'Space DJ - Versão 2.0 🎼', iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});

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
    .setStyle('Secondary')
    
    const queuebutton = new ButtonBuilder()
    .setLabel('Queue')
    .setCustomId(JSON.stringify({ffb: 'queue'}))
    .setStyle('Secondary')

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.send({ embeds: [embed], components: [row1] })
});

player.on('connectionCreate', (queue) => {
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
      const oldNetworking = Reflect.get(oldState, 'networking');
      const newNetworking = Reflect.get(newState, 'networking');

      const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
        const newUdp = Reflect.get(newNetworkState, 'udp');
        clearInterval(newUdp?.keepAliveInterval);
      }

      oldNetworking?.off('stateChange', networkStateChangeHandler);
      newNetworking?.on('stateChange', networkStateChangeHandler);
    });
});

player.on('botDisconnect', (queue) => {
    const embed = new EmbedBuilder()
      .setColor('Orange')
      .setDescription(`**🗑 - Me Desconectei Manualmente, Limpando Fila...**`);
    queue.metadata.send({ embeds: [embed] });
  });

player.on('channelEmpty', (queue) => {
    const embed = new EmbedBuilder()
      .setColor('Orange')
      .setDescription(`**👋 - Fiquei Sozinho, Saindo Da Call...**`);
    queue.metadata.send({ embeds: [embed] });
  });

player.on('queueEnd', (queue) => {
    const embed = new EmbedBuilder()
      .setColor('Orange')
      .setDescription(`**🆗 - Fila Finalizada!**`);
    queue.metadata.send({ embeds: [embed] });
  });

player.on('tracksAdd', (queue, tracks) => {
    const embed = new EmbedBuilder()
      .setColor('Orange')
      .setDescription(`**🎼 - Musicas Da Playlist: Na Fila!**`);
    queue.metadata.send({ embeds: [embed] });
  });