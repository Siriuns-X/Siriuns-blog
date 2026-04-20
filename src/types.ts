export interface Post {
    frontmatter: {
        title: string;
        pubDate: string;
        description: string;
        tags: string[];
    };
    url: string;
}