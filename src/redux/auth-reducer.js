import { authAPI, securityAPI } from "../api/api"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA = 'auth/GET_CAPTCHA'

let initialState = { 
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {

      case SET_USER_DATA:
      case GET_CAPTCHA:
        return {
          ...state,
          ...action.payload
        }

        default:
          return state
    }
}
export default authReducer

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth} })
export const getCaptchaActionCreator = (captchaUrl) => ({type: GET_CAPTCHA, payload:{captchaUrl} })

export const getAuthUserDataThunk = () => async (dispatch) => {
  let data = await authAPI.authMe()
    if(data.resultCode === 0) {
      let {id, email, login} = data.data
      dispatch(setAuthUserData(id, email, login, true))
    }
}

export const authThunk = (userId, email, login) => {
  return (dispatch) => {
    authAPI.authMe()
      .then(data => {
        if(data.resultCode === 0) {
          let {id, email, login} = data.data
          dispatch(setAuthUserData(id, email, login, true))
        }
      })
  }
}

export const loginThunk = (email, password, rememberMe, captcha, setStatus) => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha)
    .then(data => {
      if(data.resultCode === 0) {
        dispatch(getAuthUserDataThunk())
      }
      else {
        if(data.resultCode === 10) {
          dispatch(getCaptchaThunk())
        }

        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        setStatus({error: message})
      } 
    })
  }
}

export const logoutThunk = () => async (dispatch) => {
 let data = await authAPI.logout()
    if(data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaThunk = () => async(dispatch) => {
  let data = await securityAPI.getCaptcha()
  const captchaUrl = data.url

  dispatch(getCaptchaActionCreator(captchaUrl))
}