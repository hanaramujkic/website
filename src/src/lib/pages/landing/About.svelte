<!-- src/lib/pages/landing/About.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  let sectionEl: HTMLElement;
  let imageEl: HTMLElement;
  let textEl: HTMLElement;

  onMount(() => {
    const handleScroll = () => {
      if (!sectionEl || !imageEl || !textEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const progress = window.innerHeight - rect.top;

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        imageEl.style.transform = `translateY(${progress * 0.035}px)`;
        textEl.style.transform = `translateY(${progress * 0.018}px)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div bind:this={sectionEl} class="relative py-24 md:py-32 bg-black overflow-hidden">
  <div class="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">

    <div class="mb-12 md:mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-wide mb-2">
        HANA RAMUJKIC
      </h2>

      <h3 class="text-xl md:text-2xl font-light tracking-wider text-white/80">
        Stage and Costume Designer
      </h3>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-start">
      
      <div bind:this={imageEl} class="w-full transition-transform duration-300 ease-out will-change-transform">
        <img
          src="hana-ramujkic.jpeg"
          alt="Hana Ramujkic portrait"
          class="w-full h-auto object-cover"
        />
      </div>

      <div bind:this={textEl} class="w-full xl:pt-4 transition-transform duration-300 ease-out will-change-transform">
        <div class="max-w-2xl text-white/90 space-y-6 text-base md:text-lg xl:text-base font-light leading-relaxed">
          <p>
            Hana Ramujkić is a set and costume designer for opera and theatre based in Austria. Originally from Belgrade, she has a background in opera as well as linguistic and literary studies. She studied stage design at the University of Music and Performing Arts Graz in the class of Prof. Annette Murschetz and has since worked as a set and costume designer on international theatre and opera productions, with engagements including Komische Oper Berlin, Staatstheater Wiesbaden, Oper Wuppertal, and Prinzregententheater München.
          </p>

          <p>
            As a design assistant, she has contributed to productions at institutions such as Burgtheater Wien, Salzburger Festspiele, Dubrovačke letnje igre, Akademiethater Wien, Oper Graz, SNG Maribor as well as in film production.
          </p>

          <p>
            Her collaborators include artists Ingo Kerkhof, Annette Murschetz, Martin Kušej, and Christian Thausing.
          </p>

          <p>
            Her work focuses on reducing theatre to its essential, raw elements through a multidisciplinary approach, drawing on her background in music, literature, and visual arts to seek direct and immediate forms of expression that engage younger audiences. She has a strong interest in classical and quantum physics and mathematics, which she regularly integrates into her design concepts.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>