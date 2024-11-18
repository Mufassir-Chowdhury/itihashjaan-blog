import type { PageLoad } from './$types';
import { categories } from '$lib/categories';

export const ssr = false;
export const load: PageLoad = async () => {
	return {
		categories: categories satisfies { name: string; slug: string }[]
	};
};
