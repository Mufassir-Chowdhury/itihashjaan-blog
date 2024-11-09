export interface Post {
	id: string;
	title: string;
	description: string;
	date: string;
	category: string;
	image: string;
	slug: string;
	expand: { author: { name: string; id: string } };
	content: string;
	featured: boolean;
}
