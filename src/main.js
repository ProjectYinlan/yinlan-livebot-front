import { createApp, h } from "vue";
// import App from "./App.vue";

import "/stylesheets/tailwind.css";

import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import WelcomeInit from "./pages/WelcomeInit.vue";
import WelcomeIndex from "./pages/WelcomeIndex.vue";
import Dashboard from "./pages/Dashboard.vue";

const routes = {
    '/welcome': WelcomeIndex,
    '/welcome/config': WelcomeInit,
    '/dash': Dashboard
}

const RouterApp = {

    data: () => ({
        currentRoute: window.location.pathname
    }),

    computed: {
        ViewComponent() {
            return routes[this.currentRoute] || '404'
        }
    },

    render() {
        return h(this.ViewComponent)
    },

    created() {
        window.addEventListener('popstate', () => {
            this.currentRoute = window.location.pathname
        })
    }
}

const app = createApp(RouterApp);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount("#app");