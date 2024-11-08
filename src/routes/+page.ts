import type { PageLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getArticles } from '$lib/pocketbase';

export const load: PageLoad = async () => {
  let posts: Post[] = await getArticles();

  return {
    props: {
      posts: posts satisfies Post[]
    }
  };
}