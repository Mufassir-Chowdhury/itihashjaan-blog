<script lang="ts">
	const currentYear = new Date().getFullYear();
	export let categories;
</script>

<footer class="bg-gray-900 text-gray-300">
	<div class="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Brand -->
			<div class="mb-8 md:mb-0">
				<h2 class="text-2xl font-bold text-amber-500">ইতিহাসযান</h2>
				<p class="mt-4 text-sm">সত্ত্বা, বর্তমানতা ও ইতিহাস</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="text-lg font-semibold text-white">দ্রুত লিঙ্ক</h3>
				<ul class="mt-4 space-y-2">
					<li>
						<a href="/" class="text-sm hover:text-amber-400">মূল পাতা</a>
					</li>
					<li>
						<a href="/articles" class="text-sm hover:text-amber-400">নিবন্ধ সমূহ</a>
					</li>
					<li>
						<a href="/authors" class="text-sm hover:text-amber-400">লেখকসমূহ</a>
					</li>
					<li>
						<a href="/about" class="text-sm hover:text-amber-400">আমাদের সম্পর্কে</a>
					</li>
					<li>
						<a href="/contact" class="text-sm hover:text-amber-400">যোগাযোগ</a>
					</li>
				</ul>
			</div>

			<!-- Categories -->
			<div>
				<h3 class="text-lg font-semibold text-white">বিভাগ সমূহ</h3>
				<ul class="mt-4 space-y-2">
					{#each categories as category}
						<li>
							<a href="/articles?category={category.slug}" class="text-sm hover:text-amber-400"
								>{category.name}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h3 class="text-lg font-semibold text-white">যোগাযোগ</h3>
				<ul class="mt-4 space-y-2">
					<li class="flex items-center space-x-2">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<a href="mailto:contact@itihasjaan.com" class="text-sm hover:text-amber-400">
							contact@itihasjaan.com
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="mt-12 border-t border-gray-800 py-6">
			<div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
				<p class="text-sm">
					&copy; {currentYear} ইতিহাসযান। সর্বস্বত্ব সংরক্ষিত।
				</p>
				<div class="flex space-x-6">
					<a
						href="https://www.facebook.com/profile.php?id=61551717886324"
						class="text-gray-400 hover:text-amber-400"
					>
						<span class="sr-only">Facebook</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"
							/>
						</svg>
					</a>
					<a href="https://www.youtube.com/@Itihashjaan" class="text-gray-400 hover:text-amber-400">
						<span class="sr-only">YouTube</span>
						<svg
							height="24px"
							width="24px"
							fill="currentColor"
							version="1.1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 461.001 461.001"
							xml:space="preserve"
						>
							<g>
								<path
									d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
		c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
		C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
		c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
								/>
							</g>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
