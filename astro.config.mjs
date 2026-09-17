import { defineConfig } from 'astro/config';
import { unified } from "@astrojs/markdown-remark";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    markdown: {
        processor: unified({
            remarkPlugins: [remarkMath],
            rehypePlugins: [
                [rehypeKatex, { macros: { "\\dd": "\\mathop{}\\!\\mathrm{d}", }, },],
            ],
        }),
        shikiConfig: {
            defaultColor: false,
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
        },

    },
    site: 'https://siriuns.netlify.app',
    integrations: [sitemap()],
});