import type { PageLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getArticles } from '$lib/pocketbase';

export const load: PageLoad = async ({ url }) => {
	const categories = [
		{ name: 'অনুবাদ', slug: 'translation' },
		{ name: 'প্রবন্ধ', slug: 'article' },
		{ name: 'অনুলিখন', slug: 'copywriting' },
		{ name: 'সম্পাদকীয়', slug: 'editorial' }
	];
	if (url.searchParams.has('category')) {
		const category = categories.find(
			(category) => category.slug == url.searchParams.get('category')
		)?.name;
		const posts: Post[] = await getArticles({ filter: `category="${category}"` });
		return {
			props: {
				posts: posts satisfies Post[],
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
