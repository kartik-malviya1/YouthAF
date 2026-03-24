import { useEffect } from "react";
import bg3 from "../assets/bg/vertical-bg.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Nav";
import { programs, yesFeatures } from "../constant/constant";
import useReveal from '../hooks/useReveal'

import yesummitimg from "../assets/progimg/yesummit.png";
import yessummit1 from "../assets/yessummit.png";

export default function WhatWeDo() {
  useReveal()
  useEffect(() => {
    // kept for parity with other pages if needed
    return () => {}
  }, [])
  return (
    <div className="yaf-page">
      <Navbar />
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
              <p>
                Our integrated approach covers every stage of entrepreneurial
                growth—training, capital access, market connections, and ongoing
                mentorship.
              </p>
            </div>
          </div>
          <div className="programs-grid">
            {programs.map((program) => (
              <article
                key={program.name}
                className={`prog-card reveal${program.wide ? " wide" : ""}`}
              >
                <div className={`prog-img${program.wide ? " tall" : ""}`}>
                  <img src={program.img} alt={program.name} />
                </div>
                <div className="prog-icon-pill">{program.pill}</div>
                <div className="prog-name">{program.name}</div>
                <p className="prog-desc">{program.desc}</p>
                <a
                  href={program.href}
                  className="prog-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more →
                </a>
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
                YESummit is where entrepreneurs showcase products, pitch
                business ideas, and build the confidence to scale beyond local
                markets. Our flagship annual event brings together hundreds of
                grassroots business owners for learning, visibility, and
                opportunity.
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
      <Footer />
    </div>
  );
}
