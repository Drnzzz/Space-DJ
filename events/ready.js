module.exports = async (client) => {
    console.log(`┍━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┑`)
    console.log(`│ ⚙ [Ready] Space 2.0 - Tocando Na Revoada! │`)
    console.log(`┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┙`);
    client.user.setActivity(client.config.app.playing);

    
};