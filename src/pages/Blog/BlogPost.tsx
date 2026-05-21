import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkBreaks from 'remark-breaks'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'
import { parseFrontmatter } from '../../utils/parseFrontmatter'
import type { PostMeta } from '../../utils/parseFrontmatter'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [meta, setMeta] = useState<PostMeta | null>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)

    fetch(`/posts/${slug}.md`)
      .then(r => {
        if (!r.ok) throw new Error('not found')
        return r.text()
      })
      .then(raw => {
        const { data, content: body } = parseFrontmatter(raw)
        setMeta(data)
        setContent(body)
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) return <div className="loading">Loading…</div>

  if (notFound) {
    return (
      <main className="blog-post-page">
        <Link to="/blog" className="blog-post-back">← Article List</Link>
        <p style={{ color: 'var(--text-muted)' }}>This article cannot be found.</p>
      </main>
    )
  }

  return (
    <motion.main
      className="blog-post-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/blog" className="blog-post-back">← Article List</Link>

      <header className="blog-post-header">
        {meta?.category && (
          <span className="blog-post-category-tag">{meta.category}</span>
        )}
        <h1 className="blog-post-title">{meta?.title}</h1>
        {meta?.date && (
          <p className="blog-post-date-line">{meta.date.slice(0, 10)}</p>
        )}
      </header>

      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
          rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.main>
  )
}
