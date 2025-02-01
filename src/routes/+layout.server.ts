// src/routes/+layout.server.ts
import { getProjects } from '$lib/server/contentful';
import { dev } from '$app/environment';

const CACHE_DURATION = 3600; // 1 hour
let projectCache = {
	timestamp: 0,
	data: null as any,
	metadata: null as any
};

function generateMetadata(projects) {
	const baseMetadata = {
		title: "Hana Ramujkic - Set and Costume Designer",
		description: "Set and costume designer with a background in literature, music, and visual arts.",
		image: "https://hanaramujkic.com/hana-ramujkic.jpeg",
		url: "https://hanaramujkic.com"
	};

	const metadata = { home: baseMetadata };

	const slugMap = {
		"Die Riesen vom Berge": "die-riesen-vom-berge",
		"Kapitän Nemos Bibliothek": "kapitan-nemos-bibliothek",
		"Dippel. Diagnose Cin 3": "dippel-diagnose-cin-3",
		"Reigen": "reigen",
		"Melancholia": "melancholia",
		"Der Kopf der Ariadne!": "der-kopf-der-ariadne",
		"Cinderella": "cinderella"
	};

	for (const project of projects) {
		const slug = slugMap[project.title] || project.title.toLowerCase().replace(/ /g, '-');

		let description = '';
		if (project.projectDescription) {
			if (typeof project.projectDescription === 'string') {
				description = project.projectDescription;
			} else if (project.projectDescription.content) {
				description = project.projectDescription.content
					.map(item => item.content?.[0]?.value || '')
					.join(' ');
			}
		}

		if (!description) {
			description = `${project.title}${project.venue ? ` at ${project.venue}` : ''} - Set and costume design by Hana Ramujkic`;
		}

		metadata[slug] = {
			title: `${project.title} | Hana Ramujkic`,
			description: description.substring(0, 155).trim() + '...',
			image: project.media[0]?.url || baseMetadata.image,
			url: `https://hanaramujkic.com/${slug}`,
			type: 'article',
			tags: project.tags || []
		};
	}

	return metadata;
}

export const load = async () => {
	const now = Date.now();

	if (!dev && projectCache.data && (now - projectCache.timestamp) < CACHE_DURATION * 1000) {
		return {
			projects: projectCache.data,
			metadata: projectCache.metadata
		};
	}

	const projects = await getProjects();
	const metadata = generateMetadata(projects);

	if (!dev) {
		projectCache = {
			timestamp: now,
			data: projects,
			metadata
		};
	}

	return { projects, metadata };
};