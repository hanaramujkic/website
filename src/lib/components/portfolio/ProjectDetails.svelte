<!-- $lib/components/portfolio/ProjectDetails.svelte -->
<script lang="ts">
	import { ChevronLeft } from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Popover from "$lib/components/ui/popover";
	import ContactForm from "$lib/components/cta/ContactForm.svelte";
	import type { Project } from "$lib/server/contentful";

	export let project: Project;

	interface DetailItem {
		label: string;
		value: string;
	}

	const fieldLabels: Record<string, string> = {
		conductor: "Musical direction",
		director: "Directed by",
		venue: "Theatre",
		concept: "Concept",
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
		});
	}
</script>

<div class="project-details p-4 bg-background/95 backdrop-blur-sm">
  <div class="mb-4">
    <h1 class="text-2xl font-semibold">{project.title}</h1>
    {#if project.writer}
      <p class="text-sm text-foreground/60">{project.writer}</p>
    {/if}
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    {#each projectDetails as detail}
      <div>
        <div class="text-xs text-foreground/50">{detail.label}</div>
        <div class="text-sm font-medium">{detail.value}</div>
      </div>
    {/each}
  </div>

  <div class="flex gap-2">
    <a href="/#work" class="group inline-flex items-center">
      <Button variant="outline" size="sm" class="gap-1">
        <ChevronLeft class="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        <span>Back</span>
      </Button>
    </a>
    
    <Popover.Root>
      <Popover.Trigger asChild let:builder>
        <Button builders={[builder]} variant="secondary" size="sm">
          Contact
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <ContactForm textSize="text-sm" />
      </Popover.Content>
    </Popover.Root>
  </div>
</div>