<!-- routes/+page.svelte -->
s<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import Landing from '$lib/pages/landing/Landing.svelte';
  import type { Project } from '$lib/server/contentful';

  let projects: Project[] = [];
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      projects = data.projects;
    } catch (err) {
      console.error('Error fetching projects:', err);
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  });
</script>

<Landing {projects} {isLoading} {error} />