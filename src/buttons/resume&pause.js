module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `❌ - Nenhuma musica tocando...`, ephemeral: true });

    const success = queue.setPaused(false);
    
    if (!success) queue.setPaused(true);
    

    return inter.reply({ content: `${success ? `▶ - Musica pausada!` : `⏸ - Musica despauda!`}`, ephemeral: true});
}