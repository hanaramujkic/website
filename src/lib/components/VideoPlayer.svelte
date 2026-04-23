<!-- src/lib/components/VideoPlayer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Volume2, VolumeX } from 'lucide-svelte';

  export let videoId = '8Dyvs9qxpz8';
  export let start = 8;
  export let end = 92; // 1:32

  let playerContainer: HTMLDivElement;
  let player: any = null;
  let isMuted = true;
  let loopInterval: ReturnType<typeof setInterval> | null = null;

  declare global {
    interface Window {
      YT: any;
      onYouTubeIframeAPIReady: (() => void) | undefined;
    }
  }

  function loadYouTubeAPI(): Promise<void> {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );

      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }

      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        resolve();
      };
    });
  }

  function startLoopWatcher() {
    stopLoopWatcher();

    loopInterval = setInterval(() => {
      if (!player || typeof player.getCurrentTime !== 'function') return;

      const currentTime = player.getCurrentTime();

      if (currentTime >= end) {
        player.seekTo(start, true);
        player.playVideo();
      }
    }, 500);
  }

  function stopLoopWatcher() {
    if (loopInterval) {
      clearInterval(loopInterval);
      loopInterval = null;
    }
  }

  function createPlayer() {
    if (!window.YT || !window.YT.Player || !playerContainer) return;

    player = new window.YT.Player(playerContainer, {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        mute: 1,
        loop: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        start,
        end,
        enablejsapi: 1,
        iv_load_policy: 3,
        disablekb: 1,
        fs: 0
      },
      events: {
        onReady: (event: any) => {
          event.target.mute();
          event.target.seekTo(start, true);
          event.target.playVideo();
          isMuted = true;
          startLoopWatcher();
        },
        onStateChange: (event: any) => {
          if (window.YT && event.data === window.YT.PlayerState.ENDED) {
            event.target.seekTo(start, true);
            event.target.playVideo();
          }
        }
      }
    });
  }

  function toggleSound() {
    if (!player) return;

    if (isMuted) {
      player.unMute();
      isMuted = false;
    } else {
      player.mute();
      isMuted = true;
    }
  }

  onMount(async () => {
    await loadYouTubeAPI();
    createPlayer();

    return () => {
      stopLoopWatcher();

      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
    };
  });
</script>

<div class="relative w-full h-full overflow-hidden bg-black">
  <!-- Background video -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute inset-0 youtube-player">
      <div bind:this={playerContainer} class="w-full h-full"></div>
    </div>
  </div>

  <!-- Gradient overlay -->
  <div class="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/35 to-transparent"></div>

  <!-- Content slot -->
  <div class="absolute inset-0 z-20">
    <slot />
  </div>

  <!-- Sound toggle -->
  <button
    on:click={toggleSound}
    class="absolute bottom-8 right-4 sm:right-6 md:right-12 lg:right-16 xl:right-24 2xl:right-32 z-30 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition"
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

<style>
  .youtube-player {
    transform: scale(1.35);
    transform-origin: center center;
  }

  .youtube-player :global(iframe) {
    width: 100%;
    height: 100%;
    border: 0;
    pointer-events: none;
  }

  @media (max-width: 767px) {
    .youtube-player {
      transform: scale(1.8);
    }
  }
</style>
