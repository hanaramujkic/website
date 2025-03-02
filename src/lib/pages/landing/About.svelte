<!-- src/lib/pages/landing/About.svelte -->
<script lang="ts">
	import { onMount } from "svelte";

	let y: number;
	let container: HTMLElement;
	let imageWrapper: HTMLElement;
	let textContainer: HTMLElement;

	onMount(() => {
		const handleScroll = () => {
			if (container && imageWrapper && textContainer) {
				const rect = container.getBoundingClientRect();
				const scrollProgress = window.innerHeight - rect.top;

				// Parallax effect for image
				if (rect.top < window.innerHeight && rect.bottom > 0) {
					// Start with image slightly below
					const imageTranslateY = Math.max(0, scrollProgress * 0.12);
					imageWrapper.style.transform = `translateY(${imageTranslateY}px)`;
				}

				// Text container parallax (slower than image)
				if (rect.top < window.innerHeight && rect.bottom > 0) {
					const textTranslateY = Math.max(0, scrollProgress * 0.05);
					textContainer.style.transform = `translateY(${textTranslateY}px)`;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<svelte:window bind:scrollY={y} />

<div class="relative py-24 md:pt-32 overflow-hidden" bind:this={container}>
	<div
		class="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
	>
		<!-- Name and Title - Start higher up -->
		<div
			bind:this={textContainer}
			class="relative z-10 transition-transform duration-300 ease-out"
		>
			<h2
				class="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-wide mb-2"
			>
				HANA RAMUJKIC
			</h2>
			<h3
				class="text-xl md:text-2xl font-light tracking-wider text-white/80"
			>
				Scenographer & Costume Designer
			</h3>
		</div>

		<!-- Main content area with overlapping effects -->
		<div class="relative">
			<!-- Image positioned to be intersected by text -->
			<div
				class="absolute top-0 left-0 w-full md:w-2/3 lg:w-3/5 pointer-events-none"
			>
				<div
					bind:this={imageWrapper}
					class="relative transition-transform duration-300 ease-out"
				>
					<div class=" relative">
						<img
							src="hana-ramujkic.jpeg"
							alt="Hana Ramujkic portrait"
							class="object-cover w-full h-full shadow-xl"
						/>
					</div>
				</div>
			</div>

			<!-- Text container that will overlap with image -->
			<div class="relative pt-[60vh] sm:pt-[85vh] md:pt-[65vh] lg:pt-[75vh]">
				<div class="ml-auto w-full md:w-2/3 lg:w-3/5 p-8 md:p-12">

					<div class="max-w-sm text-white space-y-6 text-base md:text-md font-light leading-relaxed">
						<p>
							Hana Ramujkić is a set and costume designer from Belgrade with a
							background in classical singing and comparative literature. She
							studied stage design at the University of Music and Performing
							Arts Graz and has since worked on international theater and opera
							productions, including engagements with Neue Oper Wien, Oper
							Wuppertal, Staatstheater Wiesbaden, and HEMU Lausanne.
						</p>
						<p>
							As a design assistant, she has contributed to productions at
							prestigious institutions such as Burgtheater Wien,
							Akademietheater, Oper Graz, the Salzburg Festival, and in film
							production. Ramujkić collaborates with renowned artists, including
							Annette Murschetz, Martin Kušej, Ingo Kerkhof, Christian Thausing,
							and Henry Mason.
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
	</div>
</div>


