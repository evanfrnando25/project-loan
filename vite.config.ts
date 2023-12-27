import { resolve } from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls} from "@quasar/vite-plugin"

export default defineConfig({
  base: '/app/',
  server: {
    proxy: {
      '/api': {
        target: "https://raw.githubusercontent.com/andreascandle/p2p_json_test/main/api/json/loans.json",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  },
  plugins: [
    vue({
      template: {transformAssetUrls}
    }),
    quasar({
      sassVariables: "@/assets/quasar/variables.sass"
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    exclude: ['./node_modules']
  }
})
