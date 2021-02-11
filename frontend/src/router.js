import Vue from 'vue'
import VueRouter from 'vue-router'

/* views */
import Home from './views/Home'
import Dashboard from './views/dashboard/Dashboard'
import Maintenance from './views/Maintenance.vue'
import Fail from './views/404.vue'
import FailedAuth from './views/FailedAuth.vue'

// import i18n from './language/i18n'

Vue.use(VueRouter)

export default function init(store) {
    return new VueRouter({
        mode: 'history',
        routes: [{
                path: '/',
                component: Home,
                name: 'Home'
            },
            {
                path: '/dashboard/',
                component: Dashboard,
                name: 'dashboard',
                children: [{
                    path: ':id',
                    component: Dashboard,
                    name: 'dashboard-children',
                    beforeEnter(to, from, next) {
                        store.dispatch('event/checkGuild', to.params.id)
                        next()
                    }
                }],
                beforeEnter(to, from, next) {
                    store.commit('event/setCurrentGuild', null)
                    if (!store.state.auth.user) return next('/failed-authorization')
                    else {
                        store.dispatch('event/getGuilds')
                        next()
                    }
                }
            },
            {
                path: '/failed-authorization',
                component: FailedAuth,
                name: 'failed-authorization'
            },
            {
                path: '/maintenance',
                component: Maintenance,
                name: 'maintenance'
            },
            { path: '*', component: Fail, name: '404' }
        ]
    })
}