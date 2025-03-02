<!-- $lib/pages/slug/ProjectPage.svelte -->
<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import type { Project } from '$lib/server/contentful';
  import { Button } from "$lib/components/ui/button";
  import { onMount } from 'svelte';

  export let project: Project;
  export let projects: Project[] = [];
  
  let currentIndex = -1;
  let prevProject: Project | null = null;
  let nextProject: Project | null = null;
  
  onMount(() => {
    if (projects.length > 0) {
      currentIndex = projects.findIndex(p => p.id === project.id);
      if (currentIndex > 0) {
        prevProject = projects[currentIndex - 1];
      }
      if (currentIndex < projects.length - 1) {
        nextProject = projects[currentIndex + 1];
      }
    }
  });

  // Project info columns setup
  const leftColumnItems = [];
  const rightColumnItems = [];
  
  // Left column - Main info
  if (project.writer) leftColumnItems.push({ value: project.writer });
  if (project.director) leftColumnItems.push({ label: "Direction", value: project.director });
  if (project.venue) leftColumnItems.push({ label: "Theatre", value: project.venue });
  
  // Right column - Production info
  if (project.setDesigner) rightColumnItems.push({ label: "Set", value: project.setDesigner });
  if (project.costumeDesigner) rightColumnItems.push({ label: "Costumes", value: project.costumeDesigner });
  if (project.conductor) rightColumnItems.push({ label: "Music", value: project.conductor });
  if (project.photographer) rightColumnItems.push({ label: "Photography", value: project.photographer });
</script>

<main class="min-h-screen bg-background">
  <!-- Project Header -->
  <header class="pt-24 pb-8 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-background">
    <div class="mx-auto max-w-[1920px]">
      <!-- Project Title -->
      <h1 class="text-3xl md:text-4xl font-semibold mb-1">{project.title}</h1>
      
      <!-- Project Info Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16 mt-6">
        <!-- Left Column -->
        <div class="space-y-2">
          {#each leftColumnItems as item}
            <div>
              {#if item.label}
                <div class="text-sm text-foreground/70">{item.label}</div>
              {/if}
              <div class="text-base font-medium">{item.value}</div>
            </div>
          {/each}
        </div>
        
        <!-- Right Column -->
        <div class="space-y-2 flex flex-col items-start md:items-end">
          {#each rightColumnItems as item}
            <div class="md:text-right">
              {#if item.label}
                <div class="text-sm text-foreground/70">{item.label}</div>
              {/if}
              <div class="text-base font-medium">{item.value}</div>
            </div>
          {/each}
          
          <!-- Navigation Controls -->
          <div class="flex gap-2 mt-auto pt-4">
            <a href="/#work" class="group">
              <Button variant="outline" size="icon" class="h-9 w-9">
                <ChevronLeft class="h-4 w-4" />
              </Button>
            </a>
            
            {#if prevProject}
              <a href="/{prevProject.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}" class="group">
                <Button variant="outline" size="icon" class="h-9 w-9">
                  <ChevronLeft class="h-4 w-4" />
                </Button>
              </a>
            {/if}
            
            {#if nextProject}
              <a href="/{nextProject.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}" class="group">
                <Button variant="outline" size="icon" class="h-9 w-9">
                  <ChevronRight class="h-4 w-4" />
                </Button>
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Project Image Gallery - Masonry Layout -->
  <div class="gallery px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pb-16">
    {#if project.media?.length > 0}
      <div class="masonry-grid">
        {#each project.media as image, i}
          <div class="masonry-item">
            <img 
              src={image.url} 
              alt={image.title || `${project.title} - Image ${i + 1}`}
              class="w-full h-auto"
              loading="lazy"
            />
          </div>
        {/each}
      </div>
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
    border-radius: 2px;
    overflow: hidden;
    display: inline-block;
    width: 100%;
  }
  
  /* Ensure images load smoothly */
  .masonry-item img {
    display: block;
    transition: opacity 0.3s;
  }
  
  /* Optional: subtle hover effect */
  .masonry-item:hover {
    opacity: 0.95;
  }
</style>