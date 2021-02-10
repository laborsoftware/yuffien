const io = require('socket.io-client')
let socket = null

module.exports = client => {
    if (socket) return socket

    socket = io('http://localhost:1111', {
        transports: ['websocket', 'polling', 'flashsocket'],
    })

    socket.on(`guildInformation`, data => {
        console.log('serverinformation')
        if (!(data || data.length > 0))
            socket.emit(`information`, {
                success: false,
                message: 'Hiçbir data gelmedi.',
            })
        if (data) {
            if (data.guilds && data.guilds.length > 0) {
                const newGuilds = []
                const notFoundServers = []

                /*
                                                                type 0 --> not found servers
                                                                type 1 --> okey servers
                                                                type 2 --> okey servers but not permission
                                                                type 3 --> added servers

                                                                                                                                                                                                                                                                        */

                data.guilds.forEach(d => {
                    const server = client.guilds.cache.find(server => String(server.id) == String(d.id))
                    if (!server) notFoundServers.push({...d, type: 0 })
                    if (server) {
                        const user = server.members.cache.find(user => user.id == data.id)
                        if (user && (user.owner || user.permissions == process.env.GUILD_ADD_PERMISSION_ID)) {
                            const members = server.members.cache
                            allCount = members.size
                            onlineCount = members.filter(member => member.presence.status != 'offline' && !member.user.bot).size
                            offlineCount = members.filter(member => member.presence.status == 'offline' && !member.user.bot).size
                            botCount = members.filter(member => member.user.bot).size

                            console.log(onlineCount)
                            newGuilds.push({
                                ...d,
                                type: 1,
                                members: {
                                    allCount,
                                    onlineCount,
                                    offlineCount,
                                    botCount,
                                },
                            })
                        } else
                            newGuilds.push({
                                ...d,
                                type: 2,
                            })
                    }
                })

                notFoundServers.forEach(server => {
                    if (server.permissions == process.env.GUILD_ADD_PERMISSION_ID) newGuilds.push({...server, type: 3 })
                    else newGuilds.push({...server, type: 0 })
                })

                newGuilds.sort((a, b) => a.type - b.type)

                socket.emit(`information`, {
                    type: 'event/setGuilds',
                    success: true,
                    _id: data._id,
                    payload: newGuilds,
                    loading: { show: false, message: 'Yönlendiriliyor..' },
                })
            }
        }
    })

    return socket
}