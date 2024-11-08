import type { PageLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getArticles } from '$lib/pocketbase';

export const load: PageLoad = async ({ url }) => {
    let categories = [
        { name: 'অনুবাদ', slug: 'translation' },
        { name: 'প্রবন্ধ', slug: 'article' },
        { name: 'অনুলিখন', slug: 'copywriting' },
        { name: 'সম্পাদকীয়', slug: 'editorial' },
      ]
    if(url.searchParams.has('category')) {
        let category = categories.find((category) => category.slug == url.searchParams.get('category'))?.name;
        let posts: Post[] = await getArticles({ filter: `category="${category}"` });
        return {
            props: {
                posts: posts satisfies Post[],
                category: category
            }
        };
    }
  let posts: Post[] = await getArticles();

  return {
    props: {
      posts: posts satisfies Post[],
      category: null
    }
  };
}
