<!-- src/lib/pages/slug/ProjectPage.svelte -->
<script lang="ts">
  import type { Project } from '$lib/server/contentful';
  import ContactForm from '$lib/components/cta/ContactForm.svelte';
  import * as Popover from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from 'svelte';

  export let project: Project;

  let currentImageIndex = 0;
  let imageContainer: HTMLElement;

  const fieldLabels = {
    conductor: 'Musical direction',
    director: 'Directed by',
    venue: 'Theatre',
  };

  $: projectDetails = Object.entries(fieldLabels).reduce((acc, [field, label]) => {
    if (project[field]) {
      acc.push({ label, value: project[field] });
    }
    return acc;
  }, []);

  $: {
    if (project.setDesigner && project.costumeDesigner && 
        project.setDesigner === project.costumeDesigner) {
      projectDetails.push({ 
        label: 'Set and costume design', 
        value: project.setDesigner 
      });
    } else {
      if (project.setDesigner) {
        projectDetails.push({ label: 'Set design', value: project.setDesigner });
      }
      if (project.costumeDesigner) {
        projectDetails.push({ label: 'Costume design', value: project.costumeDesigner });
      }
    }
  }

  $: if (project.photographer) {
    projectDetails.push({ 
      label: 'Photos', 
      value: project.photographer, 
      class: 'opacity-60' 
    });
  }

  onMount(() => {
    if (imageContainer) {
      const updateCurrentImage = () => {
        // Image scrolling logic here if needed
      };
      
      imageContainer.addEventListener('scroll', updateCurrentImage);
      return () => {
        imageContainer.removeEventListener('scroll', updateCurrentImage);
      };
    }
  });
</script>

<div class="min-h-screen flex flex-col md:flex-row">
  <!-- Left column for project details -->
  <div class="w-full md:w-1/3 p-8 flex flex-col justify-between overflow-y-auto">
    <div>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-6">{project.title}</h1>
        {#if project.writer}
          <h3 class="text-lg opacity-60">{project.writer}</h3>
        {/if}
      </div>
      
      <div class="space-y-4">
        {#each projectDetails as detail}
          <p>
            <span class="text-sm font-light">{detail.label}</span><br>
            <span class="text-lg font-semibold {detail.class || ''}">{detail.value}</span>
          </p>
        {/each}
      </div>
    </div>
    <div class="mb-2 mt-12 md:mb-20 md:mt-4">
      <Popover.Root>
        <Popover.Trigger asChild let:builder>
          <Button builders={[builder]} variant="secondary">Contact</Button>
        </Popover.Trigger>
        <Popover.Content class="w-80">
          <ContactForm />
        </Popover.Content>
      </Popover.Root>
    </div>
  </div>

  <!-- Right column for images -->
  <div 
    class="w-full md:w-2/3 h-screen overflow-y-scroll image-container"
    bind:this={imageContainer}
  >
    {#if project.media?.length > 0}
      {#each project.media as image}
        <div class="mb-4">
          <img 
            src={image.url} 
            alt={image.title} 
            class="w-full h-auto project-image"
          />
        </div>
      {/each}
    {:else}
      <p class="text-center py-8">No images available</p>
    {/if}
  </div>
</div>

<style>
  .image-container::-webkit-scrollbar {
    display: none;
  }

  .image-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>