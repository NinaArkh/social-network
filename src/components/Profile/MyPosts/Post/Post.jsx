import React from 'react'
import Avatar from '../../../../img/avatar1.png'
import style from './Post.module.css'

const Post = (props) => {

  return (
    <div className= {style.item}>
      <div className={style.leftSection}>
        <img src={ Avatar } className={style.avatar} />

        <div>
          {props.likes} <span> likes </span> 
        </div>
      </div>

      <div className={style.postText}>
        {props.post} 
      </div>
    
    </div>
  )
}

export default Post

