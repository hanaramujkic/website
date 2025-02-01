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

<!-- Background Video Container -->
<div class="relative w-[120%] h-full -left-[10%] overflow-hidden">
  <iframe
    src="https://www.youtube.com/embed/{videoId}?autoplay=1&controls=0&mute=1&loop=1&playlist={videoId}&start=8&modestbranding=1"
    class="absolute w-full h-[120%] -bottom-[10%] scale-125"
    title="Background video"
    style="pointer-events: none;"
  ></iframe>

  <!-- Play Button Container - Forward click events -->
  <button 
    class="absolute inset-0 z-10"
    on:click={() => openVideoPlayer()}
  >
    <slot name="play-button">
      <button
        class="absolute z-20 bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all"
      >
        <Play class="w-8 h-8 text-white" />
      </button>
    </slot>
  </button>
</div>

<!-- Modal -->
{#if showPlayer}
  <button 
    class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    on:click={closeVideoPlayer}
  >
    <button 
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
    </button>
  </button>
{/if}

<style>
  iframe {
    border: 0;
  }
</style>

