import { defineConfig } from 'astro/config';

// #region @USER_ADD: LaTeX Support Dependencies
import { unified } from "@astrojs/markdown-remark";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// #endregion
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    markdown: {
        // #region @USER_ADD: LaTeX Markdown Engine
        processor: unified({
            remarkPlugins: [remarkMath],
            rehypePlugins: [
                [
                    rehypeKatex,
                    {
                        macros: {
                            "\\dd": "\\mathop{}\\!\\mathrm{d}",
                        },
                    },
                ],
            ],
        }),
        // #endregion

        // #region @USER_ADD: Code Highlight Engine
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