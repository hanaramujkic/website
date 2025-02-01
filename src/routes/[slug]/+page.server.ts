// routes/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { projects, metadata } = await parent();

	// Use the same slug logic as ProjectCard
	const project = projects.find(p => {
		const slugMap = {
			"Die Riesen vom Berge": "die-riesen-vom-berge",
			"Kapitän Nemos Bibliothek": "kapitan-nemos-bibliothek",
			"Dippel. Diagnose Cin 3": "dippel-diagnose-cin-3",
			"Reigen": "reigen",
			"Melancholia": "melancholia",
			"Der Kopf der Ariadne!": "der-kopf-der-ariadne",
			"Cinderella": "cinderella"
		};

		const projectSlug = slugMap[p.title] || p.title.toLowerCase().replace(/ /g, '-');
		return projectSlug === params.slug;
	});

	if (!project) {
		throw error(404, {
			message: 'Project not found'
		});
	}

	return {
		project,
		metadata: metadata[params.slug]
	};
};