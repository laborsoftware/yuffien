const socket = require('../socket-connection')

module.exports = message => {
    const payload = `${message.author.username} kullanıcısı ${message.channel.name} kanalına "${message.content}" yazdı.`
    socket().emit(`information`, {
        type: 'event/setGuildLogs',
        id: message.guild.id,
        success: true,
        payload,
        loading: { show: false },
    })
}