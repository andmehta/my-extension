import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Lattice-specific output folder and global name
const extName = 'Lattice'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'tmp.extensions',
      fileName: () => `extensions-${extName}.js`,
      formats: ['iife'], // equivalent to `libraryTarget: "window"`
    },
    outDir: `dist/resources/extension-${extName}`,
    rollupOptions: {
      // Exclude react from the bundle
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.ttf'],
  },
  optimizeDeps: {
    include: ['react'],
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  // Custom handling for certain imports (null-loader equivalent)
  define: {
    // This will prevent the file from being included — you can fine-tune this in a plugin
    '__NULL_LOADER_PLACEHOLDER__': 'undefined',
    'process.env': { NODE_ENV: process.env.NODE_ENV },
  },
  plugins: [
    react(),
    {
      name: 'null-loader-for-specific-scss',
      enforce: 'pre',
      load(id) {
        if (id.includes('node_modules/argo-ui/src/components/page/page.scss')) {
          return ''; // null-loader equivalent
        }
      },
    },
  ],
})
