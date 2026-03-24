import { NavLink, Link } from 'react-router-dom'
import logo from '../../assets/logos/logo.png'
import DropDownMenu from '../ui/DropDownMenu'

export default function Navbar() {
  
  return (
    <nav className="yaf-nav">
      <Link className="nav-logo" to="/">
        <div className="nav-logo-icon">
          <img src={logo} alt="YAF logo" />
        </div>
        <div className="nav-logo-text">
          <div className="top">
            YOUTH<span>Aid</span> Foundation
          </div>
          <div className="tagline mt-1">Igniting Grassroots Potential</div>
        </div>
      </Link>

      <ul className="nav-links -translate-x-8">
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/programs" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Programs
          </NavLink>
        </li>
        <li>
          <a href="#stories">Stories</a>
        </li>
        <li>
          {/* <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)}> */}
            <a href="/#team ">Team</a>
          {/* </NavLink> */}
        </li>
        <li className='border-0'>
          {/* <NavLink to="/media" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Media
          </NavLink> */}
          <DropDownMenu />
        </li>
        <li>
          <NavLink to="/joinus" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Join Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Contact
          </NavLink>
        </li>
      </ul>

      <a href="/donate" className="nav-cta" target="_blank" rel="noreferrer">
        Donate Now
      </a>
    </nav>
  )
}
