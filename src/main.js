import { createApp, h } from "vue";
// import App from "./App.vue";

import "/stylesheets/tailwind.css";

import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import * as VueRouter from "vue-router";

import Index from "./pages/Index.vue";
import Dashboard from "./pages/Dashboard.vue";
import WelcomeIndex from "./pages/WelcomeIndex.vue";
import WelcomeInit from "./pages/WelcomeInit.vue";

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/dash',
        component: Dashboard
    },
    {
        path: '/welcome',
        component: WelcomeIndex
    },
    {
        path: '/welcome/config',
        component: WelcomeInit
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const app = createApp({});

app.use(router);

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount("#app");