<!-- $lib/pages/slug/ProjectPage.svelte -->
<script lang="ts">
  import { ChevronLeft } from 'lucide-svelte';
  import type { Project } from '$lib/server/contentful';
  import { Button } from "$lib/components/ui/button";
  import * as Popover from "$lib/components/ui/popover";
  import ContactForm from '$lib/components/cta/ContactForm.svelte';
  import { onMount } from 'svelte';

  export let project: Project;
  
  // Simple project information display
  const projectInfo = [];
  if (project.venue) projectInfo.push({ label: "Theatre", value: project.venue });
  if (project.director) projectInfo.push({ label: "Directed by", value: project.director });
  if (project.setDesigner) projectInfo.push({ label: "Set design", value: project.setDesigner });
  if (project.costumeDesigner) projectInfo.push({ label: "Costume design", value: project.costumeDesigner });
  if (project.photographer) projectInfo.push({ label: "Photos", value: project.photographer });
</script>

<main class="min-h-screen bg-background">

	<!-- Project Header -->
  <header class="pt-24 pb-12 z-10 py-4 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-background/95 backdrop-blur-sm border-b">
    <div class="mx-auto max-w-[1920px] flex flex-col sm:flex-row justify-between gap-4">
      <!-- Project Title Section -->
      <div class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">{project.title}</h1>
        {#if project.writer}
          <p class="text-sm md:text-base text-foreground/60">{project.writer}</p>
        {/if}
      </div>
      
      <!-- Project Details Section - Desktop -->
      <div class="md:flex flex _flex-row flex-wrap gap-x-8 gap-y-1 items-center">
        {#each projectInfo as info}
          <div class="text-right">
            <div class="text-xs text-foreground/50">{info.label}</div>
            <div class="text-sm font-medium">{info.value}</div>
          </div>
        {/each}
      </div>
      
      <!-- Actions -->
      <div class="flex items-center gap-2">
        <a href="/#work" class="group inline-flex items-center">
          <Button variant="outline" size="sm" class="gap-1">
            <ChevronLeft class="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span class="hidden sm:inline">Back</span>
          </Button>
        </a>
        
        <Popover.Root>
          <Popover.Trigger asChild let:builder>
            <Button builders={[builder]} variant="secondary" size="sm">
              Contact
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <ContactForm textSize="text-sm" />
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
    
    <!-- Project Details Section - Mobile -->
    <div class="md:hidden flex flex-row flex-wrap gap-x-6 gap-y-1 mt-3">
      {#each projectInfo as info}
        <div>
          <div class="text-xs text-foreground/50">{info.label}</div>
          <div class="text-sm font-medium">{info.value}</div>
        </div>
      {/each}
    </div>
  </header>

  <!-- Project Image Gallery -->
  <div class="gallery px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8">
    {#if project.media?.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each project.media as image, i}
          <div class="gallery-item overflow-hidden {i === 0 ? 'md:col-span-2' : ''}">
            <img 
              src={image.url} 
              alt={image.title || `${project.title} - Image ${i + 1}`}
              class="w-full h-auto object-contain"
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
  /* Optional: Add subtle animation to gallery items */
  .gallery-item {
    transition: transform 0.2s ease-in-out;
  }
  
  .gallery-item:hover {
    transform: translateY(-2px);
  }
</style>