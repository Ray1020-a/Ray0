/**
 * Scans public/posts/*.md and regenerates public/posts/index.json
 * Run: npm run gen-posts
 * Also runs automatically before npm run build
 */
import { readdir, readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = join(__dirname, '..', 'public', 'posts')

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const data = {}
  match[1].split('\n').forEach(line => {
    const i = line.indexOf(':')
    if (i > 0) {
      data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    }
  })
  return data
}

async function main() {
  const files = await readdir(POSTS_DIR)
  const mdFiles = files.filter(f => f.endsWith('.md'))

  const posts = await Promise.all(
    mdFiles.map(async filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = await readFile(join(POSTS_DIR, filename), 'utf-8')
      const fm = parseFrontmatter(raw)
      return {
        slug,
        filename,
        title: fm.title || slug,
        date: fm.date || '',
        category: fm.category || 'General',
      }
    })
  )

  // Newest first
  posts.sort((a, b) => b.date.localeCompare(a.date))

  const outPath = join(POSTS_DIR, 'index.json')
  await writeFile(outPath, JSON.stringify(posts, null, 2) + '\n')
  console.log(`✓ Generated index.json with ${posts.length} post(s)`)
}

main().catch(err => {
  console.error('generate-post-index failed:', err)
  process.exit(1)
})
