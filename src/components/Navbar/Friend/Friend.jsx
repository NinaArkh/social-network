import React from 'react'
import style from './Friend.module.css'

const Friend = (props) => {
  return (
    <div className={style.friend}>
      <img src={props.avatar} className={style.avatar} />
    {props.name}
    </div>
  )
}

export default Friend