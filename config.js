module.exports = {
    app: {
        playing: 'Guitar Hero 🎸',
        global: true,
        guild: '1046910168518103111'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 150,
        leaveOnEnd: true,
        loopMessage: true,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
