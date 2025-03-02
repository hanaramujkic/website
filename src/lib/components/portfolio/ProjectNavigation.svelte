<!-- $lib/components/portfolio/ProjectNavigation.svelte -->
<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import type { Project } from '$lib/server/contentful';
  
  export let currentProject: Project;
  export let projects: Project[] = [];
  
  // Function to generate slug from title
  function getSlugFromTitle(title: string): string {
    const slugMap: Record<string, string> = {
      "Die Riesen vom Berge": "die-riesen-vom-berge",
      "Kapitän Nemos Bibliothek": "kapitan-nemos-bibliothek",
      "Dippel. Diagnose Cin 3": "dippel-diagnose-cin-3",
      "Reigen": "reigen",
      "Melancholia": "melancholia",
      "Der Kopf der Ariadne!": "der-kopf-der-ariadne",
      "Cinderella": "cinderella",
      "Der zerbrochene Krug": "der-zerbrochene-krug"
    };
    
    return slugMap[title] || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }
  
  let currentIndex = -1;
  let prevProject: Project | null = null;
  let nextProject: Project | null = null;
  
  // Sort projects by spot if available
  $: sortedProjects = [...projects].sort((a, b) => {
    if (typeof a.spot === 'number' && typeof b.spot === 'number') {
      return a.spot - b.spot;
    }
    return 0;
  });
  
  // Find previous and next projects
  $: {
    currentIndex = sortedProjects.findIndex(p => p.id === currentProject.id);
    prevProject = currentIndex > 0 ? sortedProjects[currentIndex - 1] : null;
    nextProject = currentIndex < sortedProjects.length - 1 ? sortedProjects[currentIndex + 1] : null;
  }
</script>

<div class="flex items-center gap-2">
  <a href="/#work" class="group">
    <Button variant="outline" size="icon" class="h-9 w-9" aria-label="Back to all projects">
      <ChevronLeft class="h-4 w-4" />
    </Button>
  </a>
  
  {#if prevProject}
    <a href="/{getSlugFromTitle(prevProject.title)}" class="group" aria-label="Previous project: {prevProject.title}">
      <Button variant="outline" size="icon" class="h-9 w-9">
        <ChevronLeft class="h-4 w-4" />
      </Button>
    </a>
  {/if}
  
  {#if nextProject}
    <a href="/{getSlugFromTitle(nextProject.title)}" class="group" aria-label="Next project: {nextProject.title}">
      <Button variant="outline" size="icon" class="h-9 w-9">
        <ChevronRight class="h-4 w-4" />
      </Button>
    </a>
  {/if}
</div>