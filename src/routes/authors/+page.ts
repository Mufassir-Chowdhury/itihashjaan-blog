import type { PageLoad } from './$types';
import { getAuthors } from '$lib/pocketbase';
import type { Author } from '$lib/types/author';

export const load: PageLoad = async () => {
	return {
		props: {
			authors: getAuthors() satisfies Promise<Author[]>
		}
	};
};
