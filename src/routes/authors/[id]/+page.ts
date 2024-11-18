import { getArticlesByAuthor, getAuthorById } from '$lib/pocketbase';
import type { Author } from '$lib/types/author';
import type { PageLoad } from './$types';
import type { Post } from '$lib/types/post';

export const load: PageLoad = async ({ params }) => {
	return {
		props: {
			author: getAuthorById(params.id) satisfies Promise<Author | null>,
			posts: getArticlesByAuthor(params.id) satisfies Promise<Post[] | []>
		}
	};
};
