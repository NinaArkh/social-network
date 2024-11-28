import React from 'react'
import ProfileInfo from './MyPosts/ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import style from './Profile.module.css'

const Profile = (props: {isOwner: boolean, savePhoto: any, saveProfile: any, profile: any, status: string, updateStatus: any, store: any}) => {

  return (
    <div className={style.profileSection}>
      < ProfileInfo 
        isOwner={props.isOwner} 
        savePhoto={props.savePhoto} 
        saveProfile={props.saveProfile}
        profile={props.profile} 
        status={props.status} 
        updateStatus={props.updateStatus} />
      < MyPostsContainer store = {props.store} />
    </div>
  )
}

export default Profile