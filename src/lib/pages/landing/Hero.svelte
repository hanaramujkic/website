<!-- src/lib/pages/landing/Hero.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';

  let isMobile = false;

  function updateViewport() {
    isMobile = window.innerWidth < 768;
  }

  onMount(() => {
    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  });
</script>

{#if isMobile}
<section class="bg-black text-white">
  <!-- Headline -->
  <div class="px-4 pt-28 pb-14">
    <div class="text-white text-right flex flex-col items-end gap-2">
      <h1 class="text-[2.2rem] font-medium tracking-wide leading-[0.95]">
        SCENOGRAPHY
      </h1>

      <h1 class="text-[2.2rem] font-medium tracking-wide leading-[0.95]">
        + COSTUME
      </h1>

      <h1 class="text-[2.2rem] font-medium tracking-wide leading-[0.95]">
        DESIGN
      </h1>
    </div>
  </div>

  <!-- Video -->
  <div class="px-3 pb-12">
    <div class="aspect-video overflow-hidden bg-black">
      <VideoPlayer />
    </div>
  </div>

  <!-- Caption -->
  <div class="px-4 pb-10">
    <h2 class="text-[1.15rem] font-semibold mb-2">
      Die Riesen vom Berge
    </h2>

    <p class="text-base text-white/85 mb-5">
      Luigi Pirandello
    </p>

    <p class="text-sm text-white/75">
      Staatstheater Wiesbaden
    </p>
  </div>
</section>
{:else}
  <!-- Desktop layout -->
  <div class="relative w-full h-full overflow-hidden">
    <VideoPlayer>
      <div class="absolute inset-0 z-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <div class="absolute top-20 sm:top-24 md:top-28 left-1/2 -translate-x-1/2">
          <div class="text-white text-right flex flex-col items-end gap-1 sm:gap-2 md:gap-4">
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
    </VideoPlayer>
  </div>
{/if}
