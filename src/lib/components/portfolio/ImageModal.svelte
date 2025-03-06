<!-- $lib/components/portfolio/ImageModal.svelte -->
<script lang="ts">
  import { X, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  
  export let isOpen = false;
  export let imageUrl = '';
  export let imageTitle = '';
  
  // New properties for navigation
  export let onPrevious: () => void = () => {};
  export let onNext: () => void = () => {};
  export let hasPrevious = false;
  export let hasNext = false;
  
  function closeModal() {
    isOpen = false;
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (!isOpen) return;
    
    if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'ArrowLeft' && hasPrevious) {
      onPrevious();
    } else if (event.key === 'ArrowRight' && hasNext) {
      onNext();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content class="max-w-[95vw] sm:max-w-[90vw] p-0 border-none bg-transparent shadow-none">
    <div class="relative">
      <!-- Close button  -->
      <Button 
        variant="ghost" 
        size="icon" 
        class="absolute top-2 right-2 bg-black/50 hover:bg-black/75 text-white z-10 rounded-full" 
        on:click={closeModal}
      >
        <!-- <X class="h-5 w-5" /> -->
      </Button>
      
      <div class="max-h-[90vh] flex items-center justify-center bg-black/95 p-4 rounded-lg">
        <!-- Previous button -->
        {#if hasPrevious}
          <Button
            variant="ghost"
            size="icon"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white z-10 rounded-full h-12 w-12"
            on:click={onPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft class="h-8 w-8" />
          </Button>
        {/if}
        
        <!-- Image -->
        <img 
          src={imageUrl} 
          alt={imageTitle || 'Project image'} 
          class="max-w-full max-h-[85vh] object-contain"
        />
        
        <!-- Next button -->
        {#if hasNext}
          <Button
            variant="ghost"
            size="icon"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white z-10 rounded-full h-12 w-12"
            on:click={onNext}
            aria-label="Next image"
          >
            <ChevronRight class="h-8 w-8" />
          </Button>
        {/if}
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>