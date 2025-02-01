<!-- src/lib/pages/landing/Landing.svelte -->
<script lang="ts">
  import type { Project } from "$lib/server/contentful";
  import Hero from "./Hero.svelte";
  import About from "./About.svelte";
  import Contact from "./Contact.svelte";
  import Portfolio from "$lib/components/portfolio/Portfolio.svelte";
  
  export let projects: Project[] = [];
  export let isLoading = false;
  export let error: string | null = null;
</script>

<main>
  <!-- Full viewport hero section -->
  <section class="h-[80vh] relative">
    <Hero />
  </section>
  
  <!-- Content sections with consistent max-width -->
  <div class="mx-auto max-w-[1920px]">
    <section id="work" class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-24">
      <hr class="border-t border-black dark:border-white w-full mb-16" />
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

    <section class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pb-72">
      <hr class="border-t pb-24">
			<About />
    </section>
    
    <!-- <section class=""> -->
      <!-- <Contact /> -->
    <!-- </section> -->
  </div>
</main>