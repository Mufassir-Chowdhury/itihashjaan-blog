import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const categories = [
        { name: 'অনুবাদ', slug: 'translation' },
        { name: 'প্রবন্ধ', slug: 'article' },
        { name: 'অনুলিখন', slug: 'copywriting' },
        { name: 'সম্পাদকীয়', slug: 'editorial' },
      ]

  return {
      categories: categories satisfies any
  };
}

