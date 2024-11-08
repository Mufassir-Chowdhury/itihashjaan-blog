// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { getAuthors } from '$lib/pocketbase';
import type { Author } from '$lib/types/author';

export const load: PageServerLoad = async () => {
  let authors: Author[] = await getAuthors();

  return {
    props: {
      authors: authors satisfies Author[]
    }
  };
}
