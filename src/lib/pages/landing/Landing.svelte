<!-- src/lib/pages/landing/Landing.svelte -->
<script lang="ts">
	import type { Project } from "$lib/server/contentful";
	import Hero from "./Hero.svelte";
	import About from "./About.svelte";
	import Contact from "./Contact.svelte";
	import Portfolio from "$lib/components/portfolio/Portfolio.svelte";

	export let projects: Project[] = [];
	export let isLoading = false;
	export let error: string | null = null;
</script>

<main class="">
	<section
		class="h-[80vh]"
	>
		<Hero />
	</section>
	
	<section id="work" class="max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		<hr class="border-t border-black dark:border-white w-full mb-16" />
		{#if isLoading}
			<p>Loading projects...</p>
		{:else if error}
			<p class="text-red-500">Error: {error}</p>
		{:else if projects.length > 0}
			<Portfolio {projects} />
		{:else}
			<p>No projects found.</p>
		{/if}
	</section>

	<section class="max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		<About />
	</section>
	
	<section class="max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		<Contact />
	</section>

</main>
