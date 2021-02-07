import Vue from "vue";
import VueRouter from "vue-router";

/* views */
import Home from './views/home/Home.vue';
import Dashboard from './views/dashboard/Dashboard.vue';
import Maintenance from './views/other/Maintenance.vue';
import Fail from './views/other/404.vue';
import FailedAuth from './views/other/FailedAuth.vue';

/* Dashboard views */


/* Axios */


// import axios from 'axios';



import i18n from './language/i18n';

Vue.use(VueRouter);

export default function init(store) {
    console.log(i18n.messages[i18n.locale])
    return new VueRouter({
        mode: "history",
        routes: [{
                path: "/",
                component: Home,
                name: "Home",
            },
            {
                path: "/dashboard/",
                component: Dashboard,
                name: "dashboard",
                children: [{
                        path: ":id",
                        component: Dashboard,
                        name: "dashboard-children",
                        beforeEnter(to, from, next) {
                            store.commit("event/setGuildId", to.params.id)
                            next();

                        }
                    },


                ],
                beforeEnter(to, from, next) {
                    if (!store.state.auth.user) return next('/failed-authorization')
                    return next()
                }
            },
            {
                path: "/failed-authorization",
                component: FailedAuth,
                name: "failed-authorization",

            },
            {
                path: "/maintenance",
                component: Maintenance,
                name: "maintenance",

            }, { path: "*", component: Fail, name: "404", }

        ]
    });


}