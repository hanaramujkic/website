<!-- src/routes/+error.svelte -->
<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status === 404 ? 'Page Not Found' : 'Error'} | Hana Ramujkic</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="flex min-h-screen flex-col items-center justify-center p-4">
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">
      {$page.status === 404 ? 'Page Not Found' : 'Something went wrong'}
    </h1>
    <p class="text-lg mb-8">{$page.error?.message || 'Please try again or return home.'}</p>
    <a
      href="/"
      class="inline-block px-6 py-3 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
    >
      Return Home
    </a>
  </div>
</main>