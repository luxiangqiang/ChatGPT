/*
 * @Author: luxiangqiang
 * @Date: 2023-03-06 09:03:00
 * @LastEditors: luxiangqiang
 * @LastEditTime: 2023-03-06 10:50:03
 */
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import { presetUno } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import presetTypography from '@unocss/preset-typography'
import solidJs from '@astrojs/solid-js'
import vercelDisableBlocks from './plugins/vercelDisableBlocks'

import node from '@astrojs/node'
import vercel from '@astrojs/vercel/edge'

const envAdapter = () => {
  if (process.env.OUTPUT == 'vercel') {
    return vercel()
  } else {
    return node({
      mode: 'standalone'
    })
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://luxiangqiang.github.io',
  base: '/ChatGPT',
  integrations: [
    unocss({
      presets: [
        presetAttributify(),
        presetUno(),
        presetTypography(),
      ]
    }),
    solidJs()
  ],
  output: 'server',
  adapter: envAdapter(),
  vite: {
    plugins: [
      process.env.OUTPUT == 'vercel' && vercelDisableBlocks(),
    ]
  },
});