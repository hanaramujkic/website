<!-- src/lib/components/Footer.svelte -->
<footer class="relative bg-black text-white">
  <div class="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 md:py-20">
      <!-- Branding & Copyright -->
      <div class="md:col-span-4 space-y-4">
        <div class="space-y-2">
          <h2 class="text-2xl md:text-3xl font-extralight tracking-wide">HANA RAMUJKIC</h2>
          <p class="text-sm font-light text-white/60">Scenographer & Costume Designer</p>
        </div>
        <p class="text-sm text-white/40 pt-4">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
      
      <!-- Contact Info -->
      <div class="md:col-span-4 space-y-4">
        <h3 class="text-sm font-medium uppercase tracking-wider text-white/60">Contact</h3>
        <ul class="space-y-3 text-sm">
          <li>
            <a href="mailto:hanaramujkic1@gmail.com" class="text-white/80 hover:text-white transition-colors">
              hanaramujkic1@gmail.com
            </a>
          </li>
          <li>
            <a href="tel:+43677643151664" class="text-white/80 hover:text-white transition-colors">
              +43 677 64 3151 64
            </a>
          </li>
          <li class="text-white/80">
            Vienna, Austria
          </li>
        </ul>
      </div>
      
      <!-- Quick Links -->
      <div class="md:col-span-4 space-y-4">
        <h3 class="text-sm font-medium uppercase tracking-wider text-white/60">Quick Links</h3>
        <ul class="space-y-3 text-sm">
          <li>
            <a href="/cv" class="text-white/80 hover:text-white transition-colors">
              Curriculum Vitae
            </a>
          </li>
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
      </div>
    </div>
  </div>
</footer>