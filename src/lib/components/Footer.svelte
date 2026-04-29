<!-- $lib/components/Footer.svelte -->
<script lang="ts">
  import { Download } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import ContactForm from './cta/ContactForm.svelte';
</script>
<!-- style="margin-bottom: -1px; border-bottom-color: rgb(24 24 27);"> -->
<div class="relative">
  <!-- Contact Form Container -->
  <!-- <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-full w-full max-w-lg"> -->
  <!-- <div class="absolute left-0 transform ___-translate-x-1/2 -translate-y-full w-full max-w-xl
							px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32
	">
    <div class="bg-zinc-950 dark:bg-black rounded-t-[3rem] border border-white/10 px-10 pt-10 pb-6
			-my-[1px] border-b-zinc-950">
         
      <ContactForm textSize="text-lg" />
    </div>
  </div> -->

  <!-- Footer -->
  <footer class="bg-zinc-950 dark:bg-black text-white border-t border-white/10 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <div class="mx-auto max-w-[1920px] ">
      <div class="flex flex-col py-10">
        <!-- Main content -->
        <div class="flex flex-col md:flex-row justify-between mb-24">
          <!-- Branding -->
          
					<div class="mb-16 md:mb-0">
            <!-- <ContactForm textSize="text-lg" /> -->
						<div class="space-y-2">
              <div class="text-[4.5rem] leading-[1.1] md:text-[5rem] font-light tracking-wide text-white/20">
                <div>HANA RAMUJKIC</div>
                <!-- <div>RAMUJKIC</div> -->
              </div>
              <p class="text-xl font-medium text-white/20">
                Stage & Costume Designer
              </p>
            </div>
          </div>

          <!-- Links -->
          <div class="flex flex-col items-start space-y-6">
            <ul class="space-y-4 text-lg">
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
              href="./Hana_Ramujkic_Resume_2026.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="secondary" 
                size="lg" 
                class="flex items-center text-white gap-2 bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Download class="h-4 w-4" />
                Read CV
              </Button>
            </a>
          </div>
        </div>

        <!-- Copyright at bottom -->
        <div class="text-xs text-white/30">
          © {new Date().getFullYear()} 
						<span class="text-white/20">
							• dev by
							<a href="https://veenie.space" class="hover:underline hover:text-foreground">veenie</a>
						</span>
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
