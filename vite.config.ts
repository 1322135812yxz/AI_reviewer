import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'; // 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> pnpm i @types/node -D

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),vue()],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'), // 设置 `@` 指向 `src` 目录  
    },
  },
  server: {
    port: 5173,
    strictPort: true, // 禁止自动切换端口
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端服务地址
        changeOrigin: true,
       rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
      '/apinode': {
        target: 'http://localhost:3000', // 后端服务地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  },
})
