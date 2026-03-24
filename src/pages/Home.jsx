import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './home.css'

import bg2 from '../assets/bg/bg-2.jpg'
import bg from '../assets/bg/bgyouth.jpg'
import bg3 from '../assets/bg/vertical-bg.jpg'


import yesummitimg from '../assets/progimg/yesummit.png'
import yessummit1 from '../assets/yessummit.png'

import Navbar from '../components/Navbar/Nav'
import { boardmembers, joinCards, marqueeItems, newsItems, nidhiTypes, partners, partnerStats, programs, quotes, stories, teammembers, testimonials, yesFeatures } from '../constant/constant'



export default function Home() {
  const [selectedStory, setSelectedStory] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    revealItems.forEach((item) => observer.observe(item))

    const handleScroll = () => {
      const nav = document.querySelector('.yaf-nav')
      if (nav) {
        nav.style.boxShadow = window.scrollY > 40 ? '0 4px 32px rgba(0,0,0,.08)' : 'none'
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!selectedStory) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedStory(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedStory])

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const scrollToSection = () => {
      const target = document.querySelector(location.hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const timer = window.setTimeout(scrollToSection, 80)

    return () => window.clearTimeout(timer)
  }, [location.hash])

  return (
    <div className="yaf-page">
      <Navbar />
      
      <section className="hero" id="home">
        <div className="hero-left reveal">
          <div className="hero-badge">Pune, Maharashtra · Est. 2016</div>
          <h1 className="hero-h1">
            Investing in
            <br />
            <em>Grassroots</em>
            <br />
            Entrepreneurs
          </h1>
          <p className="hero-sub">
            Empowering over 16,000 women from marginalized communities to build sustainable businesses, gain financial independence, and transform generational mindsets.
          </p>
          <div className="hero-btns">
            <a href="/donate" className="btn-red" target="_blank" rel="noreferrer">
              Donate & Create Impact
            </a>
            <a href="/stories" className="btn-ghost-dark">
              Read Stories <span className="arr">→</span>
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat first">
              <div className="n">16<span>K+</span></div>
              <div className="l">Women Empowered</div>
            </div>
            <div className="hero-stat">
              <div className="n">36</div>
              <div className="l">Districts Covered</div>
            </div>
            <div className="hero-stat last">
              <div className="n">₹1.1<span>Cr</span></div>
              <div className="l">Seed Capital Disbursed</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-mosaic">
            <div className="mosaic-img">
              <img src={bg3} alt="Woman entrepreneur at work" />
              <div className="mosaic-caption">Prema — Breaking the cycle of Majboori</div>
            </div>
            <div className="mosaic-img">
              <img src={bg2} alt="Women in business training" />
              <div className="mosaic-caption">Saksham Training Programme</div>
            </div>
            <div className="mosaic-img">
              <img src={bg} alt="YESummit participants" />
              <div className="mosaic-caption">YESummit 2024 — 350 Entrepreneurs</div>
            </div>
          </div>
          <div className="hero-pill">YESummit 2024 — 350 Participants</div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      

      <section className="impact-section">
        <div className="container">
          <div className="impact-grid">
            <div className="reveal">
              <span className="section-label alt-label">Our Impact</span>
              <h2 className="section-title white">
                By the numbers
                <br />
                <em>real change</em>
              </h2>
              <p>Every statistic represents a woman who decided her life wasn't fixed—who chose to build something of her own.</p>
            </div>
            <div className="impact-numbers reveal reveal-delay-1">
              <ImpactCard icon="👩‍💼" num="16,000+" label="Women trained across urban slums, rural, and tribal communities" />
              <ImpactCard icon="🗺️" num="36" label="Districts reached during the Udyamita Yatra" />
              <ImpactCard icon="💰" num="₹1.1Cr" label="Seed capital disbursed to over 1,000 entrepreneurs" />
              <ImpactCard icon="🏆" num="350+" label="Entrepreneurs at YESummit 2024" />
            </div>
          </div>
        </div>
      </section>

      <section className="programs-section" id="programs">
        <div className="container">
          <div className="programs-header reveal">
            <div>
              <span className="section-label">What We Do</span>
              <h2 className="section-title">
                Comprehensive support
                <br />
                <em>from idea to scale</em>
              </h2>
              <p>Our integrated approach covers every stage of entrepreneurial growth—training, capital access, market connections, and ongoing mentorship.</p>
            </div>
          </div>
          <div className="programs-grid">
            {programs.map((program) => (
              <article key={program.name} className={`prog-card reveal${program.wide ? ' wide' : ''}`}>
                <div className={`prog-img${program.wide ? ' tall' : ''}`}>
                  <img src={program.img} alt={program.name} />
                </div>
                <div className="prog-icon-pill">{program.pill}</div>
                <div className="prog-name">{program.name}</div>
                <p className="prog-desc">{program.desc}</p>
                <a href={program.href} className="prog-link" target="_blank" rel="noreferrer">
                  Learn more →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stories-section" id="stories">
        <div className="container">
          <div className="stories-header reveal">
            <div>
              <span className="section-label">Stories</span>
              <h2 className="section-title">
                Journeys of <em>courage</em>
                <br />
                and transformation
              </h2>
            </div>
            <a href="/blogs" className="btn-ghost-dark">
              All Stories <span className="arr">→</span>
            </a>
          </div>
          <div className="stories-grid">
            {stories.map((story, index) => (
              <article
                key={story.title}
                className={`story-card${story.big ? ' big' : ''} reveal reveal-delay-${Math.min(index, 2)}`}
                onClick={() => setSelectedStory(story)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedStory(story)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Read full story: ${story.title}`}
              >
                <div className={`story-img${story.big ? ' tall' : ' short'}`}>
                  <img src={story.img} alt={story.title} />
                  <div className="story-img-overlay">
                    <span className="story-cat">{story.category}</span>
                  </div>
                </div>
                <div className="story-body">
                  <div className="story-title">{story.title}</div>
                  <p className="story-excerpt">{story.excerpt}</p>
                  <span className="story-read">
                    Read Full Story →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedStory && (
        <div className="story-modal-backdrop" onClick={() => setSelectedStory(null)}>
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
              onClick={() => setSelectedStory(null)}
              aria-label="Close story"
            >
              ×
            </button>
            <div className="story-modal-media">
              <img src={selectedStory.img} alt={selectedStory.title} />
            </div>
            <div className="story-modal-content">
              <span className="story-cat modal-cat">{selectedStory.category}</span>
              <h3 id="story-modal-title" className="story-modal-title">{selectedStory.title}</h3>
              <p className="story-modal-excerpt">{selectedStory.excerpt}</p>
              <div className="story-modal-scroll">
                {selectedStory.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="quote-strip">
        <div className="container">
          <div className="quote-inner">
            {quotes.map((quote) => (
              <article key={quote.name} className="qt-card">
                <span className="qt-mark">"</span>
                <p className="qt-text">{quote.text}</p>
                <div className="qt-name">{quote.name}</div>
                <div className="qt-role">{quote.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="yes-section">
        <div className="container">
          <div className="yes-inner">
            <div className="yes-imgs reveal">
              <div className="yes-img-main">
                <img src={yessummit1} alt="YESummit stage" />
              </div>
              <div className="yes-img-sm">
                <img src={yesummitimg} alt="Entrepreneur speaking" />
              </div>
              <div className="yes-img-sm">
                <img src={bg3} alt="Networking session" />
              </div>
            </div>
            <div className="yes-text reveal reveal-delay-1">
              <span className="section-label">YESummit</span>
              <h2 className="section-title">
                A national stage for
                <br />
                <em>grassroots ambition</em>
              </h2>
              <p>
                YESummit is where entrepreneurs showcase products, pitch business ideas, and build the confidence to scale beyond local markets. Our flagship annual event brings together hundreds of grassroots business owners for learning, visibility, and opportunity.
              </p>
              <div className="yes-facts">
                <div className="yf-item">
                  <div className="n">350+</div>
                  <div className="l">Participants in 2024</div>
                </div>
                <div className="yf-item">
                  <div className="n">123</div>
                  <div className="l">Pitches for seed capital</div>
                </div>
                <div className="yf-item">
                  <div className="n">49</div>
                  <div className="l">Exhibiting entrepreneurs</div>
                </div>
              </div>
              <div className="yes-features">
                {yesFeatures.map((feature) => (
                  <div key={feature.title} className="yes-feat">
                    <div className="yes-feat-icon">{feature.icon}</div>
                    <div>
                      <div className="yes-feat-title">{feature.title}</div>
                      <div className="yes-feat-desc">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="yatra-section">
        <div className="yatra-bg-img">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80&fit=crop" alt="Udyamita Yatra background" />
        </div>
        <div className="yatra-content">
          <div className="yatra-left reveal">
            <span className="section-label alt-label">Udyamita Yatra</span>
            <h2 className="section-title white">
              Bringing opportunity
              <br />
              <em>door to door</em>
            </h2>
            <p>
              Our 40-day Udyamita Yatra traveled across Maharashtra, reaching women in their own communities with direct access to training, mentorship, and entrepreneurship pathways—breaking the barrier of geography.
            </p>
            <div className="yatra-nums">
              <div className="yatra-num first">
                <div className="n">40</div>
                <div className="l">Days on the road</div>
              </div>
              <div className="yatra-num">
                <div className="n">36</div>
                <div className="l">Districts reached</div>
              </div>
              <div className="yatra-num">
                <div className="n">16K+</div>
                <div className="l">Women engaged locally</div>
              </div>
            </div>
          </div>
          <div className="yatra-right">
            <div className="yatra-right-img">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&fit=crop" alt="Community gathering" />
            </div>
            <div className="yatra-right-overlay">
              <ul className="yatra-checklist">
                <li>Direct outreach building trust and grassroots momentum.</li>
                <li>Local connections creating pathways to structured training programs.</li>
                <li>Sustained follow-up through Saksham, Sankalp, and Nidhi initiatives.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="nidhi-section">
        <div className="container">
          <div className="nidhi-inner">
            <div className="nidhi-visual reveal">
              <div className="big-amount">₹1.1Cr</div>
              <div className="big-label">Seed capital disbursed</div>
              <div className="nidhi-divider" />
              <div className="ent">1,000+</div>
              <div className="ent-l">Entrepreneurs funded</div>
            </div>
            <div className="nidhi-right reveal reveal-delay-1">
              <span className="section-label">Nidhi</span>
              <h2 className="section-title">
                Capital to move from
                <br />
                <em>dreams to reality</em>
              </h2>
              <p>
                Access to capital is often the barrier between having a brilliant business idea and actually starting. Nidhi provides flexible funding designed for the realities of grassroots entrepreneurs—small amounts, realistic timelines, and support through growth.
              </p>
              <div className="nidhi-types">
                {nidhiTypes.map((item) => (
                  <div key={item.title} className="nidhi-type">
                    <div className="nt-icon">{item.icon}</div>
                    <div className="nt-title">{item.title}</div>
                    <div className="nt-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="testi-header reveal">
            <span className="section-label">Impact Voices</span>
            <h2 className="section-title">
              What real change
              <br />
              <em>sounds like</em>
            </h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((item, index) => (
              <article key={item.name} className={`testi-card reveal reveal-delay-${Math.min(index, 2)}`}>
                <span className="qm">"</span>
                <p className="testi-text">{item.text}</p>
                <div className="testi-name">{item.name}</div>
                <div className="testi-role">{item.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section" id="team">
        <div className="container">
          <div className="team-header reveal">
            <div className="team-label">People Behind The Mission</div>
            <h2 className="section-title">
              A team dedicated to
              <br />
              <em>grassroots change</em>
            </h2>
          </div>
          <div className="board-label">Core Team & Board Members</div>
          <div className="team-grid">
            {boardmembers.map((member, index) => (
              <article key={member.name} className={`tm-card reveal reveal-delay-${index % 3}`}>
                <div className="tm-avatar">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="tm-name">{member.name}</div>
                <div className="tm-role">{member.role}</div>
              </article>
            ))}
          </div>
          <div className="board-label">Team Members</div>
          <div className="team-grid">
            {teammembers.map((member, index) => (
              <article key={member.name} className={`tm-card reveal reveal-delay-${index % 3}`}>
                <div className="tm-avatar">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="tm-name">{member.name}</div>
                <div className="tm-role">{member.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="news-section" id="news">
        <div className="container">
          <div className="news-header reveal">
            <div>
              <span className="section-label">Latest Updates</span>
              <h2 className="section-title">
                Stories from the
                <br />
                <em>field</em>
              </h2>
            </div>
            <a href="https://youthaidfoundation.org/blog/" className="btn-ghost-dark" target="_blank" rel="noreferrer">
              All Updates <span className="arr">→</span>
            </a>
          </div>
          <div className="news-grid">
            {newsItems.map((item, index) => (
              <article key={item.title} className={`news-card${item.featured ? ' featured' : ''} reveal reveal-delay-${Math.min(index, 2)}`}>
                <div className={`news-img${item.featured ? ' tall' : ' short'}`}>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="news-content">
                  <span className="news-cat">{item.category}</span>
                  <div className="news-title">{item.title}</div>
                  <div className="news-date">{item.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="partners-section">
        <div className="container">
          <div className="partners-shell reveal">
            <div className="partners-copy">
              <span className="section-label">Our Partners & Donors</span>
              <h2 className="section-title">
                Support that
                <br />
                <em>multiplies impact</em>
              </h2>
              <p className="partners-text">
                Every partnership helps us move beyond one-time aid and build stronger ecosystems for women entrepreneurs through training, funding, mentorship, and market access.
              </p>
              <div className="partner-stats">
                {partnerStats.map((item, index) => (
                  <div key={item.label} className={`partner-stat reveal reveal-delay-${Math.min(index, 2)}`}>
                    <div className="partner-stat-value">{item.value}</div>
                    <div className="partner-stat-label">{item.label}</div>
                  </div>
                ))}
              </div>
              <p className="partners-note">
                Together with our ecosystem of partners, we create lasting opportunities for women entrepreneurs to grow.
              </p>
            </div>

            <div className="partners-content reveal reveal-delay-1">
              <div className="partners-network-header">
                <div>
                  <div className="partners-network-label">Partner Network</div>
                  <div className="partners-network-title">Organizations, donors, and allies working together</div>
                </div>
                <div className="partners-network-meta">{partners.length}+ partnerships</div>
              </div>
              <div className="partners-logo-grid unified">
                {partners.map((partner, index) => (
                  <article key={partner.name} className={`partner-logo-tile reveal reveal-delay-${Math.min(index % 3, 2)}`}>
                    <div className="partner-logo-tile-image-wrap logo-container">
                      <img src={partner.logo} alt={`${partner.name} logo`} className="partner-logo-tile-image" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="join-section" id="joinus">
        <div className="container">
          <div className="join-header reveal">
            <span className="section-label alt-label centered-label">Get Involved</span>
            <h2 className="section-title white">
              Be part of the <em>movement</em>
            </h2>
            <p>Your skills, expertise, or support can directly impact an entrepreneur's success. Here are ways to get involved.</p>
          </div>
          <div className="join-grid">
            {joinCards.map((card, index) => (
              <article key={card.title} className={`join-card reveal reveal-delay-${Math.min(index, 2)}`}>
                <span className="join-icon">{card.icon}</span>
                <div className="join-title">{card.title}</div>
                <p className="join-desc">{card.desc}</p>
                <a href={card.href} className="btn-outline-w" target="_blank" rel="noreferrer">
                  {card.label}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <div className="pre">Support the Mission</div>
              <div className="headline">
                Your donation gives a woman
                <br />
                the freedom to dream
              </div>
            </div>
            <div className="cta-btns">
              <a href="/donate" className="btn-white" target="_blank" rel="noreferrer">
                Donate Now
              </a>
              <a href="/volunteer" className="btn-outline-r" target="_blank" rel="noreferrer">
                Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="fl">
                YOUTH<span>Aid</span> Foundation
              </div>
              <p>
                We build thriving entrepreneurship ecosystems in grassroots communities. By supporting women entrepreneurs, we create pathways to dignity, independence, and economic participation.
              </p>
              <div className="social-row">
                <a href="https://www.facebook.com/yesummitindia" className="soc-btn" target="_blank" rel="noreferrer">f</a>
                <a href="https://www.instagram.com/youthaidf/" className="soc-btn" target="_blank" rel="noreferrer">ig</a>
                <a href="https://www.youtube.com/@youthaidfoundation8287" className="soc-btn" target="_blank" rel="noreferrer">yt</a>
                <a href="https://www.linkedin.com/company/youthaidfoundation/" className="soc-btn" target="_blank" rel="noreferrer">in</a>
                <a href="https://wa.me/917744049934" className="soc-btn" target="_blank" rel="noreferrer">wa</a>
              </div>
            </div>
            <div>
              <div className="fc-title">Programs</div>
              <ul className="fc-links">
                <li><a href="https://youthaidfoundation.org/our-programs/#saksham" target="_blank" rel="noreferrer">Saksham</a></li>
                <li><a href="https://youthaidfoundation.org/our-programs/#sankalp" target="_blank" rel="noreferrer">Sankalp</a></li>
                <li><a href="https://youthaidfoundation.org/our-programs/#sphoorti" target="_blank" rel="noreferrer">Sphoorti</a></li>
                <li><a href="https://youthaidfoundation.org/our-programs/#nidhi" target="_blank" rel="noreferrer">Nidhi</a></li>
                <li><a href="https://youthaidfoundation.org/our-programs/#yesummit" target="_blank" rel="noreferrer">YESummit</a></li>
                <li><a href="https://youthaidfoundation.org/causes/udyamita-yatra/" target="_blank" rel="noreferrer">Udyamita Yatra</a></li>
              </ul>
            </div>
            <div>
              <div className="fc-title">Quick Links</div>
              <ul className="fc-links">
                <li><a href="https://youthaidfoundation.org/about-yaf/" target="_blank" rel="noreferrer">About YAF</a></li>
                <li><a href="https://youthaidfoundation.org/board/" target="_blank" rel="noreferrer">Our Team</a></li>
                <li><a href="https://youthaidfoundation.org/blogs/" target="_blank" rel="noreferrer">Blogs & Vlogs</a></li>
                <li><a href="https://youthaidfoundation.org/blog/" target="_blank" rel="noreferrer">News & Updates</a></li>
                <li><a href="https://youthaidfoundation.org/policies/" target="_blank" rel="noreferrer">Policies</a></li>
                <li><a href="https://youthaidfoundation.org/volunteer/" target="_blank" rel="noreferrer">Volunteer</a></li>
                <li><a href="https://youthaidfoundation.org/csr-partnership/" target="_blank" rel="noreferrer">CSR Partnership</a></li>
                <li><a href="https://youthaidfoundation.org/job-openings/" target="_blank" rel="noreferrer">Careers</a></li>
              </ul>
            </div>
            <div>
              <div className="fc-title">Contact Us</div>
              <div className="fc-addr">Flat no. 102, Crown Plaza, Deccan College Rd, next to Manuski, Crown Co-Op Housing Society, Jai Jawan Nagar, Salwe Nagar, Yerawada, Pune.</div>
              <div className="fc-contact">📞 +91 77440 49934</div>
              <div className="fc-contact">✉️ Youthaidf@gmail.com</div>
              <div className="fc-contact">🌐 youthaidfoundation.org</div>
              <a href="/donate" className="btn-red footer-btn" target="_blank" rel="noreferrer">
                Donate Now
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2026 YouthAid Foundation. All Rights Reserved.</div>
            <div>Igniting Grassroots Potential · Pune, Maharashtra, India</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ImpactCard({ icon, num, label }) {
  return (
    <div className="impact-card">
      <div className="ic-icon">{icon}</div>
      <div className="ic-num">{num}</div>
      <div className="ic-label">{label}</div>
    </div>
  )
}
