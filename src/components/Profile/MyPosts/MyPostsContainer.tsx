import React from 'react'
import { connect } from 'react-redux'
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import { AppStateType } from '../../../redux/redux-store'

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText 
  }
}

let mapDispatchToProps = (dispatch: any) => {
  return {
    updateNewPostText: (text: string) => {
      dispatch(updateNewPostTextActionCreator(text))
    },
    addPost: (postText: string) => {
      dispatch(addPostActionCreator(postText))
    }
  }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer