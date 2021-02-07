const mutations = {
    SET_SERVER: 'setServer',
    SET_LOADING: 'setLoading',
    SET_GUILD_ID: 'setGuildId',
    SET_GUILD_LOG: 'setGuildLogs'
};

const getters = {
    GUILD_LOG: 'guildLogs'

}

const event = {
    namespaced: true,
    state: () => ({
        loading: {
            show: false,
            message: 'loading'
        },
        guildId: null,
        guildLogs: [],
    }),
    mutations: {
        [mutations.SET_USER](state, payload) {
            state.serverID = payload;
        },
        [mutations.SET_LOADING](state, payload) {
            state.loading = payload;
        },
        [mutations.SET_GUILD_ID](state, payload) {
            state.guildId = payload;
        },
        [mutations.SET_GUILD_LOG](state, payload) {
            state.guildLogs.push(payload);
        }
    },
    getters: {
        [getters.GUILD_LOG](state) {
            return state.guildLogs.reverse()
        }
    }



}

export default event;