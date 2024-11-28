import React from 'react'
import styles from './users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { UserType } from '../../types/types'

type PropsType = {
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  toggle: (userId: number) => void,
  total: number
  pageSize: number
  portionSize: number
  users: Array<UserType>
  followingInProgress: Array<number>
  // unfollow: (userId: number) => void
  // follow: (userId: number) => void
}

const Users: React.FC<PropsType> = (props) => {

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
          toggle= {props.toggle}
         // unfollow={props.unfollow}
         // follow={props.follow} 
         />
        )
      })
    }
    </div>
  )
}

export default Users