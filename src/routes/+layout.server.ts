// src/routes/+layout.server.ts
import { getProjects } from '$lib/server/contentful';
import { dev } from '$app/environment';

const CACHE_DURATION = 3600; // 1 hour
let projectCache = {
	timestamp: 0,
	data: null,
	metadata: null
};

// Keep the slugMap for legacy URL handling
const slugMap = {
	"Die Riesen vom Berge": "die-riesen-vom-berge",
	"Kapitän Nemos Bibliothek": "kapitan-nemos-bibliothek",
	"Dippel. Diagnose Cin 3": "dippel-diagnose-cin-3",
	"Reigen": "reigen",
	"Melancholia": "melancholia",
	"Der Kopf der Ariadne!": "der-kopf-der-ariadne",
	"Cinderella": "cinderella"
};

export const load = async () => {
	// Skip cache in development
	if (dev) {
		const projects = await getProjects();
		return {
			projects,
			metadata: generateMetadata(projects),
			slugMap
		};
	}

	const now = Date.now();
	if (projectCache.data && (now - projectCache.timestamp) < CACHE_DURATION * 1000) {
		return {
			projects: projectCache.data,
			metadata: projectCache.metadata,
			slugMap
		};
	}

	const projects = await getProjects();
	const metadata = generateMetadata(projects);

	projectCache = {
		timestamp: now,
		data: projects,
		metadata
	};

	return { projects, metadata, slugMap };
};

// src/routes/+layout.server.ts
function generateMetadata(projects) {
	const baseMetadata = {
		title: "Hana Ramujkic - Set and Costume Designer",
		description: "Set and costume designer with a background in literature, music, and visual arts.",
		image: "https://hanaramujkic.com/hana-ramujkic.jpeg",
		url: "https://hanaramujkic.com"
	};

	return projects.reduce((acc, project) => {
		// Safely handle projectDescription
		let description = baseMetadata.description;
		if (project.projectDescription) {
			if (typeof project.projectDescription === 'string') {
				description = project.projectDescription.substring(0, 155);
			} else if (project.projectDescription.content) {
				// Handle rich text format from Contentful
				description = project.projectDescription.content
					.map(item => item.content?.[0]?.value || '')
					.join(' ')
					.substring(0, 155);
			}
		}

		return {
			...acc,
			[project.slug]: {
				title: `${project.title} | Hana Ramujkic`,
				description,
				image: project.media[0]?.url || baseMetadata.image,
				url: `https://hanaramujkic.com/${project.slug}`
			}
		};
	}, { home: baseMetadata });
}