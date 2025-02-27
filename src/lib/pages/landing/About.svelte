<!-- src/lib/pages/landing/About.svelte -->
<script lang="ts">
	import { onMount } from "svelte";
	let y: number;
	let container: HTMLElement;
	let imageWrapper: HTMLElement;

	onMount(() => {
		const handleParallax = () => {
			if (container && imageWrapper) {
				const rect = container.getBoundingClientRect();
				if (rect.top < window.innerHeight && rect.bottom > 0) {
					const scrolled = window.innerHeight - rect.top;
					imageWrapper.style.transform = `translateY(${scrolled * 0.15}px)`;
				}
			}
		};

		window.addEventListener("scroll", handleParallax);
		return () => window.removeEventListener("scroll", handleParallax);
	});
</script>

<svelte:window bind:scrollY={y} />

<div class="relative overflow-hidden" bind:this={container}>
	<!-- <hr class="border-t border-black dark:border-white w-full mb-16" /> -->

	<div
		class="flex flex-col md:flex-row gap-8 md:gap-16 mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
	>
		<div class="w-full md:w-1/2 relative overflow-hidden">
			<div
				bind:this={imageWrapper}
				class="relative transition-transform duration-300 ease-out"
			>
				<div class="aspect-[3/4] relative">
					<img
						src="hana-ramujkic.jpeg"
						alt="Hana Ramujkic portrait"
						class="object-cover w-full h-full rounded-lg shadow-xl"
					/>
				</div>
			</div>
		</div>

		<div class="w-full md:w-1/2 flex flex-col justify-center">
			<div class="mb-8">
				<h2 class="text-5xl font-extralight tracking-wide mb-2">
					HANA RAMUJKIC
				</h2>
				<h3 class="text-xl font-light tracking-wider text-foreground/80">
					Scenographer & Costume Designer
				</h3>
			</div>

			<div class="space-y-6 text-lg font-light leading-relaxed">
				<p>
					Hana Ramujkić is a set and costume designer from Belgrade with a
					background in classical singing and comparative literature. She
					studied stage design at the University of Music and Performing Arts
					Graz and has since worked on international theater and opera
					productions, including engagements with Neue Oper Wien, Oper
					Wuppertal, Staatstheater Wiesbaden, and HEMU Lausanne.
				</p>
				<p>
					As a design assistant, she has contributed to productions at
					prestigious institutions such as Burgtheater Wien, Akademietheater,
					Oper Graz, the Salzburg Festival, and in film production. Ramujkić
					collaborates with renowned artists, including Annette Murschetz,
					Martin Kušej, Ingo Kerkhof, Christian Thausing, and Henry Mason.
				</p>
				<p>
					Her work is driven by a passion for deconstructing theater—both
					textually and aesthetically—stripping it down to its essence and
					revealing its unfiltered core to the audience.
				</p>
			</div>
		</div>
	</div>
</div>
