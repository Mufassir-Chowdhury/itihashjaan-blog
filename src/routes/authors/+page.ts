// src/routes/+page.server.ts
import type { PageLoad } from './$types';
import { getAuthors } from '$lib/pocketbase';
import type { Author } from '$lib/types/author';

export const load: PageLoad = async () => {
	const authors: Author[] = await getAuthors();

	return {
		props: {
			authors: authors satisfies Author[]
		}
	};
};
