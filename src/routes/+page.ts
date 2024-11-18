import type { PageLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getArticles } from '$lib/pocketbase';

export const load: PageLoad = async () => {
	return {
		props: {
			posts: getArticles() satisfies Promise<Post[]>
		}
	};
};
