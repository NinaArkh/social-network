import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../img/Tucans.png'
import style from './Header.module.css'

const Header = (props) => {
  const navigate = useNavigate()
  function handleClick() {
    navigate('/profile')
  }

  return (
    <header className= {style.topSection} >
      <div className={style.logoTitleWrapper}>
        <img className= {style.logo} src={ Logo } />
        <h4 className= {style.title} > Lonely Island: new dating social media </h4>
      </div>

        <div className={style.loginBlock}>
          {props.isAuth 
          ? <div>
              <span className={style.nickname} onClick={handleClick}> {props.login} </span> 
              <button className={style.logoutButton} onClick={props.logout}> Log out </button> 
            </div>
          :
          <NavLink to={'/login'} className={style.loginButton}>
            Log in
          </NavLink>
          }                   
        </div>
    </header>
  )
}

export default Header
