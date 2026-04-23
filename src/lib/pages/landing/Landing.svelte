<!-- src/lib/pages/landing/Landing.svelte -->
<script lang="ts">	
  import type { Project } from "$lib/server/contentful";
  import { onMount } from 'svelte';
  
	import Hero from "./Hero.svelte";
  import About from "./About.svelte";
  import Contact from "./Contact.svelte";
  import Portfolio from "$lib/components/portfolio/Portfolio.svelte";
  
  export let projects: Project[] = [];
  export let isLoading = false;
  export let error: string | null = null;

  
  let workHeading: HTMLElement;
  
  onMount(() => {
    const updateParallax = () => {
      if (workHeading) {
        const rect = workHeading.getBoundingClientRect();
        const scrollOffset = window.innerHeight - rect.top;
        workHeading.style.setProperty('--scroll-offset', scrollOffset.toString());
      }
    };
    
    window.addEventListener('scroll', updateParallax);
    return () => window.removeEventListener('scroll', updateParallax);
  });

</script>

<main>
  <!-- Full viewport hero section -->
  <section class="h-[75vh] relative __border-b">
    <Hero />
  </section>
  
  <!-- Content sections -->
  <div class="mx-auto max-w-[1920px]">
    <section id="work" class="relative px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 mt-[24vh] md:mt-[14vh] lg:mt-[17vh] xl:mt-[20vh] py-6">
      <h1 
        class="absolute top-1 ml-8 transition-transform duration-700 ease-out
               text-5xl sm:text-5xl md:text-6xl font-medium tracking-wide 
               whitespace-nowrap opacity-90"
        style="transform: translateY(calc(var(--scroll-offset, 0) * (-0.1px))"
        bind:this={workHeading}
      >
        WORK
      </h1>

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

    <section id="about" class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-black">
			<!-- <hr class="border-t pb-12"> -->
			<About />
    
		</section>
    
		<section class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pt-24 pb-20">
      <Contact />
    </section>
  </div>
</main>
