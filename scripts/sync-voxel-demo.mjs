/**
 * Copies Trunk output from ../voxel/dist into this site:
 *   public/voxel/        — index.html, *.js, *_bg.wasm
 *   public/textures/     — block textures (WASM fetches /textures/...)
 *
 * Run from website root: pnpm run sync-voxel
 * Requires: trunk build --release (or trunk build) in the voxel repo first.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const voxelDist = join(root, '..', 'voxel', 'dist')
const outVoxel = join(root, 'public', 'voxel')
const outTextures = join(root, 'public', 'textures')

function die(msg) {
	console.error(msg)
	process.exit(1)
}

if (!existsSync(voxelDist)) {
	console.warn(
		`Skipping voxel sync (not found: ${voxelDist}). Using committed public/voxel. To refresh: cd ../voxel && trunk build --release && pnpm run sync-voxel`,
	)
	process.exit(0)
}

const names = readdirSync(voxelDist)
const js = names.find((f) => /^voxel-[a-f0-9]+\.js$/.test(f))
if (!js) die(`No voxel-*.js in ${voxelDist}`)
const base = js.replace(/\.js$/, '')
const wasm = `${base}_bg.wasm`
if (!names.includes(wasm)) die(`Missing ${wasm} in ${voxelDist}`)

rmSync(outVoxel, { recursive: true, force: true })
mkdirSync(outVoxel, { recursive: true })
cpSync(join(voxelDist, js), join(outVoxel, js))
cpSync(join(voxelDist, wasm), join(outVoxel, wasm))

rmSync(outTextures, { recursive: true, force: true })
cpSync(join(voxelDist, 'textures'), outTextures, { recursive: true })

const prefix = '/voxel'
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>voxel</title>
  <style>
    html, body { margin: 0; height: 100%; background: #1a1a1a; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
  <link rel="modulepreload" href="${prefix}/${js}" crossorigin="anonymous">
  <link rel="preload" href="${prefix}/${wasm}" crossorigin="anonymous" as="fetch" type="application/wasm">
</head>
<body>
<script type="module">
import init, * as bindings from '${prefix}/${js}';
const wasm = await init({ module_or_path: '${prefix}/${wasm}' });
window.wasmBindings = bindings;
</script>
</body>
</html>
`

writeFileSync(join(outVoxel, 'index.html'), indexHtml, 'utf8')

console.log(`Synced voxel demo: ${js}, ${wasm} → public/voxel/; textures → public/textures/`)
