import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import type { Post } from '../types';

export async function GET(context: APIContext) {
    const posts = import.meta.glob<Post>('./posts/*.md', { eager: true });

    return rss({
        title: 'Siriuns\' Blog',
        description: 'This is a description',
        site: context.site!,
        items: Object.values(posts).map((post) => ({
            title: post.frontmatter.title,
            pubDate: new Date(post.frontmatter.pubDate),
            description: post.frontmatter.description,
            link: post.url,
        })),
    });
}