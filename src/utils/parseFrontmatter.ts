export interface PostMeta {
  title: string
  date: string
  category: string
}

export interface ParsedPost {
  data: PostMeta
  content: string
}

export function parseFrontmatter(raw: string): ParsedPost {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { data: { title: 'Untitled', date: '', category: 'General' }, content: raw }
  }

  const yaml = match[1]
  const content = match[2]
  const kv: Record<string, string> = {}

  yaml.split('\n').forEach(line => {
    const i = line.indexOf(':')
    if (i > 0) {
      const key = line.slice(0, i).trim()
      const val = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
      kv[key] = val
    }
  })

  return {
    data: {
      title: kv.title || 'Untitled',
      date: kv.date || '',
      category: kv.category || 'General',
    },
    content,
  }
}
