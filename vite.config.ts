import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        VitePWA({
            manifest: {
                id: '/',
                icons: [
                    {
                        src: 'logo.png',
                        sizes: '144x144',
                        type: 'image/png'
                    }
                ]
            },
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png}'],
                skipWaiting: true,
                clientsClaim: true,
                navigateFallback: './index.html',
                runtimeCaching: [
                    {
                        urlPattern: new RegExp('http(s)?://\\S+'),
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'caffesta-client-cache',
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            }
        }),
    ],
    build: {
        manifest: true,
    },
    server: {
        port: 3000,
        host: true,
    },
    css: {
        modules: {
            generateScopedName: '[local]_[hash:base64:8]'
        }
    }
})
