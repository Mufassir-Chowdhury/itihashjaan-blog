import { getArticlesByAuthor, getAuthorById } from '$lib/pocketbase';
import { error } from '@sveltejs/kit';
import type { Author } from '$lib/types/author';
import type { PageLoad } from './$types';
import type { Post } from '$lib/types/post';

export const load: PageLoad = async ({ params }) => {
	const author: Author | null = await getAuthorById(params.id);
	const posts: Post[] = await getArticlesByAuthor(params.id);
	if (!author) {
		throw error(404, 'Author not found');
	}

	return {
		props: {
			author: author satisfies Author | null,
			posts: posts satisfies Post[] | []
		}
	};
};
