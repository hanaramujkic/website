<!-- src/lib/pages/landing/Landing.svelte -->
<script lang="ts">
  import type { Project } from '$lib/server/contentful';
  import Hero from './Hero.svelte';
  import About from './About.svelte';
  import Contact from './Contact.svelte';
  import Portfolio from '$lib/components/portfolio/Portfolio.svelte';
  
  export let projects: Project[] = [];
  export let isLoading = false;
  export let error: string | null = null;
</script>

<div class="relative overflow-hidden">

	<Hero />
  <main class="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8 relative z-10">
    <section id="work" class="mb-16">
      <hr class="border-t border-black dark:border-white w-full my-8" />
      {#if isLoading}
        <p>Loading projects...</p>
      {:else if error}
        <p class="text-red-500">Error: {error}</p>
      {:else if projects.length > 0}
        <Portfolio {projects} />
      {:else}
        <p>No projects found.</p>
      {/if}
    </section>

    <About />
    <Contact />
  </main>
</div>