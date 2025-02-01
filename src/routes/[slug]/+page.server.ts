// routes/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	try {
		const { projects, slugMap, metadata } = await parent();

		// First try direct slug match
		let project = projects.find(p => p.slug === params.slug);

		// If not found, try slugMap
		if (!project) {
			project = projects.find(p => slugMap[p.title] === params.slug);
		}

		if (!project) {
			return {
				status: 404,
				error: 'Project not found'
			};
		}

		return {
			project,
			metadata: metadata[project.slug]
		};
	} catch (error) {
		console.error('Error loading project:', error);
		return {
			status: 500,
			error: 'Failed to load project. Please try again later.'
		};
	}
};