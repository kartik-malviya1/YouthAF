import logo from '../../assets/logos/logo.png'

export default function Navbar() {
  return (
    <nav className="yaf-nav">
      <a className="nav-logo" href="#home">
        <div className="nav-logo-icon">
          <img src={logo} alt="YAF logo" />
        </div>
        <div className="nav-logo-text">
          <div className="top">
            YOUTH<span>Aid</span> Foundation
          </div>
          <div className="tagline mt-1">Igniting Grassroots Potential</div>
        </div>
      </a>

      <ul className="nav-links -translate-x-8">
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#programs">Programs</a>
        </li>
        <li>
          <a href="#stories">Stories</a>
        </li>
        <li>
          <a href="#team">Team</a>
        </li>
        <li>
          <a href="#news">News</a>
        </li>
        <li>
          <a href="#joinus">Join Us</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <a href="/donate" className="nav-cta" target="_blank" rel="noreferrer">
        Donate Now
      </a>
    </nav>
  )
}
