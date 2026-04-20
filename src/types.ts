export interface Post {
    frontmatter: {
        title: string;
        pubDate: string;
        description: string;
        tags: string[];
    };
    url: string;
}

export interface BaseFrontmatter {
    title: string;
    description?: string;
}

export interface PostFrontmatter extends BaseFrontmatter {
    pubDate: string,
    tags: string[],
    author: string,
}