<!-- src/lib/pages/landing/Hero.svelte -->
<script lang="ts">
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
</script>

<section class="bg-black text-white">
  <!-- Mobile -->
  <div class="md:hidden">
    <!-- MORE SPACE ABOVE TITLE -->
    <div class="px-4 pt-32 pb-12">
      <div class="text-right flex flex-col items-end gap-2">
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

    <div class="px-3 pb-10">
      <div class="aspect-video overflow-hidden bg-black">
        <VideoPlayer
          src="/die_riesen_vom_berge_hero.mp4"
          poster=""
          fit="contain"
        />
      </div>
    </div>

    <!-- MORE SPACE BEFORE WORK -->
    <div class="px-4 pb-28">
      <h2 class="text-[1.15rem] font-semibold mb-2">
        Die Riesen vom Berge
      </h2>

      <p class="text-base text-white/85 mb-4">
        Luigi Pirandello
      </p>

      <p class="text-sm text-white/75">
        Staatstheater Wiesbaden
      </p>
    </div>
  </div>

  <!-- Desktop -->
  <div class="hidden md:block relative w-full h-[72vh] lg:h-[76vh] xl:h-[80vh] overflow-hidden bg-black mb-36 lg:mb-44 xl:mb-52">
    <VideoPlayer
      src="/die_riesen_vom_berge_hero.mp4"
      poster=""
      fit="cover"
    >
      <div class="absolute inset-0 scale-[0.92] lg:scale-[0.9] origin-center"></div>

      <div class="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent z-10"></div>

      <div class="absolute inset-0 z-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">

        <!-- MAIN TITLE -->
        <div class="absolute top-20 lg:top-24 xl:top-28 left-1/2 -translate-x-1/2">
          <div class="text-white text-right flex flex-col items-end gap-1 md:gap-2">

            <h1 class="text-5xl lg:text-[4rem] xl:text-[4.4rem] font-medium tracking-wide leading-none whitespace-nowrap">
              SCENOGRAPHY
            </h1>

            <h1 class="text-5xl lg:text-[4rem] xl:text-[4.4rem] font-medium tracking-wide leading-none whitespace-nowrap">
              + COSTUME
            </h1>

            <h1 class="text-5xl lg:text-[4rem] xl:text-[4.4rem] font-medium tracking-wide leading-none whitespace-nowrap">
              DESIGN
            </h1>

          </div>
        </div>

        <!-- LEFT INFO -->
        <div class="absolute bottom-10 left-4 sm:left-6 md:left-12 lg:left-16 xl:left-24 2xl:left-32 text-white max-w-[260px]">

          <h2 class="text-base sm:text-lg md:text-[1.25rem] lg:text-[1.45rem] xl:text-[1.6rem] font-semibold leading-none mb-1 whitespace-nowrap">
            Die Riesen vom Berge
          </h2>

          <p class="text-[1rem] text-white/85 mb-5">
            Luigi Pirandello
          </p>

          <p class="text-[14px] text-white/75 leading-snug">
            Staatstheater Wiesbaden
          </p>

        </div>

      </div>
    </VideoPlayer>
  </div>
</section>
