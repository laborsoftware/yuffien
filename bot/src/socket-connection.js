const io = require('socket.io-client')
let socket = null

const getMemberCount = (client, id) => {
    const server = client.guilds.cache.find(server => String(server.id) == String(id))
    if (!server) return
    const members = server.members.cache
    const data = [
        // {
        //     item: 'Toplam',
        //     count: members.size,
        // },
        {
            item: 'Online',
            count: members.filter(member => member.presence.status != 'offline' && !member.user.bot).size,
        },
        {
            item: 'Offline',
            count: members.filter(member => member.presence.status == 'offline' && !member.user.bot).size,
        },
        {
            item: 'Bot',
            count: members.filter(member => member.user.bot).size,
        },
    ]
    console.log(server.name, data)
    return data
}

module.exports = client => {
    if (socket) return socket

    socket = io('http://localhost:1111', {
        transports: ['websocket', 'polling', 'flashsocket'],
    })

    socket.on(`guildInformation`, data => {
        if (!(data || data.length > 0))
            socket.emit(`information`, {
                success: false,
                message: 'Hiçbir data gelmedi.',
            })
        if (data) {
            if (data.guilds && data.guilds.length > 0) {
                const newGuilds = []
                const notFoundServers = []

                //type 0 --> not found servers
                //type 1 --> okey servers
                //type 2 --> okey servers but not permission
                //type 3 --> added servers

                data.guilds.forEach(d => {
                    const server = client.guilds.cache.find(server => String(server.id) == String(d.id))
                    if (!server) notFoundServers.push({...d, type: 0 })
                    if (server) {
                        const user = server.members.cache.find(user => user.id == data.id)
                        if (user && user.hasPermission('ADMINISTRATOR')) {
                            newGuilds.push({
                                ...d,
                                type: 1,
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
                    loading: { show: false },
                })
            }
        }
    })

    socket.on(`guildCheck`, data => {
        const server = client.guilds.cache.find(server => String(server.id) == String(data.guildId))
        console.log(data)
        if (!server)
            return socket.emit(`information`, {
                type: 'event/setCurrentGuild',
                id: data._id,
                payload: false,
                loading: { show: true, message: 'Böyle bir sunucu bulunamadı.' },
            })
        else {
            const member = server.members.cache.find(member => String(member.id) == String(data.userId))
            if (!member)
                return socket.emit(`information`, {
                    type: 'event/setCurrentGuild',
                    payload: false,
                    id: data._id,
                    loading: { show: true, message: 'Bu sunucuya kayıtlı değilsiniz.' },
                })
            else {
                if (!member.hasPermission('ADMINISTRATOR'))
                    return socket.emit(`information`, {
                        type: 'event/setCurrentGuild',
                        payload: false,
                        id: data._id,
                        loading: { show: true, message: 'Bu sunucuyu yönetme yetkiniz yok.' },
                    })
                const members = getMemberCount(client, server.id)
                socket.emit(`information`, {
                    type: 'event/setCurrentGuild',
                    payload: {...server, members },
                    id: data._id,
                    guildId: server.id,
                    loading: { show: false },
                })
            }
        }
    })

    socket.on(`botUpdateData`, data => {
        data.forEach(id => {
            const members = getMemberCount(client, id)
            socket.emit('information', {
                type: 'event/setGuildActiveStatus',
                id,
                payload: members,
                loading: { show: true, message: '' },
            })
        })
    })

    return socket
}