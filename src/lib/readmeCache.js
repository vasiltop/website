import { reactive } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import {
	pinnedRepos,
	defaultOwner,
	defaultBranch,
	slugForPin,
} from '@/config/pinnedRepos.js';

marked.setOptions({ gfm: true });

const rawRoot = (owner, repo, branch) =>
	`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;

function resolveRelativeToRepo(href, owner, repo, branch) {
	const trimmed = href.trim();
	if (/^[a-z]+:/i.test(trimmed) || trimmed.startsWith('//')) return trimmed;
	const root = rawRoot(owner, repo, branch);
	const pathPart = trimmed.replace(/^\.\//, '').replace(/^\//, '');
	return new URL(pathPart, root).href;
}

function rewriteMarkdownImages(markdown, owner, repo, branch) {
	return markdown.replace(
		/!\[([^\]]*)\]\(([^)\s]+)(\s+["'][^"']*["'])?\)/g,
		(match, alt, path) => {
			const resolved = resolveRelativeToRepo(path, owner, repo, branch);
			if (resolved === path.trim()) return match;
			return `![${alt}](${resolved})`;
		},
	);
}

function rewriteHtmlImgSrc(html, owner, repo, branch) {
	const root = rawRoot(owner, repo, branch);
	return html.replace(
		/<img(\s+[^>]*?)src=(["'])([^"']+)\2/gi,
		(match, before, quote, src) => {
			const trimmed = src.trim();
			if (/^[a-z]+:/i.test(trimmed) || trimmed.startsWith('//')) return match;
			const pathPart = trimmed.replace(/^\.\//, '').replace(/^\//, '');
			const url = new URL(pathPart, root).href;
			return `<img${before}src=${quote}${url}${quote}`;
		},
	);
}

function renderReadmeMarkdown(markdown, owner, repo, branch) {
	const withMdImages = rewriteMarkdownImages(markdown, owner, repo, branch);
	let html = marked.parse(withMdImages);
	html = rewriteHtmlImgSrc(html, owner, repo, branch);
	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: [
			'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
			'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'em', 'strong',
			'del', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'span', 'div',
		],
		ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'colspan', 'rowspan'],
		ALLOW_DATA_ATTR: false,
	});
}

async function fetchReadmeText(owner, repo, branch) {
	const candidates = ['README.md', 'Readme.md', 'readme.md'];
	for (const name of candidates) {
		const url = `${rawRoot(owner, repo, branch)}${name}`;
		const res = await fetch(url);
		if (res.ok) return res.text();
	}
	throw new Error(`No README found for ${owner}/${repo} (${branch})`);
}

export const readmeCache = reactive({
	status: 'idle',
	entries: {},
	error: null,
});

let loadPromise = null;

export function ensureReadmesLoaded() {
	if (readmeCache.status === 'ready') return Promise.resolve();
	if (loadPromise) return loadPromise;

	loadPromise = (async () => {
		readmeCache.status = 'loading';
		readmeCache.error = null;
		try {
			await Promise.all(
				pinnedRepos.map(async (pin) => {
					const owner = pin.owner || defaultOwner;
					const repo = pin.repo;
					const branch = pin.branch || defaultBranch;
					const slug = slugForPin(pin);
					const markdown = await fetchReadmeText(owner, repo, branch);
					const html = renderReadmeMarkdown(markdown, owner, repo, branch);
					readmeCache.entries[slug] = {
						title: pin.title || repo,
						html,
						githubUrl: `https://github.com/${owner}/${repo}`,
					};
				}),
			);
			readmeCache.status = 'ready';
		} catch (e) {
			readmeCache.status = 'error';
			readmeCache.error = e instanceof Error ? e.message : String(e);
		}
	})();

	return loadPromise;
}

export function findPinBySlug(slug) {
	return pinnedRepos.find((p) => slugForPin(p) === slug);
}
