import { defineConfig } from 'astro/config';

// === @USER_ADD: LaTeX Support Dependencies START ===
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// === @USER_ADD END ===
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    // === @USER_ADD: LaTeX Markdown Engine START ===
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    },
    // === @USER_ADD END ===
    site: "https://siriuns.netlify.app",
    integrations: [sitemap()],
});