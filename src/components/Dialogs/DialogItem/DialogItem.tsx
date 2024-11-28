import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './DialogItem.module.css'

const DialogItem = ({id, avatar, name}: {id: number, avatar: string, name: string}) => {
  let path = `/dialogs/${ id }`
  
  return (
    <div className={style.dialogSection}>
      <NavLink to={path}> 
        <img src={ avatar } className={style.avatar} />
        { name } 
      </NavLink>
    </div>
  )
}

export default DialogItem