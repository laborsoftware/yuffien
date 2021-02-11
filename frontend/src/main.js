import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './language/i18n'

/* DevTools Options */
Vue.config.devtools = true
Vue.config.debug = true

//Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//anti-design-vue
import 'ant-design-vue/dist/antd.css'

import {
    Button,
    Input,
    Icon,
    Layout,
    Row,
    Col,
    Comment,
    Tooltip,
    Avatar,
    Card,
    Tag,
    Radio,
    Menu,
    Form,
    Alert,
    Empty,
    Breadcrumb,
    Select,
    Skeleton,
    Spin,
    Dropdown,
    message,
    Divider,
    Result,
    Affix,
    Timeline
} from 'ant-design-vue'

const components = [
    Button,
    Input,
    Icon,
    Layout,
    Row,
    Col,
    Comment,
    Tooltip,
    Avatar,
    Card,
    Tag,
    Radio,
    Menu,
    Form,
    Alert,
    Empty,
    Breadcrumb,
    Select,
    Skeleton,
    Spin,
    Dropdown,
    Divider,
    Result,
    Affix,
    Timeline
]

Vue.prototype.$message = message
components.forEach(c => Vue.use(c))

Vue.config.productionTip = false

async function main() {
    let storeInstance = await store(router)

    new Vue({
        i18n,
        router: router(storeInstance),
        store: storeInstance,
        render: h => h(App)
    }).$mount('#app')
}
main()