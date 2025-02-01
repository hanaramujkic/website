<!-- src/lib/pages/landing/About.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  let y: number;
  let container: HTMLElement;
  let imageWrapper: HTMLElement;
  
  onMount(() => {
    const handleParallax = () => {
      if (container && imageWrapper) {
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const scrolled = window.innerHeight - rect.top;
          imageWrapper.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  });
</script>

<svelte:window bind:scrollY={y}/>

<section id="about" class="relative overflow-hidden py-24" bind:this={container}>
  <hr class="border-t border-black dark:border-white w-full mb-16" />
  
  <div class="flex flex-col md:flex-row gap-8 md:gap-16 mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <div class="w-full md:w-1/2 relative overflow-hidden">
      <div bind:this={imageWrapper} class="relative transition-transform duration-300 ease-out">
        <div class="aspect-[3/4] relative">
          <img 
            src="hana-ramujkic.jpeg" 
            alt="Hana Ramujkic portrait" 
            class="object-cover w-full h-full rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
    
    <div class="w-full md:w-1/2 flex flex-col justify-center">
      <div class="mb-8">
        <h2 class="text-5xl font-extralight tracking-wide mb-2">HANA RAMUJKIC</h2>
        <h3 class="text-xl font-light tracking-wider text-foreground/80">Scenographer & Costume Designer</h3>
      </div>
      
      <div class="space-y-6 text-lg font-light leading-relaxed">
        <p>Through the interplay of space, light, and form, I craft immersive theatrical environments that transcend traditional boundaries. My approach to scenography is rooted in the belief that every design element must serve the narrative while creating moments of visual poetry that resonate with audiences.</p>
        
        <p>Drawing from my unique background in opera and linguistics, I bring a multidisciplinary perspective to each project. This confluence of music, language, and visual arts allows me to create designs that speak on multiple levels, engaging viewers in a dialogue that extends beyond the immediate visual impact.</p>
        
        <p>My work aims to bridge classical theatrical traditions with contemporary sensibilities, making productions accessible to modern audiences while maintaining artistic integrity. Each design is a careful balance of dramatic impact and subtle detail, creating spaces where stories can unfold naturally and powerfully.</p>
      </div>
    </div>
  </div>
</section>