// src/routes/sitemap.xml/+server.ts
import { getProjects } from '$lib/server/contentful';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET = (async () => {
	const projects = await getProjects();
	const baseUrl = 'https://hanaramujkic.com';
	const today = new Date().toISOString().split('T')[0];

	const slugMap = {
		"Die Riesen vom Berge": "die-riesen-vom-berge",
		"Kapitän Nemos Bibliothek": "kapitan-nemos-bibliothek",
		"Dippel. Diagnose Cin 3": "dippel-diagnose-cin-3",
		"Reigen": "reigen",
		"Melancholia": "melancholia",
		"Der Kopf der Ariadne!": "der-kopf-der-ariadne",
		"Cinderella": "cinderella"
	};

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url>
        <loc>${baseUrl}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
        <image:image>
            <image:loc>${baseUrl}/hana-ramujkic.jpeg</image:loc>
        </image:image>
    </url>
    ${projects.map(project => {
		const slug = slugMap[project.title] || project.title.toLowerCase().replace(/ /g, '-');
		return `
    <url>
        <loc>${baseUrl}/${slug}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        ${project.media.slice(0, 5).map(media => `
        <image:image>
            <image:loc>${media.url}</image:loc>
        </image:image>`).join('')}
    </url>`
	}).join('')}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml;charset=UTF-8',
			'Cache-Control': 'public, max-age=0, must-revalidate',
			'X-Content-Type-Options': 'nosniff'
		},
	});
}) satisfies RequestHandler;