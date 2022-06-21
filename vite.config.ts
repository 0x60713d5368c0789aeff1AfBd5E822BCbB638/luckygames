import { defineConfig, normalizePath } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
import assetTypings from './tools/plugins/rollup-plugin-asset-typings'

const MainSrcPath = path.resolve(__dirname, 'src')
const ModuleQueenPath = path.resolve(__dirname, 'tools')
const AssetIconsPath = path.resolve(__dirname, 'src/assets/icons')

export default defineConfig({
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: MainSrcPath }],
  },
  server: {
    host: '0.0.0.0',
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  esbuild: {
    jsxInject: `
      import React from 'react'
      import { createURL } from '${normalizePath(ModuleQueenPath)}'
    `,
  },
  plugins: [
    reactRefresh(),
    viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [AssetIconsPath],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    assetTypings({
      assetPath: 'src/assets',
      outputPath: 'src/typings/assetTyping.d.ts',
    }),
  ],
})
