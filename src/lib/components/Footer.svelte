<!-- $lib/components/Footer.svelte -->
<script lang="ts">
  import { Download } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import ContactForm from './cta/ContactForm.svelte';
</script>

<div class="relative">
  <!-- Contact Form Container -->
  <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-full w-full max-w-lg">
    <div class="mx-4 bg-zinc-950 dark:bg-black rounded-t-2xl border border-white/10 border-b-0 px-8 py-10">
      <ContactForm textSize="text-lg" />
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-zinc-950 dark:bg-black text-white border-t border-white/10">
    <div class="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
        <!-- Left side with branding -->
        <div class="space-y-4">
          <div class="space-y-2">
            <h2 class="text-3xl font-extralight tracking-wide">HANA RAMUJKIC</h2>
            <p class="text-lg font-light text-white/60">Scenographer & Costume Designer</p>
          </div>
          <p class="text-sm text-white/40 pt-8">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
        
        <!-- Right side with links - Added margin-top for spacing -->
        <div class="space-y-8 md:mt-12">
          <ul class="space-y-4 text-lg font-light">
            <li>
              <a href="/#work" class="text-white/80 hover:text-white transition-colors">
                Portfolio
              </a>
            </li>
            <li>
              <a href="/#about" class="text-white/80 hover:text-white transition-colors">
                About
              </a>
            </li>
          </ul>
          <a 
            href="./Hana_Ramujkic_Biography_eng2024.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              variant="secondary" 
              size="lg" 
              class="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Download class="h-4 w-4" />
              Download Curriculum Vitae
            </Button>
          </a>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Ensure dark mode consistency */
  :global(.dark) .bg-zinc-950 {
    background-color: rgb(0, 0, 0);
  }
</style>