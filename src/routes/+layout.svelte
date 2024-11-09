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
	<div class="flex min-h-screen flex-col">
		<Navbar {categories} />
		<main class="flex-1 pt-16">
			{@render children()}
		</main>
		<Footer {categories} />
	</div>
</ParaglideJS>
