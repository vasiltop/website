/** Used when a pin omits `owner`. */
export const defaultOwner = 'vasiltop';

/** Branch for raw.githubusercontent.com (README + images/). */
export const defaultBranch = 'main';

/**
 * @typedef {Object} PinnedRepo
 * @property {string} repo — GitHub repository name (required)
 * @property {string} [owner] — defaults to defaultOwner
 * @property {string} [branch] — defaults to defaultBranch
 * @property {string} [title] — label on the projects list (defaults to repo)
 * @property {string} [slug] — URL hash segment `#/projects/<slug>` (defaults to repo)
 */
export const pinnedRepos = [
	{ repo: 'straif', title: 'online multiplayer video game' },
	{ repo: 'jolt', title: 'compiler' },
	{ repo: 'editor', title: 'text editor' },
	{ repo: 'voxel', title: 'voxel engine' },
	{ repo: 'chip-8', title: 'chip-8 emulator' },
	{ repo: 'miye', title: 'renderer' },
	{ repo: 'raywolf', title: 'raycaster' },
];

export function slugForPin(pin) {
	return pin.slug || pin.repo;
}