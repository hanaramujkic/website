<!-- src/lib/components/VideoPlayer.svelte -->
<script lang="ts">
  import { Play, X } from 'lucide-svelte';
  
  export let videoId = '8Dyvs9qxpz8';
  let showPlayer = false;

  function openVideoPlayer() {
    showPlayer = true;
  }

  function closeVideoPlayer() {
    showPlayer = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && showPlayer) {
      closeVideoPlayer();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<!-- Background Video -->
<div class="relative w-full h-full">
  <iframe
    src="https://www.youtube.com/embed/{videoId}?autoplay=1&controls=0&mute=1&loop=1&playlist={videoId}&start=8&modestbranding=1"
    class="absolute w-full h-full"
    title="Background video"
    style="pointer-events: none;"
  ></iframe>

  <slot name="play-button">
    <button
      on:click={openVideoPlayer}
      class="absolute z-20 bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all"
    >
      <Play class="w-8 h-8 text-white" />
    </button>
  </slot>
</div>

<!-- Modal -->
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
        <X class="w-6 h-6" />
      </button>
      
      <iframe
        src="https://www.youtube.com/embed/{videoId}?autoplay=1&modestbranding=1"
        class="w-full aspect-video rounded-lg"
        title="Video player"
        allowfullscreen
      ></iframe>
    </div>
  </div>
{/if}

<style>
  iframe {
    border: 0;
  }
</style>