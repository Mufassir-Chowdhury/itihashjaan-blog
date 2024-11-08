import { getAuthorById } from '$lib/pocketbase';
import { error } from '@sveltejs/kit';
import type { Author } from '$lib/types/author';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const author: Author | null = await getAuthorById(params.id);
  
    if (!author) {
        throw error(404, 'Author not found');
    }

    return {
        props: {
            author: author satisfies Author | null
        }
    };
  }
  