export interface Post {
    frontmatter: {
        title: string;
        pubDate: string;
        tags: string[];
    };
    url: string;
}