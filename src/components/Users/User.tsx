import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import photo1 from '../../img/user1.png'
import styles from './user.module.css'
import { PhotosType } from '../../types/types'


const User = (props: {
  id: number, 
  //follow: (id: number) => void, 
  //unfollow: (id: number) => void, 
  toggle: (userId: number) => void,
  followingInProgress: Array<number>
  item: {photos: PhotosType, followed: boolean, name: string, status: string}
  }) => {
  return (
    <div key = {props.id} className={styles.userProfile}>
          <span>
            
            <div className={styles.leftBlock}>
              <NavLink to={'/profile/' + props.id}>
                <img src={props.item.photos.large !== null ? props.item.photos.large : photo1} className = {styles.userPhoto} alt='фото профиля'/>
              </NavLink>
            </div>
        

            <div className={styles.buttonDiv}>
              {props.item.followed 
                ? <button disabled={props.followingInProgress.some(id => id === props.id)}
                    onClick={ () => props.toggle(props.id)} > Unfollow </button> 

                : <button disabled={props.followingInProgress.some(id => id === props.id)}
                  onClick={ () => props.toggle(props.id)}> Follow </button>}                 
            </div>
            
            
          </span>

          <div className={styles.middleBlock}>
            <div className={styles.userName}> {props.item.name} </div>
            <div className={styles.userStatus}> {props.item.status} </div>
          </div>
      </div> 
  )
} 

export default memo(User)

/*
<div className={styles.rightBlock}>
  <div> {"item.location.city"}  </div>
  <div> {"item.location.country"} </div>  
</div>
*/