<!-- $lib/pages/slug/ProjectPage.svelte -->
<script lang="ts">
	import type { Project } from "$lib/server/contentful";
	import ProjectNavigation from "$lib/components/portfolio/ProjectNavigation.svelte";
	import Contact from "$lib/pages/landing/Contact.svelte";
	import ImageModal from "$lib/components/portfolio/ImageModal.svelte";
	import { Volume2, VolumeX } from "lucide-svelte";
	
	export let project: Project;
	export let projects: Project[] = [];

	// Create an array of project details to simplify rendering
	const projectDetails = [
		{ label: "Concept", value: project.concept },
		{ label: "Director", value: project.director },
		{ label: "Conductor", value: project.conductor },
		{ label: "Set Design", value: project.setDesigner },
		{ label: "Costume Design", value: project.costumeDesigner },
		{ label: "Mask Design & Sculpting", value: project.maskDesignAndSculpting },
		{ label: "Photos", value: project.photographer },
	].filter((detail) => detail.value); // Filter out undefined values
	
	// Modal state
	let isModalOpen = false;
	let currentImageIndex = 0;

	// Hero video state
	let heroVideoEl: HTMLVideoElement;
	let isMuted = true;
	
	// All project images in a single array for navigation
	$: allImages = project.media || [];
	
	function openModal(index: number) {
		currentImageIndex = index;
		isModalOpen = true;
	}
	
	function goToPreviousImage() {
		if (currentImageIndex > 0) {
			currentImageIndex -= 1;
		}
	}
	
	function goToNextImage() {
		if (currentImageIndex < allImages.length - 1) {
			currentImageIndex += 1;
		}
	}

	function toggleSound() {
		if (!heroVideoEl) return;

		heroVideoEl.muted = !heroVideoEl.muted;
		isMuted = heroVideoEl.muted;
	}
</script>

<main
	class="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-background"
>
	<div class="mx-auto max-w-[1920px]">
		<!-- Top section: First image (left) and details (right) -->
		{#if project.media?.length > 0}
			<div class="flex flex-col md:flex-row md:gap-12 lg:gap-16 xl:gap-20 mb-8">
				<!-- Featured Media - Left 2/3 on desktop, full width on mobile -->
				<div class="w-full md:w-2/3 mb-8 md:mb-0 relative">
					{#if project.heroVideo?.url}
						<div class="w-full overflow-hidden bg-black relative">
							<video
								bind:this={heroVideoEl}
								class="w-full h-auto object-cover"
								autoplay
								muted
								loop
								playsinline
								preload="metadata"
								poster={project.media?.[0]?.url || "/placeholder.svg"}
							>
								<source
									src={project.heroVideo.url}
									type={project.heroVideo.contentType || "video/mp4"}
								/>
								Your browser does not support the video tag.
							</video>

							<button
								on:click={toggleSound}
								class="absolute bottom-4 right-4 z-10 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/80 transition"
								aria-label="Toggle sound"
								type="button"
							>
								{#if isMuted}
									<VolumeX size={18} strokeWidth={2} />
								{:else}
									<Volume2 size={18} strokeWidth={2} />
								{/if}
							</button>
						</div>
					{:else}
						<button
							class="w-full cursor-zoom-in focus:outline-none transform transition-transform duration-200 hover:opacity-95 hover:scale-[1.005]"
							on:click={() => openModal(0)}
						>
							<img
								src={project.media[0].url || "/placeholder.svg"}
								alt={project.media[0].title || project.title}
								class="w-full h-auto"
							/>
						</button>
					{/if}
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

					<div class="mt-8">
						<ProjectNavigation currentProject={project} {projects} />
					</div>
				</div>
			</div>

			<!-- Masonry gallery for remaining images -->
			{#if project.media.length > 1}
				<div class="masonry-grid">
					{#each project.media.slice(1) as image, i}
						<div class="masonry-item">
							<button 
								class="w-full cursor-zoom-in focus:outline-none transform transition-transform duration-200 hover:opacity-95 hover:scale-[1.005]"
								on:click={() => openModal(i + 1)}
							>
								<img
									src={image.url || "/placeholder.svg"}
									alt={image.title || `${project.title} - Image ${i + 2}`}
									class="w-full h-auto"
									loading="lazy"
								/>
							</button>
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

	<!-- Contact Section with Top Gradient -->
	<section class="relative px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pt-24 pb-12">
		<Contact />
	</section>

	<!-- Image Modal with Navigation -->
	{#if allImages.length > 0}
		<ImageModal 
			bind:isOpen={isModalOpen} 
			imageUrl={allImages[currentImageIndex]?.url || ''} 
			imageTitle={allImages[currentImageIndex]?.title || ''} 
			onPrevious={goToPreviousImage}
			onNext={goToNextImage}
			hasPrevious={currentImageIndex > 0}
			hasNext={currentImageIndex < allImages.length - 1}
		/>
	{/if}
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

	/* Ensure images and video load smoothly */
	img,
	video {
		display: block;
		transition: opacity 0.3s;
	}
</style>
