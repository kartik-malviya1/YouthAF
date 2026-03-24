import yesummitimg from '../assets/progimg/yesummit.png'
import aboutusimg from '../assets/aboutimg.jpg'
import yessummit1 from '../assets/yessummit.png'
import { useEffect } from 'react'
import './home.css'
import Navbar from '../components/Navbar/Nav'
import Footer from '../components/Footer'

export default function About() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal')
    items.forEach((it) => it.classList.add('visible'))
    return () => {
      items.forEach((it) => it.classList.remove('visible'))
    }
  }, [])
  return (
    <div className="yaf-page">
      <Navbar />
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-imgs reveal">
            <div className="about-img-big">
              <img src={aboutusimg} alt="Women in a training session" />
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
              <em>one enterprise at a time</em>
            </h2>
            <p>
              YouthAid Foundation empowers grassroots women from marginalized
              urban, rural, and tribal communities to start their own micro and
              small enterprises. Through hands-on training and consistent
              mentorship, our entrepreneurs achieve financial independence while
              breaking free from exploitative work cycles and rigid social
              constraints.
            </p>
            <p>
              As more women step into business ownership, we witness a powerful
              shift in patriarchal systems that once confined them to domestic
              roles. By professionalizing the unorganized sector, YouthAid
              enables individuals to become confident contributors to their
              families and the economy.
            </p>
            <div className="about-feature">
              <div className="af-title">From Worker to Owner</div>
              <p>
                Entrepreneur stories like Prema's show how business ownership
                transforms not just income, but identity, dignity, and freedom.
              </p>
            </div>
            <div className="btn-row">
              <a
                href="https://www.youtube.com/watch?v=8G-YoVnxgHU"
                className="btn-ghost-dark"
                target="_blank"
                rel="noreferrer"
              >
                Watch Video <span className="arr">▶</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </div>
  );
}