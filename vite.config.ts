import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
//import sprites from 'vite-plugin-sprites'
import sprites from './packages/src'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    sprites({})
  ]
})
