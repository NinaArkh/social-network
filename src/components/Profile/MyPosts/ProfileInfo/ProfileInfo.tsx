import React, {BaseSyntheticEvent, ChangeEvent, useState} from 'react'
import style from './ProfileInfo.module.css'
import defaultAvatar from '../../../../img/dialogs-ava4.png'
import Preloader from '../../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props: { profile: any, status: string, updateStatus: any, savePhoto: any, isOwner: boolean, saveProfile: any }) => {

  if(!props.profile) {
    return <Preloader />
  } 

  const onAvatarSelected =(event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files !== null && event.target.files.length) {
      props.savePhoto(event.target.files[0])
    }
  }

  return (
    <div>
        <div className={style.descriptionBlock}>

          <img src={props.profile.photos.large || defaultAvatar} 
            className={style.profilePhoto} alt='Profile avatar' />

           {props.isOwner && 
           <>
            <button className={style.editButton}>  
              <label htmlFor='pic' className={style.labelField}> Edit avatar </label>
            </button>

            <input id='pic' className={style.inputField} type='file' onChange={onAvatarSelected} /> 
          </>
          }                   
        </div>

        <div className={style.statusSection}>
          
          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
          <p className={ style.fullName}> My nickname is <span className={style.nickname}> {props.profile.fullName}  </span></p>
          <p> {props.profile.aboutMe} </p>
      </div>

    </div>
  )
}
export default ProfileInfo
//status={status} 