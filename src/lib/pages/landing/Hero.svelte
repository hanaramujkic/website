<!-- src/lib/pages/landing/Hero.svelte -->
<script lang="ts">
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
</script>

<div class="relative w-full h-full overflow-hidden">
  <VideoPlayer>
    <!-- Shared page-width container -->
    <div class="absolute inset-0 z-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      
      <!-- Main hero headline -->
      <div class="absolute top-24 sm:top-28 md:top-32 left-1/2 -translate-x-1/2">
        <div class="text-white text-right flex flex-col items-end md:gap-4">
          <h1 class="text-[2.5em] sm:text-5xl md:text-6xl font-medium tracking-wide whitespace-nowrap">
            SCENOGRAPHY
          </h1>
          <h1 class="text-[2.5em] sm:text-5xl md:text-6xl font-medium tracking-wide whitespace-nowrap">
            + COSTUME
          </h1>
          <h1 class="text-[2.5em] sm:text-5xl md:text-6xl font-medium tracking-wide whitespace-nowrap">
            DESIGN
          </h1>
        </div>
      </div>

<!-- Featured project info -->
<div class="absolute bottom-8 left-4 sm:left-6 md:left-12 lg:left-16 xl:left-24 2xl:left-32 w-[240px] text-white">
  <h2 class="text-base sm:text-lg md:text-[1.55rem] font-semibold leading-none mb-1 whitespace-nowrap">
    Die Riesen vom Berge
  </h2>

  <p class="text-xs sm:text-sm md:text-[15px] text-white/85 mb-3">
    Luigi Pirandello
  </p>

  <p class="text-[10px] sm:text-[11px] md:text-[13px] leading-[1.35] text-white/80">
    Staatstheater Wiesbaden
  </p>
</div>
      </div>
    </div>
  </VideoPlayer>
</div>
