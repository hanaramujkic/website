<!-- $lib/pages/slug/ProjectPage.svelte -->
<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
  import type { Project } from '$lib/server/contentful';
	import { Button } from "$lib/components/ui/button"
  import ProjectDetails from '$lib/components/portfolio/ProjectDetails.svelte';

  export let project: Project;
  let imageContainer: HTMLElement;
  let isScrolled = false;
  let lastScrollTop = 0;

  function handleScroll(event) {
    const target = event.target;
    const scrollTop = target.scrollTop;
    
    // Check if we've scrolled more than 50px
    if (scrollTop > 50 && !isScrolled) {
      isScrolled = true;
    } else if (scrollTop <= 50 && isScrolled) {
      isScrolled = false;
    }

    lastScrollTop = scrollTop;
  }
</script>

<main class="min-h-screen flex flex-col md:flex-row px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
  

	
	<ProjectDetails {project} {isScrolled} />

  <div 
    bind:this={imageContainer}
    on:scroll={handleScroll}
    class="w-full md:w-2/3 h-screen overflow-y-auto scroll-smooth"
  >
    {#if project.media?.length > 0}
      <div class="space-y-4 pb-4">
        {#each project.media as image}
          <div class="relative aspect-video md:aspect-auto md:h-screen">
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
</main>

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