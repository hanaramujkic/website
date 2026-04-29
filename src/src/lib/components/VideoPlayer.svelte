<!-- src/lib/components/VideoPlayer.svelte -->
<script lang="ts">
  import { Volume2, VolumeX } from 'lucide-svelte';

  export let src = '/die_riesen_vom_berge_hero.mp4';
  export let poster = '';
  export let fit: 'cover' | 'contain' = 'cover';

  let videoEl: HTMLVideoElement;
  let isMuted = true;

  $: fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  function toggleSound() {
    if (!videoEl) return;

    videoEl.muted = !videoEl.muted;
    isMuted = videoEl.muted;
  }
</script>

<div class="relative w-full h-full overflow-hidden bg-black">
  <video
    bind:this={videoEl}
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    poster={poster}
    class={`absolute inset-0 w-full h-full ${fitClass} bg-black`}
  >
    <source src={src} type="video/mp4" />
  </video>

  <slot />

  <button
    on:click={toggleSound}
    class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-12 lg:right-16 xl:right-24 2xl:right-32 z-30 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition"
    aria-label="Toggle sound"
    type="button"
  >
    {#if isMuted}
      <VolumeX size={16} strokeWidth={2} />
    {:else}
      <Volume2 size={16} strokeWidth={2} />
    {/if}
  </button>
</div>