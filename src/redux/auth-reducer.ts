import { ThunkAction, Dispatch } from "@reduxjs/toolkit"
import { authAPI, securityAPI } from "../api/api"
import { AppStateType } from "./redux-store"
import { ResultCodeEnum, ResultCodeCaptcha } from "../api/api"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA = 'auth/GET_CAPTCHA'

/* export type InitialStateType2 = {
  userId: number | null
  login: string | null
  email: string | null
  isAuth: boolean 
  captchaUrl: string | null
} */

let initialState = { 
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch(action.type) {

      case SET_USER_DATA:
      case GET_CAPTCHA:
        return {
          ...state,
          userId: 1231, //нужно заменить?
          ...action.payload
        }

        default:
          return state
    }
}
export default authReducer

type ActionTypes =  SetAuthUserDataActionType | GetCaptchaActionType

type SetAuthUserDataPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean 
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: SetAuthUserDataPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth} }) 

type GetCaptchaActionType = {
  type: typeof GET_CAPTCHA,
  payload: { captchaUrl: string }
}
export const getCaptchaActionCreator = (captchaUrl: string): GetCaptchaActionType => ({type: GET_CAPTCHA, payload:{captchaUrl} })

export const getAuthUserDataThunk = () => async (dispatch: Dispatch<ActionTypes>) => {
  let data = await authAPI.authMe()
  
    if(data.resultCode === ResultCodeEnum.Success) {
      let {id, email, login} = data.data
      dispatch(setAuthUserData(id, email, login, true))
    }
}

export const authThunk = (userId: number, email: string, login: string) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    authAPI.authMe()
      .then(data => {
        if(data.resultCode === ResultCodeEnum.Success) {
          let {id, email, login} = data.data
          dispatch(setAuthUserData(id, email, login, true))
        }
      })
  }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: any): ThunkAction<void, AppStateType, unknown, ActionTypes> => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha)
    .then(data => {
      if(data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserDataThunk())
      } else {
          dispatch(getCaptchaThunk()) // else if (data.resultCode === ResultCodeCaptcha.CaptchaRequired)
      }       
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        setStatus({error: message}) 
    })
  }
}

export const logoutThunk = () => async (dispatch: any) => {
 let data = await authAPI.logout()
    if(data.resultCode === ResultCodeEnum.Success) {
      dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaThunk = () => async(dispatch: any) => {
  let data = await securityAPI.getCaptcha()
  const captchaUrl = data.url

  dispatch(getCaptchaActionCreator(captchaUrl))
}