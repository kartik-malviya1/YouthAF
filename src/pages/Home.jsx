import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './home.css'

import mathew from '../assets/board-members/Mathew-Mattam.jpg'
import priya from '../assets/board-members/Priya-Kothari.jpg'
import ujjwal from '../assets/board-members/Prof-Ujjwal-Kumar.jpg'
import sofy from '../assets/board-members/Sofy-Mathew.jpeg'
import sonia from '../assets/board-members/Sonia-Garcha.jpg'

import jyotsna from '../assets/team-members/Jyotsna-Bahirat.jpg'
import kishori from '../assets/team-members/Kishori-Thakar.png'
import pranali from '../assets/team-members/Pranali-Pawar.png'
import rasika from '../assets/team-members/Rasika-Kadam.png'
import shilpa from '../assets/team-members/Shilpa-Bahade.png'

import bg from '../assets/bg/bgyouth.jpg'
import bg2 from '../assets/bg/bg-2.jpg'
import bg3 from '../assets/bg/vertical-bg.jpg'

import sakshamimg from '../assets/progimg/saksham.png'
import sankalpimg from '../assets/progimg/sankalp.png'
import sphoortiimg from '../assets/progimg/sphoorti.png'
import nidhiimg from '../assets/progimg/nidhi.png'
import yesummitimg from '../assets/progimg/yesummit.png'

import helpsinglemom from '../assets/blog-images/helpsinglemom.jpeg'
import jayahelp from '../assets/blog-images/jaya-help.jpeg'
import YAF from '../assets/blog-images/YAF-made.jpeg'
import aboutusimg from '../assets/aboutimg.jpg'
import yessummit1 from '../assets/yessummit.png'
import adamasLogo from '../assets/partners-logos/adamas.png'
import bhartiyaLogo from '../assets/partners-logos/bhartiya.png'
import centumLogo from '../assets/partners-logos/centum.png'
import coforgeLogo from '../assets/partners-logos/coforge.webp'
import kaushalyaLogo from '../assets/partners-logos/kaushalya.png'
import mahindraLogo from '../assets/partners-logos/mahindra.png'
import mssdsLogo from '../assets/partners-logos/mssds.png'
import qualysLogo from '../assets/partners-logos/qualys.png'
import samhitaLogo from '../assets/partners-logos/samhita.png'

import rashikaimg from '../assets/rashika-kadam.png'
import rampwalk from '../assets/ramp-walk.png'

const marqueeItems = [
  '16,000+ Women Empowered',
  '36 Districts · Maharashtra',
  '₹1.1 Crore Seed Capital',
  '1,000+ Entrepreneurs Funded',
  'Aatmanirbhar Bharat',
  'YESummit · Est. 2016',
  'Udyamita Yatra · 40 Days',
  'NavaAahar · 10Stitch Collectives',
]

const boardmembers = [
  { img: mathew, name: 'Mathew Mattam', role: 'Chairperson' },
  { img: priya, name: 'Priya Kothari', role: 'Board of Directors' },
  { img: ujjwal, name: 'Prof. Ujjwal Kumar Chowdhury', role: 'Board of Directors' },
  { img: sofy, name: 'Sofy Mathew', role: 'Board of Directors' },
  { img: sonia, name: 'Sonia Garcha', role: 'Board of Directors' },
]
const teammembers = [
  { img: jyotsna, name: 'Jyotsna Bahirat', role: 'Chief Operating Officer' },
  { img: kishori, name: 'Rasika Kadam', role: 'Unit Head, Saksham' },
  { img: pranali, name: 'Shilpa Bahade', role: 'Unit Head, Sankalp' },
  { img: rasika, name: 'Kishori Thakar', role: 'Data Management Officer' },
  { img: shilpa, name: 'Pranali Pawar', role: 'Finance Officer & Admin' },
]

const programs = [
  {
    pill: '🎓 Saksham',
    name: 'Entrepreneurship Training',
    desc: 'Module-based activities covering ideation, market surveys, financial literacy, product diversification, sales pitches, digital marketing, and setting annual targets.',
    img: sakshamimg,
    href: 'https://youthaidfoundation.org/our-programs/#saksham',
  },
  {
    pill: '📈 Sankalp',
    name: 'Business Mentorship',
    desc: 'Post-training mentorship that helps entrepreneurs sustain growth, tackle challenges early, and turn momentum into lasting businesses.',
    img: sankalpimg,
    href: 'https://youthaidfoundation.org/our-programs/#sankalp',
  },
  {
    pill: '🌱 Sphoorti',
    name: 'Collectives & Industrial Setups',
    desc: 'Support for startup-ready women to build collectives and move into industrial production with stronger market access and shared infrastructure.',
    img: sphoortiimg,
    href: 'https://youthaidfoundation.org/our-programs/#sphoorti',
  },
  {
    pill: '💸 Nidhi',
    name: 'Seed Capital & Funding',
    desc: 'Grants, revolving funds, raw material support, and other funding pathways that help women start or revive their businesses.',
    img: nidhiimg,
    href: 'https://youthaidfoundation.org/our-programs/#nidhi',
  },
  {
    pill: '🏆 YESummit',
    name: 'Young Entrepreneurs Summit',
    desc: 'The annual flagship event that helps local entrepreneurs sharpen their brands, pitch for seed capital, and connect with wider markets.',
    img: yesummitimg,
    href: 'https://youthaidfoundation.org/our-programs/#yesummit',
    wide: true,
  },
]

const stories = [
  {
    title: 'Helping Single Mothers & COVID-Impacted Widows',
    excerpt: 'Women who once felt trapped by circumstance found the confidence to step into entrepreneurship and rebuild their families with dignity.',
    category: 'Blog',
    img: helpsinglemom,
    href: 'https://youthaidfoundation.org/causes/helping-single-mothers-and-covid-impacted-widows/',
    big: true,
    content: [
      'Across many communities, single mothers and women widowed during the COVID period were carrying the full burden of survival without reliable income, social backing, or a clear path forward.',
      'YouthAid Foundation stepped in with entrepreneurship training, mentorship, and practical business support so these women could move from crisis response to long-term stability. Instead of being treated only as beneficiaries, they were encouraged to see themselves as business owners capable of making decisions and generating income.',
      'For many participants, the first transformation was internal. Confidence, self-belief, and financial awareness began to grow alongside business planning. Small enterprises then became a way to rebuild dignity at home, support children, and create a stronger sense of independence.',
      'What makes this story powerful is not just the launch of micro-businesses, but the shift in identity. Women who once felt cornered by circumstance began creating livelihoods with agency, resilience, and hope.',
    ],
  },
  {
    title: "Jaya Helped 10,000 Villagers Through 'CRC'",
    excerpt: 'A local entrepreneur transformed personal hardship into a service that reached thousands of people in her community.',
    category: 'Blog',
    img: jayahelp,
    href: 'https://youthaidfoundation.org/causes/jaya-solved-the-problem-of-hundreds-of-villagers-through-her-new-yaf-supported-business/',
    content: [
      "Jaya's journey began with hardship, but it did not end there. With YouthAid Foundation's support, she identified a community need and built a service model around it through a Common Resource Center approach.",
      'Her work solved real everyday problems for villagers who previously had limited access to essential support and services. As her confidence and systems improved, the business became more than a source of income; it became local infrastructure.',
      'The reach of her effort eventually extended to thousands of villagers, proving that grassroots entrepreneurship can scale when it is rooted in community realities. Her story is a reminder that local women leaders often understand the most urgent problems best.',
      "Jaya's impact reflects the larger vision of the program: when women are backed with skills, mentorship, and capital, they do not only improve their own households, they strengthen the communities around them.",
    ],
  },
  {
    title: 'YAF made me realize digital is the way ahead',
    excerpt: 'I was selling at a very local village level but when i came to YESummit in Pune City. I was exposed',
    category: 'Blog',
    img: YAF,
    href: 'https://youthaidfoundation.org/causes/',
    content: [
      `“This additional income earned by implementing YAF’s teachings has given me the freedom to live for myself. I understood that life is not lived like robots only to work like a slave for a boss but to enjoy things like going on holidays.” Deepali Chawan from Thane said. The thing that got her to this level was digital literacy by YAF. “YAF showed me that the world is moving ahead towards digitalisation and inspired me to move along with it otherwise i'll be left behind.” she said. At YAF we help remove inferiority complexes the grassroots faces in front of higher socio-economic classes, Deepali is a prime example. “Before YAF my knowledge of business was 0. I used to only buy and sell without writing anything or spreading the word. They gave me the idea of distributing 100 pamphlets out of which I got 40 customers. “This training was like the formal education I never received.” she added`,
    ],
  },
]

const quotes = [
  {
    text: 'I am now a role model to my son as he has seen my transition from accepting unjust working conditions to personal and financial freedom through my business.',
    name: 'Prema',
    role: 'YAF Entrepreneur',
  },
  {
    text: 'Entrepreneurship helped me see myself differently. I stopped waiting for permission and started building a future with confidence.',
    name: 'Community Participant',
    role: 'YESummit Delegate',
  },
  {
    text: 'When women earn, entire families start to dream bigger. The real change is not only financial, it is social and deeply personal.',
    name: 'Field Mentor',
    role: 'YouthAid Foundation',
  },
]

const yesFeatures = [
  {
    icon: '🌍',
    title: 'From Local to Global',
    desc: 'YESummit helps entrepreneurs strengthen brands, sharpen pitches, and imagine wider markets beyond their immediate communities.',
  },
  {
    icon: '🎤',
    title: 'Pitching & Visibility',
    desc: 'Founders get structured exposure through stalls, investor-style presentations, and direct customer interactions.',
  },
  {
    icon: '🤝',
    title: 'Community Momentum',
    desc: 'The summit creates a space where women entrepreneurs learn from one another and build a shared sense of ambition.',
  },
]

const nidhiTypes = [
  { icon: '💵', title: 'Direct Grants', desc: 'Early support to help women launch viable micro-enterprises with less financial risk.' },
  { icon: '🔁', title: 'Revolving Funds', desc: 'Flexible capital structures that keep opportunity circulating across communities.' },
  { icon: '📦', title: 'Raw Material Support', desc: 'Practical inputs that reduce startup friction and improve production readiness.' },
  { icon: '📈', title: 'Growth Capital', desc: 'Support for revival, scale, and stronger market participation once traction begins.' },
]

const testimonials = [
  {
    text: 'YouthAid gave me more than training. It gave me the courage to believe that my work had value and could support my family.',
    name: 'Rohini Dyaneshwar Musale',
    role: 'Entrepreneur',
  },
  {
    text: 'The mentorship continued even after the programme ended. That follow-through made the difference between trying and actually growing.',
    name: 'Shanta Bhausaheb Gadekar',
    role: 'Programme Participant',
  },
  {
    text: 'What felt impossible at the beginning slowly became practical. I now see business as something I can build, not something only others do.',
    name: 'Suman Sharad Sahane',
    role: 'Grassroots Founder',
  },
]

const newsItems = [
  {
    title: 'Mid-day 44th anniversary special: A mentor for success',
    category: 'press and media coverage',
    date: 'September 9, 2024',
    img: rashikaimg,
    featured: true,
  },
  {
    title: 'From making masks to fashion studio: How 10 women found their feet in Covid shadow',
    category: 'press and media coverage',
    date: 'October 13, 2024',
    img: rampwalk,
  },
]

const joinCards = [
  {
    icon: '🤝',
    title: 'Volunteer & Intern',
    desc: 'Bring your skills directly to grassroots entrepreneurs through training, design, communication, tech, or business support.',
    href: 'https://youthaidfoundation.org/volunteer/',
    label: 'Apply Now',
  },
  {
    icon: '🏢',
    title: 'CSR Partnership',
    desc: "Partner under your CSR mandate and support women's economic empowerment with documented, measurable impact.",
    href: 'https://youthaidfoundation.org/csr-partnership/',
    label: 'Partner With Us',
  },
  {
    icon: '💼',
    title: 'Career at YAF',
    desc: "Join the team behind one of India's most ambitious grassroots entrepreneurship ecosystems.",
    href: 'https://youthaidfoundation.org/job-openings/',
    label: 'View Openings',
  },
]

const partnerStats = [
  { value: '16,000+', label: 'Women reached through ecosystem support' },
  { value: '1,000+', label: 'Entrepreneurs backed through funding and guidance' },
  { value: '36', label: 'Districts engaged across Maharashtra' },
]

const partners = [
  {
    name: 'Coforge',
    type: 'CSR Ally',
    desc: 'Backing scalable entrepreneurship journeys with stronger institutional support.',
    logo: coforgeLogo,
  },
  {
    name: 'Mahindra',
    type: 'Strategic Support',
    desc: 'Helping translate corporate responsibility into measurable grassroots outcomes.',
    logo: mahindraLogo,
  },
  {
    name: 'Qualys',
    type: 'Impact Funders',
    desc: 'Fueling seed capital, training continuity, and long-term women-led growth.',
    logo: qualysLogo,
  },
  {
    name: 'Samhita',
    type: 'Implementation Partner',
    desc: 'Strengthening field collaboration and making larger programs easier to deliver at scale.',
    logo: samhitaLogo,
  },
  {
    name: 'Centum',
    type: 'Funding Partner',
    desc: 'Expanding access to opportunity through structured support for women-led enterprise growth.',
    logo: centumLogo,
  },
  {
    name: 'MSSDS',
    type: 'Public Sector Ally',
    desc: 'Supporting livelihood pathways and entrepreneurship readiness across communities.',
    logo: mssdsLogo,
  },
  {
    name: 'Bhartiya',
    type: 'Institutional Support',
    desc: 'Contributing to stronger entrepreneurship ecosystems through collaborative engagement.',
    logo: bhartiyaLogo,
  },
  {
    name: 'Kaushalya',
    type: 'Skilling Network',
    desc: 'Connecting women entrepreneurs with training-led momentum and practical business growth.',
    logo: kaushalyaLogo,
  },
  {
    name: 'Adamas',
    type: 'Community Partner',
    desc: 'Helping extend outreach, visibility, and trust across the wider support network.',
    logo: adamasLogo,
  },
]

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
      <nav className="yaf-nav">
        <a className="nav-logo" href="#home">
          <div className="nav-logo-icon"><img src="./logo.png" alt="YAF-logo" /></div>
          <div className="nav-logo-text">
            <div className="top">
              YOUTH<span>Aid</span> Foundation
            </div>
            <div className="tagline mt-1">Igniting Grassroots Potential</div>
          </div>
        </a>
        <ul className="nav-links -translate-x-8">
          <li><a href="#about">About</a></li>
          <li><a href="#programs">Programs</a></li>
          <li><a href="#stories">Stories</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#news">News</a></li>
          <li><a href="#joinus">Join Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="/donate" className="nav-cta" target="_blank" rel="noreferrer">
          Donate Now
        </a>
      </nav>

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
            Using entrepreneurship to gain financial independence, change patriarchal mindsets, overcome a worker&apos;s mentality, boost self-esteem, and conquer fears. 16,000+ women and counting.
          </p>
          <div className="hero-btns">
            <a href="/donate" className="btn-red" target="_blank" rel="noreferrer">
              Donate & Create Impact
            </a>
            <a href="#stories" className="btn-ghost-dark">
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

      <section className="about-section" id="about">
        <div className="container">
          <div className="about-inner">
            <div className="about-imgs reveal">
              <div className="about-img-big">
                <img src= {aboutusimg} alt="Women in a training session" />
              </div>
              <div className="about-img-stack">
                <div className="about-img-sm">
                  <img src={yessummit1} alt="Mentorship session" />
                </div>
                <div className="about-img-sm">
                  <img src={yesummitimg} alt="Entrepreneur portrait" />
                </div>
              </div>
              <div className="about-badge-float">
                <div className="big">2016</div>
                <div className="sm">Founded in Pune</div>
              </div>
            </div>

            <div className="about-text reveal reveal-delay-1">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">
                Breaking barriers,
                <br />
                <em>one enterprise</em> at a time
              </h2>
              <p>
                YouthAid Foundation has empowered over 16,000 grassroots women from marginalized communities across urban, rural, and tribal areas to start micro, nano, and small enterprises.
              </p>
              <p>
                Through training, mentorship, and long-term support, entrepreneurs build financial independence and move beyond generations of being treated only as workers.
              </p>
              <div className="about-feature">
                <div className="af-title">YAF Breaking the Cycle of Majboori</div>
                <p>
                  Prema shared that entrepreneurship helped her move from accepting unjust working conditions to building personal and financial freedom through her business.
                </p>
              </div>
              <div className="btn-row">
                <a href="https://youthaidfoundation.org/about-yaf/" className="btn-red" target="_blank" rel="noreferrer">
                  Our Full Story
                </a>
                <a href="https://www.youtube.com/watch?v=8G-YoVnxgHU" className="btn-ghost-dark" target="_blank" rel="noreferrer">
                  Watch Video <span className="arr">▶</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-section">
        <div className="container">
          <div className="impact-grid">
            <div className="reveal">
              <span className="section-label alt-label">Our Impact</span>
              <h2 className="section-title white">
                Numbers that
                <br />
                <em>speak</em> for
                <br />
                themselves
              </h2>
              <p>From COVID-impacted widows to artisans dreaming of going global, every number here represents a real story of courage and transformation.</p>
            </div>
            <div className="impact-numbers reveal reveal-delay-1">
              <ImpactCard icon="👩‍💼" num="16,000+" label="Women trained across urban slums, rural, and tribal communities" />
              <ImpactCard icon="🗺️" num="36" label="Districts of Maharashtra covered during the 40-day Udyamita Yatra" />
              <ImpactCard icon="💰" num="₹1.1Cr" label="Seed capital disbursed to more than 1,000 grassroots entrepreneurs" />
              <ImpactCard icon="🏆" num="350+" label="Entrepreneurs participating in YESummit 2024 alone" />
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
                Five pillars of
                <br />
                <em>transformation</em>
              </h2>
            </div>
            <a href="https://youthaidfoundation.org/our-programs/" className="btn-ghost-dark" target="_blank" rel="noreferrer">
              All Programs <span className="arr">→</span>
            </a>
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
              <span className="section-label">Blogs</span>
              <h2 className="section-title">
                Read stories of <em>resilience</em>
                <br />
                & transformation
              </h2>
            </div>
            <a href="https://youthaidfoundation.org/causes/" className="btn-ghost-dark" target="_blank" rel="noreferrer">
              All Blogs <span className="arr">→</span>
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
                aria-label={`Read full blog: ${story.title}`}
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
                    Read Full Blog →
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
              aria-label="Close blog"
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
              <a href={selectedStory.href} className="story-modal-link" target="_blank" rel="noreferrer">
                Visit Original Story →
              </a>
            </div>
          </div>
        </div>
      )}

      <section className="quote-strip">
        <div className="container">
          <div className="quote-inner">
            {quotes.map((quote) => (
              <article key={quote.name} className="qt-card">
                <span className="qt-mark">“</span>
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
                <img src={yessummit1} />
              </div>
              <div className="yes-img-sm">
                <img src={yesummitimg} />
              </div>
              <div className="yes-img-sm">
                <img src={bg3} alt="Pitch session" />
              </div>
            </div>
            <div className="yes-text reveal reveal-delay-1">
              <span className="section-label">YESummit</span>
              <h2 className="section-title">
                A stage for
                <br />
                <em>grassroots ambition</em>
              </h2>
              <p>
                Since 2016, YESummit has been a flagship platform where entrepreneurs showcase products, present business ideas, and build confidence to grow beyond local markets.
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
              Taking entrepreneurship
              <br />
              <em>district by district</em>
            </h2>
            <p>
              The 40-day Udyamita Yatra carried YouthAid&apos;s mission across Maharashtra, reaching women where they are and opening pathways to enterprise in communities often left out of formal support systems.
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
                <div className="l">Women inspired</div>
              </div>
            </div>
          </div>
          <div className="yatra-right">
            <div className="yatra-right-img">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&fit=crop" alt="Women in event" />
            </div>
            <div className="yatra-right-overlay">
              <ul className="yatra-checklist">
                <li>Grassroots outreach built around aspiration, ownership, and dignity.</li>
                <li>Local participation connected to entrepreneurship pathways and training opportunities.</li>
                <li>Momentum carried forward into programmes like Saksham, Sankalp, and Nidhi.</li>
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
                Funding confidence,
                <br />
                <em>not just businesses</em>
              </h2>
              <p>
                For many women, capital is the difference between having an idea and having a livelihood. Nidhi bridges that gap with practical support designed for real grassroots constraints.
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
            <span className="section-label">Voices</span>
            <h2 className="section-title">
              What change
              <br />
              <em>feels like</em>
            </h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((item, index) => (
              <article key={item.name} className={`testi-card reveal reveal-delay-${Math.min(index, 2)}`}>
                <span className="qm">“</span>
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
              A team building
              <br />
              <em>grassroots momentum</em>
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
              <span className="section-label">Updates</span>
              <h2 className="section-title">
                News from the
                <br />
                <em>ground</em>
              </h2>
            </div>
            <a href="https://youthaidfoundation.org/blog/" className="btn-ghost-dark" target="_blank" rel="noreferrer">
              All News <span className="arr">→</span>
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
                A shared ecosystem of partners and donors helping women entrepreneurs grow with dignity, access, and long-term support.
              </p>
            </div>

            <div className="partners-content reveal reveal-delay-1">
              <div className="partners-network-header">
                <div>
                  <div className="partners-network-label">Partner Network</div>
                  <div className="partners-network-title">Community of supporters, donors, and field allies</div>
                </div>
                <div className="partners-network-meta">{partners.length}+ active relationships</div>
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
              Join the <em>movement</em>
            </h2>
            <p>There are many ways to contribute to a more equitable India. If you can provide expertise, skills, and inspiration to our supported entrepreneurs, reach out.</p>
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
                We inspire transformation by creating and training entrepreneurs. YouthAid builds a thriving grassroots entrepreneurship ecosystem across urban slums, rural areas, and tribal communities.
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
