import type { PageLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getArticles } from '$lib/pocketbase';
import { categories } from '$lib/categories';

export const load: PageLoad = async ({ url }) => {
	if (url.searchParams.has('category')) {
		const category = categories.find(
			(category) => category.slug == url.searchParams.get('category')
		)?.name;
		return {
			props: {
				posts: getArticles({ filter: `category="${category}"` }) satisfies Promise<Post[]>,
				category: category
			}
		};
	}
	const posts: Post[] = await getArticles();

	return {
		props: {
			posts: posts satisfies Post[],
			category: null
		}
	};
};
