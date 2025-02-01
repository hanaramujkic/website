// src/routes/sitemap.xml/+server.ts
import { getProjects } from '$lib/server/contentful';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const projects = await getProjects();  // Remove destructuring since getProjects returns array directly
	const today = new Date().toISOString().split('T')[0];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      <url>
        <loc>https://hanaramujkic.com</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      ${projects.map(project => `
        <url>
          <loc>https://hanaramujkic.com/${project.slug}</loc>
          <lastmod>${today}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
          ${project.media.map(media => `
            <image:image>
              <image:loc>${media.url}</image:loc>
              <image:title>${project.title}</image:title>
            </image:image>`
	).join('')}
        </url>
      `).join('')}
    </urlset>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};