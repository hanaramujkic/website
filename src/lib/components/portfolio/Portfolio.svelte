<!-- $lib/components/portfolio/Portfolio.svelte -->
<script lang="ts">
  import * as Resizable from '$lib/components/ui/resizable';
  import { Button } from "$lib/components/ui/button";
  import ProjectCard from './ProjectCard.svelte';
  import type { Project } from '$lib/server/contentful';

  export let projects: Project[] = [];
  let visibleProjects = 9;

  $: gridItems = projects.slice(0, visibleProjects);

  function showMore() {
    visibleProjects += 2;
    if (visibleProjects > projects.length) {
      visibleProjects = projects.length;
    }
  }

  function getRowLayout(index) {
    const layouts = [
      [66, 34],
      [34, 66],
      [50, 50]
    ];
    return layouts[index % 3];
  }
</script>

<div class="w-full">
  {#each gridItems as project, index (project.id)}
    <div class="mb-3 md:hidden">
      <ProjectCard {project} />
    </div>
  {/each}
  <div class="hidden md:block">
    {#each gridItems as project, index (project.id)}
      {#if index % 2 === 0}
        <Resizable.PaneGroup direction="horizontal" class="mb-1">
          <Resizable.Pane minSize={20} defaultSize={getRowLayout(index / 2)[0]}>
            <ProjectCard {project} />
          </Resizable.Pane>
          <Resizable.Handle withHandle />
          <Resizable.Pane minSize={20} defaultSize={getRowLayout(index / 2)[1]}>
            {#if gridItems[index + 1]}
              <ProjectCard project={gridItems[index + 1]} />
            {/if}
          </Resizable.Pane>
        </Resizable.PaneGroup>
      {/if}
    {/each}
  </div>
</div>

{#if visibleProjects < projects.length}
  <div class="mt-6 text-center">
    <Button on:click={showMore} variant="outline" class="w-full md:w-auto">
      Load More
    </Button>
  </div>
{/if}