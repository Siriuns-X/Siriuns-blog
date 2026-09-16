import { defineConfig } from 'astro/config';

// #region @USER_ADD: LaTeX Support Dependencies
import satteriMathml from "satteri-mathml";
import { satteri } from '@astrojs/markdown-satteri';
// #endregion
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    markdown: {
        processor: satteri({
            features: { math: true },
            mdastPlugins: [satteriMathml({ macros: { dd: "\\mathrm{d}" } })]
        }),
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