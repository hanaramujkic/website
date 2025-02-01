<!-- $lib/pages/slug/ProjectPage.svelte -->
<script lang="ts">
  import type { Project } from '$lib/server/contentful';
  import ProjectDetails from '$lib/components/portfolio/ProjectDetails.svelte';

  export let project: Project;
  let imageContainer: HTMLElement;
  let currentImageIndex = 0;

  function handleScroll() {
    if (!imageContainer) return;
    
    const images = imageContainer.querySelectorAll('img');
    if (!images.length) return;

    const containerRect = imageContainer.getBoundingClientRect();
    let newIndex = currentImageIndex;

    images.forEach((img, index) => {
      const rect = img.getBoundingClientRect();
      const midpoint = (rect.top + rect.bottom) / 2;
      
      if (midpoint > containerRect.top && midpoint < containerRect.bottom) {
        newIndex = index;
      }
    });

    currentImageIndex = newIndex;
  }
</script>

<div class="min-h-screen flex flex-col md:flex-row px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
  <ProjectDetails {project} />

  <!-- Project Images -->
  <div 
    bind:this={imageContainer}
    on:scroll={handleScroll}
    class="w-full md:w-2/3 h-screen overflow-y-auto scroll-smooth"
  >
    {#if project.media?.length > 0}
      <div class="space-y-4 pb-4">
        {#each project.media as image, i}
          <div 
            class="relative aspect-video md:aspect-auto md:h-screen"
          >
            <img 
              src={image.url} 
              alt={image.title}
              class="w-full h-full object-cover"
            />
          </div>
        {/each}
      </div>
    {:else}
      <div class="flex items-center justify-center h-full">
        <p class="text-foreground/60">No images available</p>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Hide scrollbar but maintain functionality */
  .overflow-y-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
</style>