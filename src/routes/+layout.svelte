<!-- src/routes/+layout.svelte -->

<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { ModeWatcher } from "mode-watcher";
  
  // Default metadata that can be overridden by child pages
  export let title = "Hana Ramujkic - Set and Costume Designer";
  export let description = "Set and costume designer with a background in literature, music, and visual arts. Making theater magically accessible to younger audiences.";
  export let image = "https://hanaramujkic.com/hana-ramujkic.jpeg"; 
  export let url = "https://hanaramujkic.com";
</script>

<svelte:head>
  <!-- Essential Meta Tags -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href={url} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <!-- Additional SEO Meta Tags -->
  <meta name="robots" content="index, follow" />
  <meta name="keywords" content="set designer, costume designer, theater design, scenography, stage design, theatrical design, performance art, theater production, stage art, theatrical costume" />
  <meta name="author" content="Hana Ramujkic" />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hana Ramujkic",
    "jobTitle": "Set and Costume Designer",
    "description": "${description}",
    "url": "${url}",
    "image": "${image}",
    "sameAs": [
      "https://www.linkedin.com/in/hana-ramujkic", // Add if exists
      "https://www.instagram.com/hana.ramujkic"    // Add if exists
    ],
    "workLocation": {
      "@type": "City",
      "name": "Vienna"  // Update with correct city
    },
    "knowsAbout": [
      "Set Design",
      "Costume Design",
      "Theater Production",
      "Scenography",
      "Stage Design"
    ]
  }
  </script>
</svelte:head>

<ModeWatcher />

<Navbar />
<slot></slot>
<Footer />