import { defineConfig } from 'astro/config';

// #region @USER_ADD: LaTeX Support Dependencies
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// #endregion
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    markdown: {
        // #region @USER_ADD: LaTeX Markdown Engine
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        // #endregion
        // #region @USER_ADD: todo

        // syntaxHighlight: "prism",

        shikiConfig: {
            defaultColor: false,
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
        },
        // #endregion
    },

    // #region @USER_ADD: RSS And Sitemap
    site: 'https://siriuns.netlify.app',
    integrations: [sitemap()],
    // #endregion
});