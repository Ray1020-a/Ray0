import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface PostEntry {
  slug: string
  title: string
  date: string
  category: string
}

export default function BlogList() {
  const [posts, setPosts] = useState<PostEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/posts/index.json')
      .then(r => r.json())
      .then((data: PostEntry[]) => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="blog-list-page">
      <motion.div
        className="blog-list-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="blog-list-title">LaiRay Blog</h1>
        <p className="blog-list-subtitle">各種亂記，喔或是有用的筆記？</p>
      </motion.div>

      {loading && <div className="loading">Loading…</div>}

      {!loading && posts.length === 0 && (
        <div className="blog-empty">There are no articles yet. After adding the .md file, run `npm run gen-posts`.</div>
      )}

      {!loading && posts.length > 0 && (
        <div className="blog-posts">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              <Link to={`/blog/${post.slug}`} className="blog-post-item">
                <div className="blog-post-meta">
                  <span className="blog-post-date">
                    {post.date ? post.date.slice(0, 10) : '—'}
                  </span>
                  <span className="blog-post-category">{post.category}</span>
                </div>
                <span className="blog-post-item-title">{post.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  )
}
