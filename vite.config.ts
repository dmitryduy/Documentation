import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import Terminal from 'vite-plugin-terminal';
import eslint from 'vite-plugin-eslint';


export default defineConfig({
  base: '/Documentation',
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), Terminal(), eslint()],
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src'),
      '@components/': path.resolve(__dirname, './src/components'),
      '@shared/': path.resolve(__dirname, './shared'),
      '@pages/': path.resolve(__dirname, './src/pages'),
      '@hooks/': path.resolve(__dirname, './src/hooks'),
      '@hocs/': path.resolve(__dirname, './src/hocs'),
      '@assets/': path.resolve(__dirname, './src/assets'),
      '@api/': path.resolve(__dirname, './src/api'),
      '@utils/': path.resolve(__dirname, './src/utils'),
      '@stores/': path.resolve(__dirname, './src/stores'),
    }
  }
});