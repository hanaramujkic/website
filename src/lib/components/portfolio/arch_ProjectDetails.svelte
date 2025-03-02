<!-- $lib/components/portfolio/ProjectDetails.svelte -->
<script lang="ts">
	import { slide } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";
	import { ChevronDown, ChevronLeft } from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Popover from "$lib/components/ui/popover";
	import ContactForm from "$lib/components/cta/ContactForm.svelte";
	import type { Project } from "$lib/server/contentful";

	export let project: Project;
	export let isScrolled = false;
	let isOpen = true;

	// Allow reopening after scroll, but close on new scroll
	$: if (isScrolled && isOpen) {
		isOpen = false;
	}

	interface DetailItem {
		label: string;
		value: string;
		class?: string;
	}

	const fieldLabels: Record<string, string> = {
		conductor: "Musical direction",
		director: "Directed by",
		venue: "Theatre",
	};

	$: projectDetails = Object.entries(fieldLabels).reduce<DetailItem[]>(
		(acc, [field, label]) => {
			if (project[field as keyof Project]) {
				acc.push({
					label,
					value: project[field as keyof Project] as string,
				});
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
		class="w-full pl-3 py-3 flex gap-4 items-center justify-between bg-background border-b"
	>
		<div class="flex-1 min-w-0 text-left">
			<h1 class="text-xl font-semibold truncate">{project.title}</h1>
			{#if project.writer}
				<p class="text-sm text-foreground/60 truncate">{project.writer}</p>
			{/if}
		</div>

		<ChevronDown
			class="w-4 h-4 transform transition-transform duration-300 mr-3 flex-shrink-0 {isOpen
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
				<div class="space-y-3">
					{#each projectDetails as detail}
						<div class="flex gap-4">
							<span
								class="w-1/3 text-sm text-foreground/50 break-words leading-tight"
								>{detail.label}</span
							>
							<p class="flex-1 text-base font-medium {detail.class || ''}">
								{detail.value}
							</p>
						</div>
					{/each}
				</div>

				<div class="py-4 flex gap-4">
					<Popover.Root>
						<Popover.Trigger asChild let:builder>
							<Button builders={[builder]} variant="secondary" class="w-full">
								Contact
							</Button>
						</Popover.Trigger>

						<!-- Back Button -->
						<a href="/#work" class="group inline-flex items-center">
							<Button
								variant="ghost"
								class="p-4 space-x-1 transition-colors bg-foreground/5 hover:bg-foreground/20"
							>
								<ChevronLeft
									class="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
								/>
								<!-- <span class="text-sm font-medium">Work</span> -->
							</Button>
						</a>
						<Popover.Content>
							<ContactForm textSize="text-sm" />
						</Popover.Content>
					</Popover.Root>
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- Desktop Details -->

<div class="hidden md:block w-1/3 h-full border-r overflow-y-auto">
	<div class="flex flex-col justify-end min-h-screen pt-20 pb-4">
		<div class="space-y-8 py-8 pr-8">
			<div class="space-y-2">
				<h1 class="text-3xl font-bold">{project.title}</h1>
				{#if project.writer}
					<p class="text-base text-foreground/60">{project.writer}</p>
				{/if}
			</div>

			<div class="space-y-4">
				{#each projectDetails as detail}
					<div>
						<span class="text-sm text-foreground/50">{detail.label}</span>
						<p class="text-lg font-medium {detail.class || ''}">
							{detail.value}
						</p>
					</div>
				{/each}
			</div>

			<div class="pt-4 flex gap-4">
				<Popover.Root>
					<Popover.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="secondary"
							class="sm:w-3/4 lg:w-2/3 "
						>
							Contact
						</Button>
					</Popover.Trigger>

					<!-- Back Button -->
					<a href="/#work" class="group inline-flex items-center">
						<Button
							variant="ghost"
							class="p-4 space-x-1 transition-colors bg-foreground/5 hover:bg-foreground/20"
						>
							<ChevronLeft
								class="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
							/>
							<!-- <span class="text-sm font-medium">Work</span> -->
						</Button>
					</a>
					<Popover.Content>
						<ContactForm textSize="text-sm" />
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>
	</div>
</div>
