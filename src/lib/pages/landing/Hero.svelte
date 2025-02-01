<!-- src/lib/pages/landing/Hero.svelte -->
<script lang="ts">
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
</script>

<div class="relative w-full h-full overflow-hidden">
  <!-- Main Container -->
  <div class="mx-auto max-w-[1920px] h-full relative">
    <!-- Left Content with Progressive Padding -->
    <div class="relative z-20 h-full flex items-center">
      <div class="pl-4 sm:pl-6 md:pl-12 lg:pl-16 xl:pl-24 2xl:pl-32 py-16">
        <!-- Text Block -->
        <div class="text-white text-right border-r-2 border-white pr-16 flex flex-col items-end">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 whitespace-nowrap">SCENOGRAPHY</h1>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 whitespace-nowrap">+ COSTUME</h1>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold whitespace-nowrap">DESIGN</h1>
        </div>
      </div>
    </div>

    <!-- Video Container - Positioned Asymmetrically -->
    <div class="absolute right-0 bottom-0 w-[75%] h-[75vh] overflow-hidden">
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 z-10 bg-gradient-to-l from-transparent via-black/20 to-black/80"></div>
      
      <!-- Video Element -->
      <video
        class="absolute right-0 bottom-0 w-full h-full object-cover object-center"
        autoplay
        loop
        muted
        playsinline
      >
        <source src="die_riesen_vom_berge_trailer.mp4" type="video/mp4" />
      </video>

      <!-- Play Button - Positioned Near Text -->
      <button
        class="absolute top-1/2 left-[15%] z-20 bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-full p-4"
        on:click={() => {}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      </button>
    </div>
  </div>
</div>