import { defineConfig } from 'astro/config';

// #region @USER_ADD: LaTeX Support Dependencies
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// #endregion
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    // #region @USER_ADD: LaTeX Markdown Engine
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    },
    // #endregion

    // #region @USER_ADD: RSS And Sitemap
    site: 'https://siriuns.netlify.app',
    integrations: [sitemap()],
    // #endregion
});