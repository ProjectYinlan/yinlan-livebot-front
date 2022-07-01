import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        vue()
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:21050",
                changeOrigin: true
            }
        }
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js'
        }
    }
});