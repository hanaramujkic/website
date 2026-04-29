<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { ModeWatcher } from "mode-watcher";

  export let data;

  $: currentSlug = $page.url.pathname.slice(1) || "home";
  $: seoData = data.metadata[currentSlug] || data.metadata.home;
</script>

<svelte:head>
  <!-- Primary SEO -->
  <title>{seoData.title}</title>
  <meta name="description" content={seoData.description} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href={seoData.url} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={seoData.url} />
  <meta property="og:title" content={seoData.title} />
  <meta property="og:description" content={seoData.description} />
  <meta property="og:image" content={seoData.image} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={seoData.url} />
  <meta name="twitter:title" content={seoData.title} />
  <meta name="twitter:description" content={seoData.description} />
  <meta name="twitter:image" content={seoData.image} />

  <!-- SEO Extras -->
  <meta name="robots" content="index, follow" />
  <meta
    name="keywords"
    content="Hana Ramujkic, stage designer, costume designer, opera designer, theatre designer, scenography, set design Austria, costume design Vienna, opera stage design"
  />
  <meta name="author" content="Hana Ramujkic" />

  <!-- Structured Data -->
  {@html `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Hana Ramujkic",
      "jobTitle": "Stage and Costume Designer",
      "description": "${seoData.description}",
      "url": "${seoData.url}",
      "image": "${seoData.image}",
      "sameAs": [
        "https://www.instagram.com/hana.ramujkic"
      ],
      "workLocation": {
        "@type": "Place",
        "name": "Austria"
      },
      "knowsAbout": [
        "Stage Design",
        "Costume Design",
        "Opera Design",
        "Theatre Design",
        "Scenography",
        "Set Design"
      ]
    }
    </script>
  `}
</svelte:head>

<ModeWatcher />

<Navbar />
<slot />
<Footer />