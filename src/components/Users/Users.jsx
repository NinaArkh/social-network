import React from 'react'
import styles from './users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

const Users = (props) => {

  return (
    <div className = {styles.usersPage}>

      <Paginator 
        currentPage={props.currentPage} 
        onPageChanged={props.onPageChanged} 
        total={props.total} 
        pageSize = {props.pageSize}
        portionSize = {props.portionSize} />

  {   
    props.users.map((item) => { 
      return (
        <User 
          item={item}
          key = {item.id}
          id = {item.id}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          follow={props.follow} />
        )
      })
    }
    </div>
  )
}

export default Users

 /*
                      props.toggleIsFollowingProgress(true, item.id)

                    usersAPI.setUnfollow(item.id)
                    .then(data => {
                      if(data.resultCode === 0) {
                          props.toggle(item.id)
                      }
                      props.toggleIsFollowingProgress(false, item.id)
                    })
                      */


/*
                    props.toggleIsFollowingProgress(true, item.id)

                    usersAPI.setFollow(item.id)
                    .then(data => {
                      if(data.resultCode === 0) {
                          props.toggle(item.id)
                      }
                      props.toggleIsFollowingProgress(false, item.id)
                    })
                      */