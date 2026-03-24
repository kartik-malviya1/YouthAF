import { useEffect } from 'react'
import useReveal from '../hooks/useReveal'

export default function Footer() {
  useEffect(() => {
    // legacy behavior retained in useReveal
  }, [])
  useReveal()
  return (
    <div className="yaf-page">
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
                <li><a href="#">Saksham</a></li>
                <li><a href="#">Sankalp</a></li>
                <li><a href="#">Sphoorti</a></li>
                <li><a href="#">Nidhi</a></li>
                <li><a href="#">YESummit</a></li>
                <li><a href="#">Udyamita Yatra</a></li>
              </ul>
            </div>
            <div>
              <div className="fc-title">Quick Links</div>
              <ul className="fc-links">
                <li><a href="/about">About YAF</a></li>
                <li><a href="#/team" target="_blank" rel="noreferrer">Our Team</a></li>
                <li><a href="/blogs">Blogs & Vlogs</a></li>
                <li><a href="/blog">News & Updates</a></li>
                <li><a href="https://youthaidfoundation.org/policies/">Policies</a></li>
                <li><a href="https://youthaidfoundation.org/volunteer/">Volunteer</a></li>
                <li><a href="https://youthaidfoundation.org/csr-partnership/">CSR Partnership</a></li>
                <li><a href="https://youthaidfoundation.org/job-openings/">Careers</a></li>
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
  );
}
