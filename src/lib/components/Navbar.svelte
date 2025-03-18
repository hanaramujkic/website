<!-- $lib/components/Navbar.svelte -->
<script lang="ts">
  import { Sun, Moon, Download } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import * as Popover from "$lib/components/ui/popover";
  import { fade, fly } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { Menu as MenuIcon, X } from 'lucide-svelte';
  import ContactForm from '$lib/components/cta/ContactForm.svelte';

  let y: number;
  let lastScrollY = 0;
  let isVisible = true;
  let isMenuOpen = false;

  function handleScroll() {
    isVisible = lastScrollY > y || y < 50;
    lastScrollY = y;
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  const navItems = [
    { href: "./#work", label: "Work" },
    { href: "./#about", label: "About" },
    { href: "#", label: "Contact", isPopover: true }
  ];

  $: if (typeof y !== 'undefined') handleScroll();
</script>

<svelte:window bind:scrollY={y}/>

{#if isVisible}
  <nav 
    class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
    transition:fade={{ duration: 200 }}
  >
    <div class="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-4 flex justify-between items-center">
      <a 
        class="text-lg sm:text-2xl font-semibold text-foreground hover:text-foreground/80 transition-colors" 
        href="/"
      >
        Hana Ramujkic
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-6">
        {#each navItems as item}
          {#if item.isPopover}
            <Popover.Root>
              <Popover.Trigger asChild let:builder>
                <Button 
                  builders={[builder]} 
                  variant="link" 
                  class="text-lg font-light hover:text-foreground/80 p-0"
                >
                  {item.label}
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <ContactForm />
              </Popover.Content>
            </Popover.Root>
          {:else}
            <a 
              href={item.href} 
              class="text-lg font-light text-foreground hover:text-foreground/80 transition-colors"
            >
              {item.label}
            </a>
          {/if}
        {/each}
      </div>
      
      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center space-x-4">
        <a 
          href="./Hana_Ramujkic_Resume_EN_2025.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="sm" class="flex items-center gap-2">
            <Download class="h-4 w-4" />
            CV
          </Button>
        </a>
        <Button 
          variant="ghost" 
          size="icon" 
          on:click={toggleMode}
          class="h-8 w-8"
        >
          <Sun 
            class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon 
            class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          on:click={toggleMode}
          class="h-8 w-8"
        >
          <Sun 
            class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon 
            class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>
        <Button 
          on:click={toggleMenu} 
          variant="ghost" 
          size="icon"
          class="relative z-50"
        >
          {#if isMenuOpen}
            <X class="h-4 w-4" />
          {:else}
            <MenuIcon class="h-4 w-4" />
          {/if}
        </Button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <button 
        class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
        transition:fade={{ duration: 200 }}
        on:click={closeMenu}
      >
        <button
          class="absolute top-[4.5rem] left-0 right-0 border-b bg-background"
          transition:fly={{ y: -100, duration: 200, easing: cubicInOut }}
          on:click|stopPropagation
        >
          <nav class="px-4 py-6 flex flex-col">
            <ul class="space-y-4">
              {#each navItems as item}
                <li>
                  {#if item.isPopover}
                    <Popover.Root>
                      <Popover.Trigger asChild let:builder>
                        <Button 
                          builders={[builder]} 
                          variant="link" 
                          class="text-lg py-2 text-foreground/60 hover:text-foreground p-0"
                        >
                          {item.label}
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content>
                        <ContactForm textSize="text-sm"/>
                      </Popover.Content>
                    </Popover.Root>
                  {:else}
                    <a
                      href={item.href}
                      class="block text-lg py-2 text-foreground/60 hover:text-foreground transition-colors"
                      on:click={closeMenu}
                    >
                      {item.label}
                    </a>
                  {/if}
                </li>
              {/each}
            </ul>

            <div class="mt-6">
              <a 
                href="./Hana_Ramujkic_Biography_eng2024.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-full"
              >
                <Button variant="secondary" class="w-full flex items-center justify-center gap-2">
                  <Download class="h-4 w-4" />
                  Download CV
                </Button>
              </a>
            </div>
          </nav>
        </button>
      </button>
    {/if}
  </nav>
{/if}