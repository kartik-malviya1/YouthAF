import { useEffect } from 'react'
import './home.css'
import Navbar from '../components/Navbar/Nav'
import { joinCards } from '../constant/constant';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal'

export default function JoinUs() {
  useEffect(() => {
    // replaced by useReveal
  }, [])
  useReveal()
  return (
    <div className="yaf-page">
      <Navbar />
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
      <Footer />
    </div>
  );
}
