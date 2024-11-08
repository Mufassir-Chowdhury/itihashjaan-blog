// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getArticleBySlug } from '$lib/pocketbase';

export const load: PageServerLoad = async ({ params }) => {
  const post: Post | null = await getArticleBySlug(params.slug);


  return {
    props: {
      post: post satisfies Post | null
    }
  };
}
