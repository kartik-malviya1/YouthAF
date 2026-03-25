import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMedia } from '../utils/storage'
import './home.css'

import helpsinglemom from '../assets/blog-images/helpsinglemom.jpeg'
import jayahelp from '../assets/blog-images/jaya-help.jpeg'
import YAF from '../assets/blog-images/YAF-made.jpeg'
import Footer from '../components/Footer'

const fallbackStories = [
  {
    id: 'fallback-single-mothers',
    title: 'Helping Single Mothers & COVID-Impacted Widows',
    excerpt:
      'Women who once felt trapped by circumstance found the confidence to step into entrepreneurship and rebuild their families with dignity.',
    category: 'Community Story',
    image: helpsinglemom,
    href: 'https://youthaidfoundation.org/causes/helping-single-mothers-and-covid-impacted-widows/',
    date: '2024-05-10',
    content: [
      'Across many communities, single mothers and women widowed during the COVID period were carrying the full burden of survival without reliable income, social backing, or a clear path forward.',
      'YouthAid Foundation stepped in with entrepreneurship training, mentorship, and practical business support so these women could move from crisis response to long-term stability. Instead of being treated only as beneficiaries, they were encouraged to see themselves as business owners capable of making decisions and generating income.',
      'For many participants, the first transformation was internal. Confidence, self-belief, and financial awareness began to grow alongside business planning. Small enterprises then became a way to rebuild dignity at home, support children, and create a stronger sense of independence.',
      'What makes this story powerful is not just the launch of micro-businesses, but the shift in identity. Women who once felt cornered by circumstance began creating livelihoods with agency, resilience, and hope.',
    ],
  },
  {
    id: 'fallback-jaya-crc',
    title: "Jaya Helped 10,000 Villagers Through 'CRC'",
    excerpt:
      'A local entrepreneur transformed personal hardship into a service that reached thousands of people in her community.',
    category: 'Community Story',
    image: jayahelp,
    href: 'https://youthaidfoundation.org/causes/jaya-solved-the-problem-of-hundreds-of-villagers-through-her-new-yaf-supported-business/',
    date: '2024-07-21',
    content: [
      "Jaya's journey began with hardship, but it did not end there. With YouthAid Foundation's support, she identified a community need and built a service model around it through a Common Resource Center approach.",
      'Her work solved real everyday problems for villagers who previously had limited access to essential support and services. As her confidence and systems improved, the business became more than a source of income; it became local infrastructure.',
      'The reach of her effort eventually extended to thousands of villagers, proving that grassroots entrepreneurship can scale when it is rooted in community realities. Her story is a reminder that local women leaders often understand the most urgent problems best.',
      "Jaya's impact reflects the larger vision of the program: when women are backed with skills, mentorship, and capital, they do not only improve their own households, they strengthen the communities around them.",
    ],
  },
  {
    id: 'fallback-digital-way-ahead',
    title: 'YAF made me realize digital is the way ahead',
    excerpt:
      'A founder moved from hyperlocal selling to digital confidence after being exposed to new tools, customers, and ambition at YESummit.',
    category: 'Founder Voice',
    image: YAF,
    href: 'https://youthaidfoundation.org/causes/',
    date: '2024-08-15',
    content: [
      'This additional income earned by implementing YAF teachings gave Deepali Chawan the freedom to live for herself and imagine a future beyond survival.',
      'Digital literacy became the unlock. Before joining YAF, business knowledge felt limited to buying and selling locally with no records, no promotion, and no wider reach. The training introduced practical marketing ideas, basic business systems, and the confidence to engage customers differently.',
      'That shift was not only technical. It also helped remove the inferiority many grassroots entrepreneurs feel when entering unfamiliar economic spaces. Exposure to YESummit created a sense that business growth, visibility, and professionalism were possible.',
      'Her reflection captures the role YAF plays across many journeys: making entrepreneurship feel accessible, teachable, and worth pursuing with pride.',
    ],
  },
]

const formatDate = (value) => {
  const parsed = value ? new Date(value) : null
  if (!parsed || Number.isNaN(parsed.getTime())) {
    return 'Recent story'
  }

  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const getPlainText = (value = '') =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (item) => {
  const summary = item.excerpt || getPlainText(item.content || '')
  if (!summary) {
    return 'Read how YouthAid Foundation is supporting grassroots women entrepreneurs through training, mentorship, and community-led growth.'
  }

  return summary.length > 170 ? `${summary.slice(0, 167)}...` : summary
}

const normalizePost = (item, index = 0) => ({
  id: item.id || item._id || `${item.title}-${index}`,
  title: item.title || 'Untitled story',
  excerpt: getExcerpt(item),
  category: item.category || (item.type === 'news' ? 'News' : 'Blog'),
  image: item.image || helpsinglemom,
  href: item.href || '',
  date: item.date || '',
  content: Array.isArray(item.content)
    ? item.content
    : typeof item.content === 'string'
      ? item.content
      : '<p>More details coming soon.</p>',
  isHtml: typeof item.content === 'string' && !Array.isArray(item.content),
})

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const media = await getMedia()
        const apiBlogs = Array.isArray(media) ? media.filter((item) => item.type === 'blog') : []
        const merged = [...apiBlogs.map(normalizePost)]

        fallbackStories.forEach((story, index) => {
          const normalized = normalizePost(story, index)
          const exists = merged.some(
            (post) => post.title.trim().toLowerCase() === normalized.title.trim().toLowerCase()
          )

          if (!exists) {
            merged.push(normalized)
          }
        })

        const sorted = merged.sort((a, b) => {
          const first = new Date(a.date).getTime() || 0
          const second = new Date(b.date).getTime() || 0
          return second - first
        })

        setPosts(sorted)
        setError(sorted.length === 0 ? 'No blog stories are available yet.' : '')
      } catch (err) {
        console.error('Error loading blogs:', err)
        setPosts(fallbackStories.map(normalizePost))
        setError('Live blog data could not be loaded, so showing the featured foundation stories instead.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const allPosts = useMemo(() => posts, [posts])

  return (
    <div className="yaf-page blog-page bg-gradient-soft min-h-screen">
      <section
        className="relative overflow-hidden"
        style={{
          background:
          'linear-gradient(135deg, rgba(253, 248, 244, 0.96) 0%, rgba(250, 244, 238, 0.98) 48%, rgba(255, 255, 255, 1) 100%)',
        }}
      >
        <div className="container" style={{ paddingTop: '124px', paddingBottom: '72px' }}>
          <div className="glass-panel blog-hero-shell">
            <div style={{ position: 'absolute', inset: 'auto -80px -120px auto', width: '260px', height: '260px', borderRadius: '999px', background: 'rgba(230, 51, 41, 0.08)' }} />
            <div style={{ position: 'absolute', inset: '-70px auto auto -70px', width: '190px', height: '190px', borderRadius: '999px', background: 'rgba(212, 150, 58, 0.12)' }} />

            <div className="blog-hero-content" style={{ position: 'relative', zIndex: 1 }}>
              <span className="section-label">Stories & Updates</span>
              <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.8rem)', marginBottom: '18px' }}>
                Stories of <em>change</em>,
                <br />
                hope, and resilience
              </h1>
              <p style={{ maxWidth: '640px', color: 'var(--grey)', fontSize: '1.04rem' }}>
                Read voices from the community, journeys of women entrepreneurs, and stories that reflect the impact of YouthAid Foundation's work on the ground.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
                <a href="#all-blogs" className="btn-red" style={{ padding: '14px 28px' }}>
                  Read Stories
                </a>
                <Link to="/" className="btn-white" style={{ padding: '14px 28px', border: '1px solid var(--border)', color: 'var(--charcoal)' }}>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stories-section" style={{ paddingTop: '0' }}>
        <div className="container">
          {loading ? (
            <LoadingState />
          ) : (
            <>
              {error ? (
                <div className="blog-message-box">
                  {error}
                </div>
              ) : null}

              <div id="all-blogs" className="stories-header reveal visible" style={{ marginTop: '52px' }}>
                <div>
                  <span className="section-label">All Blogs</span>
                  <h2 className="section-title">
                    Explore all <em>stories</em>
                  </h2>
                </div>
                <div style={{ color: 'var(--grey-light)', fontWeight: 600 }}>
                  {posts.length} {posts.length === 1 ? 'story' : 'stories'}
                </div>
              </div>

              <div className="stories-grid blog-stories-grid">
                {allPosts.map((post, index) => (
                  <article
                  key={post.id}
                  className={`story-card blog-story-card reveal visible reveal-delay-${Math.min(index, 2)}`}
                  onClick={() => setSelectedPost(post)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setSelectedPost(post)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Read full blog: ${post.title}`}
                  >
                    <div className="story-img short" style={{ height: '260px' }}>
                      <img src={post.image} alt={post.title} />
                      <div className="story-img-overlay">
                        <span className="story-cat">{post.category}</span>
                      </div>
                    </div>
                    <div className="story-body">
                      <div style={{ color: 'var(--grey-light)', fontSize: '0.84rem', marginBottom: '10px', fontWeight: 600 }}>
                        {formatDate(post.date)}
                      </div>
                      <div className="story-title">{post.title}</div>
                      <p className="story-excerpt">{post.excerpt}</p>
                      <button
                        type="button"
                        className="story-read"
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelectedPost(post)
                        }}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                        >
                        Read story →
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div id="all-blogs" className="stories-header reveal visible" style={{ marginTop: '52px' }}>
                <div>
                  <span className="section-label">All Blogs</span>
                  <h2 className="section-title">
                    Get Latest <em>Updates</em>
                  </h2>
                </div>
                <div style={{ color: 'var(--grey-light)', fontWeight: 600 }}>
                  {posts.length} {posts.length === 1 ? 'story' : 'stories'}
                </div>
              </div>

              <div className="stories-grid blog-stories-grid">
                {allPosts.map((post, index) => (
                  <article
                  key={post.id}
                  className={`story-card blog-story-card reveal visible reveal-delay-${Math.min(index, 2)}`}
                  onClick={() => setSelectedPost(post)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setSelectedPost(post)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Read full blog: ${post.title}`}
                  >
                    <div className="story-img short" style={{ height: '260px' }}>
                      <img src={post.image} alt={post.title} />
                      <div className="story-img-overlay">
                        <span className="story-cat">{post.category}</span>
                      </div>
                    </div>
                    <div className="story-body">
                      <div style={{ color: 'var(--grey-light)', fontSize: '0.84rem', marginBottom: '10px', fontWeight: 600 }}>
                        {formatDate(post.date)}
                      </div>
                      <div className="story-title">{post.title}</div>
                      <p className="story-excerpt">{post.excerpt}</p>
                      <button
                        type="button"
                        className="story-read"
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelectedPost(post)
                        }}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                        >
                        Read story →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />

      {selectedPost ? (
        <div className="story-modal-backdrop" onClick={() => setSelectedPost(null)}>
          <div
            className="story-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
            >
            <button
              type="button"
              className="story-modal-close"
              onClick={() => setSelectedPost(null)}
              aria-label="Close blog"
              >
              ×
            </button>
            <div className="story-modal-media">
              <img src={selectedPost.image} alt={selectedPost.title} />
            </div>
            <div className="story-modal-content">
              <span className="story-cat modal-cat">{selectedPost.category}</span>
              <h3 id="story-modal-title" className="story-modal-title">{selectedPost.title}</h3>
              <p className="story-modal-excerpt">{selectedPost.excerpt}</p>
              <div style={{ color: 'var(--grey-light)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '14px' }}>
                {formatDate(selectedPost.date)}
              </div>
              <div className="story-modal-scroll blog-rich-copy">
                {selectedPost.isHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                ) : (
                  selectedPost.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                )}
              </div>
              {selectedPost.href ? (
                <a href={selectedPost.href} className="story-modal-link" target="_blank" rel="noreferrer">
                  Read original story →
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <style>{`
        .blog-page .blog-hero-shell {
          display: flex;
          justify-content: center;
          border-radius: 36px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          }
          
          .blog-page .blog-hero-content {
            max-width: 760px;
            }
            
            .blog-page .blog-message-box {
              margin-bottom: 28px;
              border-radius: 22px;
              border: 1px solid rgba(230, 51, 41, 0.14);
              background: rgba(230, 51, 41, 0.05);
              color: var(--charcoal);
              padding: 16px 20px;
              }
              
        .blog-page .blog-stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          align-items: stretch;
          }
          
          .blog-page .blog-story-card {
            height: 100%;
            }
            
            .blog-page .blog-story-card .story-img.short {
              height: 240px;
              }
              
              .blog-page .blog-rich-copy p {
                margin: 0 0 14px;
                color: var(--grey);
                }
                
                .blog-page .blog-rich-copy h1,
        .blog-page .blog-rich-copy h2,
        .blog-page .blog-rich-copy h3,
        .blog-page .blog-rich-copy h4 {
          margin: 20px 0 12px;
          color: var(--charcoal);
          font-family: 'Playfair Display', serif;
          line-height: 1.2;
          }
          
          .blog-page .blog-rich-copy ul,
          .blog-page .blog-rich-copy ol {
            padding-left: 20px;
            margin: 0 0 16px;
            color: var(--grey);
            }
            
            .blog-page .blog-rich-copy a {
              color: var(--red);
              }

              @media (max-width: 1024px) {
                .blog-page .blog-hero-shell {
                  justify-content: flex-start;
                  }
                  }
                  
                  @media (max-width: 720px) {
                    .blog-page .blog-hero-shell {
                      padding: 24px;
          }
          
          .blog-page .blog-story-card .story-img.short {
            height: 220px;
            }
        }
        
        @media (max-width: 640px) {
          .blog-page .container {
            padding: 0 20px;
            }
            }
            `}</style>
    </div>
  )
}

function LoadingState() {
  return (
    <div
    style={{
      borderRadius: '28px',
      border: '1px solid var(--border)',
      background: 'linear-gradient(180deg, #fff 0%, #fdf8f4 100%)',
      padding: '34px',
      color: 'var(--grey)',
    }}
    >
      Loading blog stories...
    </div>
  )
}
