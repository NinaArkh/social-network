import { Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { profileAPI } from "../api/api"
import { ProfileType, PostType, PhotosType } from '../types/types'
import { AppStateType } from "./redux-store"
import { ResultCodeEnum } from "../api/api"

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
  ] as Array<PostType>,
  newPostText: '',
  profile: null as ProfileType | null,
  status: ''
}
export type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {

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
      profile: state.profile 
        ? {...state.profile, photos: action.photos} 
        : null
    }
  }
  else if(action.type === SAVE_PROFILE) {
    return {
      ...state,
      profile: state.profile 
        ? {...state.profile, photos: action.photos}
        : null // если state.profile === null, то profile также null
    }
  }
  return state
}
export default profileReducer

type ActionTypes = UpdateNewPostActionType | AddPostActionType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType | SavePhotoActionType | SaveProfileActionType
type DispatchType = Dispatch<ActionTypes>

type UpdateNewPostActionType = {
  type: typeof UPDATE_NEW_POST_TEXT
  newText: string
}

export const updateNewPostTextActionCreator = (text: string) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text
  }
}

type AddPostActionType = {
  type: typeof ADD_POST
  postText: string
}
export const addPostActionCreator = (text: string): AddPostActionType => {
  return { 
    type: ADD_POST, 
    postText: text
  }
}

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatusActionCreator = (status: string): SetStatusActionType => ({type: SET_STATUS, status})

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePostActionCreator = (postId: number): DeletePostActionType => ({type: DELETE_POST , postId})

type SavePhotoActionType = {
  type: typeof SAVE_PHOTO
  photos: PhotosType
}
export const savePhotoActionCreator = (photos: PhotosType): SavePhotoActionType => ({type: SAVE_PHOTO, photos})

type SaveProfileActionType = {
  type: typeof SAVE_PROFILE
  photos: PhotosType
}
export const saveProfileActionCreator = (photos: PhotosType): SaveProfileActionType => ({type: SAVE_PROFILE, photos})

export const getProfileThunk = (profile: number) => {
  return async (dispatch: DispatchType) => {
    const data = await profileAPI.getProfile(profile)
    dispatch(setUserProfile(data))  
  }
}

export const getStatusThunk = (status: number) => async (dispatch: DispatchType) => {
  let data = await profileAPI.getStatus(status)
  dispatch(setStatusActionCreator(data))
}
// status: number, т.к. в запросе к API передается userId

export const updateStatusThunk = (status: string) => async (dispatch: DispatchType) => {
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

export const savePhotoThunk = (file: any) => async(dispatch: DispatchType) => {
  let data = await profileAPI.savePhoto(file)
  
  if(data.resultCode === ResultCodeEnum.Success) {
    dispatch(savePhotoActionCreator(data.data.photos))
  }
} 

export const saveProfileThunk = (profile: ProfileType): ThunkAction<void, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let data = await profileAPI.saveProfile(profile)
  
  if(data.resultCode === ResultCodeEnum.Success) {
    dispatch(saveProfileActionCreator(data.data.photos))
  }
}
