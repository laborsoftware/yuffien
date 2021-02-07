import axios from "axios";
import io from 'socket.io-client'
const socket = io("http://localhost:1111", { transports: ['websocket', 'polling', 'flashsocket'] })

const mutations = {
    SET_USER: 'setUser',
    SET_GUILDS: 'setGuilds'
};

const actions = {
    LOGIN: "login",
    LOGOUT: "logout",
    FETCH_SESSION: "fetchSession",
    INIT: "init",
    CHECK_GUILDS: "checkGuilds"
}


const auth = {
    namespaced: true,
    state: () => ({
        user: null,
        guilds: []
    }),
    mutations: {
        [mutations.SET_USER](state, payload) {
            state.user = payload;

        },
        [mutations.SET_GUILDS](state, payload) {
            state.guilds = payload;
        }
    },
    actions: {
        async [actions.INIT]({ dispatch, commit }) {
            await dispatch(actions.FETCH_SESSION)

            socket.on("information", (data) => {
                console.log(data.type);
                if (data.success) {
                    const type = data.type.split("/").length;
                    if (type > 1)
                        commit(data.type, data.payload, { root: true })
                    else
                        commit(data.type, data.payload)
                }

                commit("event/setLoading", data.loading, { root: true })
            })

        },

        async [actions.LOGIN]({ commit }) {
            commit("event/setLoading", { show: true, message: "Giriş yapılıyor.." }, { root: true })
            const user = await axios.get('/auth/session')
            commit("setUser", user.data)

            const guildId = this.state.event.guildId
            console.log(guildId)

            if (user.data)
                socket.emit("join", user.data._id)
            if (guildId)
                socket.emit("join", guildId)


        },
        async [actions.FETCH_SESSION]({ commit }) {
            commit("event/setLoading", { show: true, message: "Giriş yapılıyor.." }, { root: true })
            const user = await axios.get('/auth/session');
            commit("setUser", user.data)
            commit("event/setLoading", { show: false, message: "" }, { root: true })
        },
        async [actions.LOGOUT]({ commit }) {
            const user = await axios.delete('/auth/session');
            commit("setUser", user.data)

        },
        async [actions.CHECK_GUILDS]({ commit }) {
            commit("event/setLoading", { show: true, message: "Sunucular doğrulanıyor." }, { root: true })
            const guildInformation = await axios.post('/bot/socket', { type: "guildInformation", data: this.state.auth.user });
            console.log(guildInformation)



        },
    },
}

export default auth;