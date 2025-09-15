import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
  },
});
