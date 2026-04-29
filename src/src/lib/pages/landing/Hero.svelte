<!-- src/lib/pages/landing/Hero.svelte -->
<script lang="ts">
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
</script>

<section class="bg-black text-white">

  <!-- Mobile + iPad / tablet -->
  <div class="xl:hidden">
    <!-- TITLE -->
    <div class="px-4 md:px-12 lg:px-16 pt-28 md:pt-32 pb-10">
      <div class="text-right flex flex-col items-end gap-2">
        <h1 class="text-[2.2rem] md:text-[3.4rem] lg:text-[4rem] font-medium tracking-wide leading-[0.95]">
          SCENOGRAPHY
        </h1>

        <h1 class="text-[2.2rem] md:text-[3.4rem] lg:text-[4rem] font-medium tracking-wide leading-[0.95]">
          + COSTUME
        </h1>

        <h1 class="text-[2.2rem] md:text-[3.4rem] lg:text-[4rem] font-medium tracking-wide leading-[0.95]">
          DESIGN
        </h1>
      </div>
    </div>

    <!-- FULL WIDTH VIDEO -->
    <div class="pb-2">
      <div class="relative left-1/2 w-screen -translate-x-1/2 aspect-[21/9] overflow-hidden">
        <VideoPlayer
          src="/die_riesen_vom_berge_hero.mp4"
          poster=""
          fit="cover"
        />
      </div>
    </div>
  </div>

  <!-- Desktop -->
  <div class="hidden xl:block relative w-full h-[80vh] overflow-hidden bg-black mb-52">
    <VideoPlayer
      src="/die_riesen_vom_berge_hero.mp4"
      poster=""
      fit="cover"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent z-10"></div>

      <div class="absolute inset-0 z-20 px-24 2xl:px-32">

        <!-- TITLE -->
        <div class="absolute top-32 left-[34%] -translate-x-1/2">
          <div class="text-white text-right flex flex-col items-end gap-2">
            <h1 class="text-[4.4rem] font-medium tracking-wide leading-none whitespace-nowrap">
              SCENOGRAPHY
            </h1>

            <h1 class="text-[4.4rem] font-medium tracking-wide leading-none whitespace-nowrap">
              + COSTUME
            </h1>

            <h1 class="text-[4.4rem] font-medium tracking-wide leading-none whitespace-nowrap">
              DESIGN
            </h1>
          </div>
        </div>

      </div>
    </VideoPlayer>
  </div>

</section>