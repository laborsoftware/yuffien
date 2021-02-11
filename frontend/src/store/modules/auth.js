import axios from 'axios'
import socket from '../../socket/connection'

const mutations = {
    SET_USER: 'setUser'
}

const actions = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    FETCH_SESSION: 'fetchSession',
    INIT: 'init'
}

const auth = {
    namespaced: true,
    state: () => ({
        user: null
    }),
    mutations: {
        [mutations.SET_USER](state, payload) {
            state.user = payload
        }
    },
    actions: {
        async [actions.INIT]({ dispatch, commit }) {
            await dispatch(actions.FETCH_SESSION)

            socket().on('information', data => {
                console.log(data)
                const type = data.type.split('/').length
                if (type > 1) commit(data.type, data.payload, { root: true })
                else commit(data.type, data.payload)

                if (data.type == 'event/setCurrentGuild' && data.guildId) socket().emit('join', data.guildId)

                setTimeout(() => {
                    commit('event/setLoading', data.loading, { root: true })
                }, 1 * 1000)
            })
        },

        async [actions.FETCH_SESSION]({ commit }) {
            commit('event/setLoading', { show: true, message: 'Giriş yapılıyor..' }, { root: true })
            const user = await axios.get('/auth/session')
            commit('setUser', user.data)
            if (user.data) socket().emit('join', user.data._id)

            commit('event/setLoading', { show: false, message: '' }, { root: true })
        },
        async [actions.LOGOUT]({ commit }) {
            const user = await axios.delete('/auth/session')
            commit('setUser', user.data)
        }
    }
}

export default auth