import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodePackageImporter } from 'sass';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        importers: [new NodePackageImporter()],
      },
    },
  },
});
