<!-- routes/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import ProjectPage from '$lib/pages/slug/ProjectPage.svelte';

  export let data: PageData;
  
  // Destructure with default empty object to prevent undefined errors
  const { project = null, error = null, metadata = {} } = data;
</script>

<svelte:head>
  {#if project && metadata}
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.description} />
    <meta property="og:image" content={metadata.image} />
    <meta property="og:url" content={metadata.url} />
    <link rel="canonical" href={metadata.url} />
  {/if}
</svelte:head>

{#if error}
  <div class="flex-grow flex items-center justify-center min-h-screen">
    <p class="text-red-500">{error}</p>
  </div>
{:else if project}
  <ProjectPage {project} />
{:else}
  <div class="flex-grow flex items-center justify-center min-h-screen">
    <p>Project not found.</p>
  </div>
{/if}