import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        home: resolve(__dirname, 'src/home.html'),
        register: resolve(__dirname, 'src/register.html'),
        cart: resolve(__dirname, 'src/cart.html'),
        about: resolve(__dirname, 'src/about.html'),
        pass: resolve(__dirname, 'src/pass.html' ),
        profile: resolve(__dirname, 'src/profile.html' ),
      },
    }
  },
});
