import { defineConfig, sharpImageService } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import astroI18next from "astro-i18next";
import svelte from "@astrojs/svelte";
import vercelServerless from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://trybisz.com",
  compressHTML: true,
  experimental: {
    assets: true,
    redirects: true,
  },
  scopedStyleStrategy: "class",
  markdown: {
    rehypePlugins: [rehypeHeadingIds, [rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        class: "heading-linker"
      }
    }]]
  },
  image: {
    service: sharpImageService()
  },
  integrations: [svelte(), astroI18next()],
  server: {
    port: 8000
  },
  output: "server",
  adapter: vercelServerless()
});