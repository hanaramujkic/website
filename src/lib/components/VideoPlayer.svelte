<!-- src/lib/components/VideoPlayer.svelte -->

<script lang="ts">
  import { Play, X } from 'lucide-svelte';
  
  export let videoUrl: string;
  export let posterUrl: string | undefined = undefined;
  export let title: string | undefined = undefined;
  
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

  // Handle Escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && showPlayer) {
      closeVideoPlayer();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<!-- Background Video -->
<div class="relative">
  <video
    class="absolute w-full h-auto object-cover"
    autoplay
    loop
    muted
    playsinline
    poster={posterUrl}
  >
    <source src={videoUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <!-- Play Button -->
  <button
    class="ml-4 sm:ml-8 md:ml-16 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 rounded-full p-4"
    on:click={openVideoPlayer}
    aria-label={`Play ${title || 'video'}`}
  >
    <Play class="w-8 h-8 text-white" />
  </button>
</div>

<!-- Modal -->
{#if showPlayer}
  <div 
    class="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
    on:click={closeVideoPlayer}
  >
    <div 
      class="relative w-full max-w-4xl mx-4"
      on:click|stopPropagation={() => {}}
    >
      <button
        class="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
        on:click={closeVideoPlayer}
        aria-label="Close video"
      >
        <X class="w-6 h-6" />
      </button>
      
      <video
        bind:this={videoElement}
        class="w-full rounded-lg"
        controls
        autoplay
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
{/if}