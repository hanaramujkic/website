<!-- src/lib/pages/landing/Hero.svelte -->
<script lang="ts">
  import { Play } from 'lucide-svelte';

  let showPlayer = false;
  let videoElement: HTMLVideoElement;

  function openVideoPlayer() {
    showPlayer = true;
  }

  function closeVideoPlayer() {
    if (videoElement) {
      videoElement.pause();
    }
    showPlayer = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && showPlayer) {
      closeVideoPlayer();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>
<!-- px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 -->
<div class="relative w-full h-full">
  <!-- Main Content -->
  <div class="mx-auto max-w-[1920px] h-full relative">
    <!-- Hero Text Positioning -->
    <div class="absolute top-32 left-[10%] z-20 md:left-[15%]">
      <div class="text-white text-right flex flex-col items-end">
        <h1 class="text-5xl sm:text-5xl md:text-6xl font-medium tracking-wide mb-2 whitespace-nowrap">SCENOGRAPHY</h1>
        <h1 class="text-5xl sm:text-5xl md:text-6xl font-medium tracking-wide mb-2 whitespace-nowrap">+ COSTUME</h1>
        <h1 class="text-5xl sm:text-5xl md:text-6xl font-medium tracking-wide whitespace-nowrap">DESIGN</h1>
      </div>
    </div>

    <!-- Video Section -->
    <div class="absolute inset-0 w-full h-full">
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 z-10 bg-gradient-to-l from-transparent via-black/20 to-black/80"></div>
      
      <!-- Video Background -->
      <video
        class="w-full h-full object-cover object-center"
        autoplay
        loop
        muted
        playsinline
      >
        <source src="die_riesen_vom_berge_trailer.mp4" type="video/mp4" />
      </video>

      <!-- Centered Play Button -->
      <button
        class="absolute z-20 group transform transition-all duration-300
               left-1/2 top-1/2 md:left-[75%] md:top-[60%]
               -translate-x-1/2 -translate-y-1/2"
        on:click={openVideoPlayer}
      >
        <div class="relative">
          <div class="absolute inset-0 bg-white/30 rounded-full scale-[1.3] group-hover:scale-[1.5] transition-transform duration-300"></div>
          <div class="relative bg-white/20 hover:bg-white/30 rounded-full p-6 transition-colors duration-300">
            <Play class="w-8 h-8 text-white" />
          </div>
        </div>
      </button>
    </div>
  </div>
</div>

<!-- Video Modal -->
{#if showPlayer}
  <div 
    class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    on:click={closeVideoPlayer}
  >
    <div 
      class="relative w-full max-w-5xl mx-4"
      on:click|stopPropagation={() => {}}
    >
      <button
        class="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
        on:click={closeVideoPlayer}
      >
        Close
      </button>
      
      <video
        bind:this={videoElement}
        class="w-full rounded-lg"
        controls
        autoplay
      >
        <source src="die_riesen_vom_berge_trailer.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
{/if}