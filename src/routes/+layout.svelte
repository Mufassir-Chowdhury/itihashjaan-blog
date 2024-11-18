<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	let { children, data } = $props();
	let categories = data.categories;
</script>

<ParaglideJS {i18n}>
	<div class="flex min-h-screen flex-col" style="background-color: #dfcdaf;
background-image: url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23c3a374' fill-opacity='0.99' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E');">
		<Navbar {categories} />
		<main class="flex-1 pt-16">
			{@render children()}
		</main>
		<Footer {categories} />
	</div>
</ParaglideJS>
