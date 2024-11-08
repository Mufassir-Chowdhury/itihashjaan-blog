import PocketBase, { type RecordListOptions } from 'pocketbase';
import type { Post } from './types/post';
import type { Author } from './types/author';

// let BASEPATH = 'http://127.0.0.1:8090';
let BASEPATH = 'https://itihashjaan-blog.pockethost.io';
export const pb = new PocketBase(BASEPATH); 

export const articleImage = `${BASEPATH}/api/files/articles`;
export const authorImage = `${BASEPATH}/api/files/authors`;

export async function getArticles(options: RecordListOptions = {}): Promise<Post[]> {
    try {
        const defaultOptions: RecordListOptions = {
            sort: '+created',
            expand: 'author',
            ...options
        };

        const records = await pb.collection('articles').getList<Post>(1, 50, defaultOptions);
        return records.items;
    } catch (err) {
        console.error('Error fetching articles:', err);
        return [];
    }
}

export async function getArticleBySlug(slug: string): Promise<Post | null> {
    try {
        const record = await pb.collection('articles').getFirstListItem<Post>(`slug="${slug}"`, {
            expand: 'author'
        });
        return record;
    } catch (err) {
        console.error('Error fetching article:', err);
        let emptyPost = null;
        return emptyPost;
    }
}

export async function getArticlesByAuthor(id: string): Promise<Post[] | []> {
    try {
        const record = await pb.collection('articles').getFullList<Post>({
            filter: `author="${id}"`,
            expand: 'author'
        });
        return record;
    } catch (err) {
        console.error('Error fetching article:', err);
        return [];
    }
}


export async function getAuthors(options: RecordListOptions = {}): Promise<Author[]> {
    try {
        const defaultOptions: RecordListOptions = {
            sort: 'name',
            ...options
        };

        const records = await pb.collection('authors').getList<Author>(1, 50, defaultOptions);
        return records.items;
    } catch (err) {
        console.error('Error fetching authors:', err);
        return [];
    }
}

export async function getAuthorById(id: string): Promise<Author | null> {
    try {
        const record = await pb.collection('authors').getOne<Author>(id);
        return record;
    } catch (err) {
        console.error('Error fetching author:', err);
        return null;
    }
}