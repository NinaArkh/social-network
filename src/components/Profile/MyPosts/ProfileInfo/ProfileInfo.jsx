import React, {useState} from 'react'
import style from './ProfileInfo.module.css'
import defaultAvatar from '../../../../img/dialogs-ava4.png'
import Preloader from '../../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = ({ profile, status, updateStatus, savePhoto, isOwner }) => {

  if(!profile) {
    return <Preloader />
  } 

  const onAvatarSelected =(event) => {
    if(event.target.files.length) {
      savePhoto(event.target.files[0])
    }
  }

  return (
    <div>
        <div className={style.descriptionBlock}>

          <img src={profile.photos.large || defaultAvatar} 
            className={style.profilePhoto} alt='Profile avatar' />

           {isOwner && 
           <>
            <button className={style.editButton}>  
              <label for='pic' className={style.labelField}> Edit avatar </label>
            </button>

            <input id='pic' className={style.inputField} type='file' onChange={onAvatarSelected} /> 
          </>
          }                   
        </div>

        <div className={style.statusSection}>
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
          <p className={ style.fullName}> My nickname is <span className={style.nickname}> {profile.fullName}  </span></p>
          <p> {profile.aboutMe} </p>
      </div>

    </div>
  )
}
export default ProfileInfo