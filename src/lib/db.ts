import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const records = await pb.collection('articles').getFullList({
    sort: '-created',
    expand: 'author',
});

export const record = await pb.collection('articles').getFirstListItem('slug="nasiha-rajniti"', {
    expand: 'author',
});