<!-- src/lib/pages/landing/Hero.svelte -->
<script lang="ts">
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import { Play } from 'lucide-svelte';
</script>

<div class="relative w-full h-full overflow-hidden">
  <!-- Hero Text -->
  <div class="absolute top-32 left-[10%] z-20 md:left-[15%]">
    <div class="text-white text-right flex flex-col items-end">
      <h1 class="text-5xl sm:text-5xl md:text-6xl font-medium tracking-wide mb-2 whitespace-nowrap">SCENOGRAPHY</h1>
      <h1 class="text-5xl sm:text-5xl md:text-6xl font-medium tracking-wide mb-2 whitespace-nowrap">+ COSTUME</h1>
      <h1 class="text-5xl sm:text-5xl md:text-6xl font-medium tracking-wide whitespace-nowrap">DESIGN</h1>
    </div>
  </div>

  <div class="absolute inset-0">
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 z-10 bg-gradient-to-l from-transparent via-black/20 to-black/80"></div>
    
    <VideoPlayer>
      <div slot="play-button">
        <button
          class="absolute z-20 group transform transition-all duration-300
                 left-1/2 top-1/2 md:left-[75%] md:top-[60%]
                 -translate-x-1/2 -translate-y-1/2"
        >
          <div class="relative">
            <div class="absolute inset-0 bg-white/30 rounded-full scale-[1.3] group-hover:scale-[1.5] transition-transform duration-300"></div>
            <div class="relative bg-white/20 hover:bg-white/30 rounded-full p-6 transition-colors duration-300">
              <Play class="w-8 h-8 text-white" />
            </div>
          </div>
        </button>
      </div>
    </VideoPlayer>
  </div>
</div>