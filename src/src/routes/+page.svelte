<!-- src/routes/+page.svelte -->
<script lang="ts">
  import Landing from '$lib/pages/landing/Landing.svelte';
  
  export let data;
</script>

<Landing projects={data.projects} />