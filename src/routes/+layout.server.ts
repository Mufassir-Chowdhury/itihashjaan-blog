import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
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

