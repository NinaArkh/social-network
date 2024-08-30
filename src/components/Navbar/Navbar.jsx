import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import style from './Navbar.module.css'
import Hamburger from '../../img/icon-hamburger.svg'
import Friend from './Friend/Friend'

const Navbar = (props) => {
  let friendsElements = props.data.friends.map(item => {
    return <Friend key = {item.id} name = {item.name} id = {item.id} avatar = {item.img} />
  })

  const navItems = [
    {to: '/profile', label: 'Profile'},
    {to: '/dialogs', label: 'Messages'},
    {to: '/users', label: 'Users'},
    {to: '/settings', label: 'Settings'}
  ]
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <> 
    <img src={Hamburger} alt='Hamburger menu' className={style.hamburger} onClick={toggleMenu} />

    <nav className= { cn(style.nav, {[style.open]: menuOpen}) } >
      {navItems.map(item => (
        <div key={item.to} className={style.itemLink}>
          <NavLink to={item.to}
            className={ ({ isActive }) => cn(style.itemLink, { [style.active]: isActive })}
            onClick={closeMenu} >
              {item.label}
          </NavLink>
        </div>
      ))}

      <div className={style.friendsSection}>
        <h3 className = {style.friendsTitle}>  FRIENDS </h3>
        <div className={style.friends}>
          { friendsElements }
        </div>
      </div>
  </nav>
  </>
  )
}

export default Navbar