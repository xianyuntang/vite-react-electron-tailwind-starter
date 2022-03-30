import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    root: resolve('./src/renderer'),
    build: {
        outDir: resolve('./dist'),
        emptyOutDir: true
    },
    resolve: {
        alias: {
            '@/renderer': resolve(__dirname, 'src', 'renderer'),
            '@/main': resolve(__dirname, 'src', 'main')
        }
    }
})

