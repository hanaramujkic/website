<!-- $lib/components/Menu.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { Menu as MenuIcon, X } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";

  export let navItems = [];
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }
</script>

<div class="relative z-50">
  <Button 
    on:click={toggleMenu} 
    variant="ghost" 
    size="icon"
    class="relative z-50"
  >
    {#if isOpen}
      <X class="h-4 w-4" />
    {:else}
      <MenuIcon class="h-4 w-4" />
    {/if}
  </Button>

  {#if isOpen}
    <button 
      class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
      transition:fly={{ opacity: 0, duration: 200 }}
      on:click={closeMenu}
    >
      <div
        class="absolute top-[3.5rem] left-0 right-0 border-b bg-background p-4"
        transition:fly={{ y: -100, duration: 200, easing: cubicInOut }}
      >
        <nav class="container">
          <ul class="space-y-4">
            {#each navItems as item}
              <li>
								<a
                  href={item.href}
                  class="block text-lg py-2 text-foreground/60 hover:text-foreground transition-colors"
                  on:click={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
    </button >
  {/if}
</div>