import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getArticles } from '$lib/pocketbase';

export const load: PageServerLoad = async () => {
  let posts: Post[] = await getArticles();

  return {
    props: {
      posts: posts satisfies Post[]
    }
  };
}
