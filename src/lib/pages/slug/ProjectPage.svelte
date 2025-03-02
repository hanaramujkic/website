<!-- $lib/pages/slug/ProjectPage.svelte -->
<script lang="ts">
	import type { Project } from "$lib/server/contentful";
  import ProjectNavigation from '$lib/components/portfolio/ProjectNavigation.svelte';

	export let project: Project;
  export let projects: Project[] = [];

	
	// Create an array of project details to simplify rendering
	const projectDetails = [
		{ label: "Regie", value: project.director },
		{ label: "Musik", value: project.conductor },
		{ label: "Set Design", value: project.setDesigner },
		{ label: "Kostüme", value: project.costumeDesigner },
		{ label: "Mask Design & Sculpting", value: project.maskDesignAndSculpting },
		{ label: "Photos", value: project.photographer }
	].filter(detail => detail.value); // Filter out undefined values
</script>

<main
	class="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-background"
>


	<div class="mx-auto max-w-[1920px]">
		<!-- Top section: First image (left) and details (right) -->
		{#if project.media?.length > 0}
			<div class="flex flex-col md:flex-row md:gap-12 lg:gap-16 xl:gap-20 mb-8">
				<!-- Featured Image - Left 2/3 on desktop, full width on mobile -->
				<div class="w-full md:w-2/3 mb-8 md:mb-0">
					<img
						src={project.media[0].url || "/placeholder.svg"}
						alt={project.media[0].title || project.title}
						class="w-full h-auto"
					/>
				</div>

				<!-- Project Details - Right 1/3 on desktop, below image on mobile -->
				<div class="pt-6 pl-6 md:pl-0 w-full md:w-1/3">
					<h1 class="text-2xl sm:text-3xl font-semibold mb-2">
						{project.title}
					</h1>

					{#if project.writer}
						<p class="text-medium text-lg mb-6">{project.writer}</p>
					{/if}

					{#if project.venue}
						<div class="mb-6">
							<p class="text-base">{project.venue}</p>
						</div>
					{/if}

					<!-- Unified project details with consistent formatting -->
					{#each projectDetails as detail}
						<p class="text-base mb-2">
							<span class="text-xss font-bold">{detail.label}</span>
							{detail.value}
						</p>
					{/each}
				</div>
			</div>

			<!-- Masonry gallery for remaining images -->
			{#if project.media.length > 1}
				<div class="masonry-grid">
					{#each project.media.slice(1) as image, i}
						<div class="masonry-item">
							<img
								src={image.url || "/placeholder.svg"}
								alt={image.title || `${project.title} - Image ${i + 2}`}
								class="w-full h-auto"
								loading="lazy"
							/>
						</div>
					{/each}
				</div>
			{/if}
		{:else}
			<div class="flex items-center justify-center h-64">
				<p class="text-foreground/60">No images available</p>
			</div>
		{/if}
	</div>
</main>

<style>
	/* True Masonry Layout using CSS columns */
	.masonry-grid {
		column-count: 1;
		column-gap: 16px;
	}

	@media (min-width: 640px) {
		.masonry-grid {
			column-count: 2;
		}
	}

	@media (min-width: 1024px) {
		.masonry-grid {
			column-count: 3;
		}
	}

	.masonry-item {
		break-inside: avoid;
		margin-bottom: 16px;
		overflow: hidden;
		display: inline-block;
		width: 100%;
	}

	/* Ensure images load smoothly */
	img {
		display: block;
		transition: opacity 0.3s;
	}
</style>