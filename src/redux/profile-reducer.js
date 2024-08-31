import { profileAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO = 'SAVE_PHOTO'
const SAVE_PROFILE = 'SAVE_PROFILE'


let initialState = {
  posts: [
    {id: 1, post: 'This is my first post', likesCount: 15},
    {id: 2, post: 'This is my second post', likesCount: 20}
  ],
  newPostText: '',
  profile: null,
  status: ''
}

export const profileReducer = (state = initialState, action) => {

  if(action.type === UPDATE_NEW_POST_TEXT) {
    return {
      ...state,
      newPostText: action.newText
    }
  } 
  
  else if(action.type === ADD_POST) {
    let newPost = {
      id: state.posts.length + 1,
      post: action.postText, 
      likesCount: 0
    }

    return {
      ...state,
      posts: [...state.posts, newPost]
    }
  } 
  
  else if(action.type === SET_USER_PROFILE) {
    return {
      ...state, 
      profile: action.profile
    }   
  }

  else if(action.type === SET_STATUS) {
    return {
      ...state,
      status: action.status
    }
  }
  else if(action.type === DELETE_POST) {
    return {
      ...state,
      posts: state.posts.filter(post => post.id !== action.postId)
    }
  }
  else if(action.type === SAVE_PHOTO) {
    return {
      ...state,
      profile: {...state.profile, photos: action.photos}
    }
  }
  else if(action.type === SAVE_PROFILE) {
    return {
      ...state,
      profile: {...state.profile, photos: action.photos}
    }
  }
  return state
}
export default profileReducer

export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text
  }
}

export const addPostActionCreator = (text) => {
  return { 
    type: ADD_POST, 
    postText: text
  }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatusActionCreator = (status) => ({type: SET_STATUS, status})
export const deletePostActionCreator = (postId) => ({type: DELETE_POST , postId})
export const savePhotoActionCreator = (photos) => ({type: SAVE_PHOTO, photos})
export const saveProfileActionCreator = (info) => ({type: SAVE_PROFILE, info})

export const getProfileThunk = (profile) => {
  return async (dispatch) => {
    const data = await profileAPI.getProfile(profile)
    dispatch(setUserProfile(data))  
  }
}

export const getStatusThunk = (status) => async (dispatch) => {
  let data = await profileAPI.getStatus(status)
  dispatch(setStatusActionCreator(data))
}

export const updateStatusThunk = (status) => async (dispatch) => {
  try {
    const data = await profileAPI.updateStatus(status)
    if(data.resultCode === 0) {
      dispatch(setStatusActionCreator(status))
    }
  }
  catch(error) {
    console.error('failed to update status', error)
  }
}

export const savePhotoThunk = (file) => async(dispatch) => {
  let data = await profileAPI.savePhoto(file)
  
  if(data.resultCode === 0) {
    dispatch(savePhotoActionCreator(data.data.photos))
  }
} 

export const saveProfileThunk = (profile) => async (dispatch) => {
  let data = await profileAPI.saveProfile(profile)
  
  if(data.resultCode === 0) {
    dispatch(saveProfileActionCreator(data.data.photos))
  }
}