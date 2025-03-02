<!-- $lib/components/portfolio/ProjectNavigation.svelte -->
<script lang="ts">
  import { ChevronLeft } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import type { Project } from '$lib/server/contentful';
  import { goto } from '$app/navigation';
  
  export let currentProject: Project;
  export let projects: Project[] = [];
  
  // Function to generate slug from title without hardcoding
  function getSlugFromTitle(title: string): string {
    return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }
  
  // Sort projects by spot if available
  $: sortedProjects = [...projects].sort((a, b) => {
    if (typeof a.spot === 'number' && typeof b.spot === 'number') {
      return a.spot - b.spot;
    }
    return 0;
  });
  
  // Find current project index
  $: currentIndex = sortedProjects.findIndex(p => p.id === currentProject.id);
  
  // Handle number click
  function handleNumberClick(project: Project) {
    const slug = getSlugFromTitle(project.title);
    goto(`/${slug}`);
  }
  
  // Determine which numbers to show (current, 2 before, 2 after)
  $: visibleRange = 2; // How many numbers to show on each side
  $: totalProjects = sortedProjects.length;
  
  // Calculate visible projects indices
  $: visibleIndices = Array.from({ length: totalProjects }, (_, i) => i)
    .filter(i => Math.abs(i - currentIndex) <= visibleRange * 2); // Only show nearby projects
</script>

<div class="flex flex-col space-y-4">
  <!-- Back to Work link -->
  <a href="/#work" class="inline-flex items-center text-foreground/20 hover:text-foreground transition-colors">
    <Button variant="secondary" class="bg-foreground/5 p-3 h-auto flex items-center gap-1">
      <ChevronLeft class="h-4 w-4 opacity-40" />
      <!-- <span class="text-foreground/s50">Work</span> -->
    </Button>
  </a>

  <!-- Number selector with fading effect -->
  <div class="relative flex items-center justify-center w-full h-12 overflow-hidden">
    <!-- Left gradient fade -->
    <div class="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10"></div>
    
    <!-- Project numbers -->
    <div class="flex items-center space-x-1 px-16">
      {#each sortedProjects as project, index}
        <!-- Only render numbers that are within our visible range -->
        {#if Math.abs(index - currentIndex) <= visibleRange * 2}
          <button
            class="flex items-center justify-center h-10 w-8 rounded-full transition-all duration-200 focus:outline-none"
            class:font-bold={index === currentIndex}
            class:text-primary={index === currentIndex}
            class:bg-secondary={index === currentIndex}
            class:text-foreground={index !== currentIndex}
            class:hover:text-foreground={index !== currentIndex}
            style="opacity: {1 - Math.abs(index - currentIndex) * 0.2 > 0.4 ? 1 - Math.abs(index - currentIndex) * 0.2 : 0.4};"
            on:click={() => handleNumberClick(project)}
            aria-label={`Project ${index + 1}: ${project.title}`}
          >
            {index + 1}
          </button>
        {/if}
      {/each}
    </div>
    
    <!-- Right gradient fade -->
    <div class="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10"></div>
  </div>
</div>