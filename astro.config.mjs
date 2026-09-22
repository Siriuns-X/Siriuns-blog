import { defineConfig } from 'astro/config';

import satteriMathml from "satteri-mathml";
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    markdown: {
        processor: satteri({
            features: { math: true },
            mdastPlugins: [satteriMathml({ macros: { dd: "\\mathrm{d}" } })]
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