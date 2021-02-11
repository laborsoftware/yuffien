import axios from 'axios'
const mutations = {
    SET_SERVER: 'setServer',
    SET_LOADING: 'setLoading',
    SET_CURRENT_GUILD: 'setCurrentGuild',
    SET_GUILD_LOG: 'setGuildLogs',
    SET_GUILDS: 'setGuilds',
    SET_CATEGORIES: 'setCategories'
}

const getters = {
    GUILD_LOG: 'guildLogs'
}

const actions = {
    GET_GUILDS: 'getGuilds',
    GET_CATEGORIES: 'getCategories',
    CHECK_GUILD: 'checkGuild'
}

const event = {
    namespaced: true,
    state: () => ({
        loading: {
            show: false,
            message: 'loading'
        },
        guilds: [],
        currentGuild: null,
        guildLogs: [],
        categories: []
    }),
    mutations: {
        [mutations.SET_USER](state, payload) {
            state.serverID = payload
        },
        [mutations.SET_LOADING](state, payload) {
            state.loading = payload
        },
        [mutations.SET_CURRENT_GUILD](state, payload) {
            state.currentGuild = payload
        },
        [mutations.SET_GUILD_LOG](state, payload) {
            state.guildLogs.push(payload)
        },
        [mutations.SET_GUILDS](state, payload) {
            state.guilds = payload
        },
        [mutations.SET_CATEGORIES](state, payload) {
            state.categories = payload
        }
    },
    getters: {
        [getters.GUILD_LOG](state) {
            return state.guildLogs.reverse()
        }
    },
    actions: {
        async [actions.GET_GUILDS]({ commit }) {
            commit('event/setLoading', { show: true, message: 'Sunucular doğrulanıyor.' }, { root: true })
            await axios.post('/bot/', {
                type: 'guildInformation',
                data: this.state.auth.user
            })
        },
        async [actions.GET_CATEGORIES]({ commit }) {
            commit('event/setLoading', { show: true, message: 'Kategoriler çekiliyor..' }, { root: true })
            const categories = await axios.get('/command-category/')
            console.log(categories.data)
            commit('setCategories', categories.data)
            commit('event/setLoading', { show: false, message: '' }, { root: true })
        },

        async [actions.CHECK_GUILD]({ commit }, payload) {
            commit('event/setLoading', { show: true, message: 'Sunucu doğrulanıyor...' }, { root: true })
            await axios.post('/bot/', {
                type: 'guildCheck',
                data: { userId: this.state.auth.user.id, guildId: payload, _id: this.state.auth.user._id }
            })
            commit('event/setLoading', { show: false, message: '' }, { root: true })
        }
    }
}

export default event