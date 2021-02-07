import Vue from "vue";
import Vuex from "vuex";
import auth from './modules/auth'
import event from './modules/event'
import axios from 'axios'

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_LOCAL_API_URL
axios.defaults.withCredentials = true

const store = new Vuex.Store({
    modules: {
        auth,
        event
    }
});

export default async function init() {
    await store.dispatch('auth/init')
        // await store.dispatch('event/init')

    return store
}