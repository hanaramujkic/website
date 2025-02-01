<!-- $lib/components/portfolio/ProjectDetails.svelte -->

<script lang="ts">
	import { slide } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";
	import { ChevronDown } from "lucide-svelte";
	import type { Project } from "$lib/server/contentful";

	export let project: Project;
	let isOpen = false;

	const fieldLabels = {
		conductor: "Musical direction",
		director: "Directed by",
		venue: "Theatre",
	};

	$: projectDetails = Object.entries(fieldLabels).reduce(
		(acc, [field, label]) => {
			if (project[field]) {
				acc.push({ label, value: project[field] });
			}
			return acc;
		},
		[],
	);

	$: {
		if (
			project.setDesigner &&
			project.costumeDesigner &&
			project.setDesigner === project.costumeDesigner
		) {
			projectDetails.push({
				label: "Set and costume design",
				value: project.setDesigner,
			});
		} else {
			if (project.setDesigner) {
				projectDetails.push({
					label: "Set design",
					value: project.setDesigner,
				});
			}
			if (project.costumeDesigner) {
				projectDetails.push({
					label: "Costume design",
					value: project.costumeDesigner,
				});
			}
		}
	}

	$: if (project.photographer) {
		projectDetails.push({
			label: "Photos",
			value: project.photographer,
			class: "opacity-60",
		});
	}
</script>

<!-- Mobile Details -->
<div class="md:hidden w-full mt-20">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="w-full p-3 flex items-center justify-between bg-background border-b"
	>
		
		<div class="text-left">
			<h1 class="text-xl font-semibold">{project.title}</h1>
			<!-- <span class="text-lg font-semibold">Project Details</span> -->
			{#if project.writer}
			<p class="text-sm text-foreground/60">{project.writer}</p>
			{/if}
		</div>

		<ChevronDown
			class="w-4 h-4 transform transition-transform duration-300 {isOpen
				? 'rotate-180'
				: ''}"
		/>
	</button>

	{#if isOpen}
		<div
			transition:slide={{ duration: 300, easing: cubicInOut }}
			class="border-b"
		>
			<div class="p-4 space-y-4">
				<!-- <div class="space-y-2">
					<h1 class="text-2xl font-bold">{project.title}</h1>
					{#if project.writer}
						<p class="text-sm text-foreground/60">{project.writer}</p>
					{/if}
				</div> -->

				<div class="space-y-3">
					{#each projectDetails as detail}
						<div>
							<span class="text-sm font-light">{detail.label}</span>
							<p class="text-base font-medium {detail.class || ''}">
								{detail.value}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- Desktop Details -->
<div class="hidden md:block w-1/3 h-screen border-r overflow-y-auto">
	<div class="sticky top-24 space-y-8">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold">{project.title}</h1>
			{#if project.writer}
				<p class="text-base text-foreground/60">{project.writer}</p>
			{/if}
		</div>

		<div class="space-y-4">
			{#each projectDetails as detail}
				<div>
					<span class="text-sm font-light">{detail.label}</span>
					<p class="text-lg font-medium {detail.class || ''}">{detail.value}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
