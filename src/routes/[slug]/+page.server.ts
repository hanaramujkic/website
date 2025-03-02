// routes/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

// Helper function to generate slug from title
function getSlugFromTitle(title: string): string {
  const slugMap: Record<string, string> = {
    "Die Riesen vom Berge": "die-riesen-vom-berge",
    "Kapitän Nemos Bibliothek": "kapitan-nemos-bibliothek",
    "Dippel. Diagnose Cin 3": "dippel-diagnose-cin-3",
    "Reigen": "reigen",
    "Melancholia": "melancholia",
    "Der Kopf der Ariadne!": "der-kopf-der-ariadne",
    "Cinderella": "cinderella",
    "Der zerbrochene Krug": "der-zerbrochene-krug"
  };
  
  return slugMap[title] || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

export const load: PageServerLoad = async ({ parent, params }) => {
  const { projects, metadata } = await parent();

  // Find project by slug
  const project = projects.find(p => getSlugFromTitle(p.title) === params.slug);

  if (!project) {
    throw error(404, {
      message: 'Project not found'
    });
  }

  return {
    project,
    projects, // Pass all projects for navigation
    metadata: metadata[params.slug]
  };
};