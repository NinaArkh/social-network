import { ThunkAction } from "@reduxjs/toolkit"
import { getAuthUserDataThunk } from "./auth-reducer"
import { AppStateType } from "./redux-store"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = { 
  initialized: false
 // globalError: null
}


const appReducer = (state: InitialStateType = initialState, action: InitializedSuccessActionType): InitialStateType => {
    switch(action.type) {
      case INITIALIZED_SUCCESS:
        return {
          ...state,
          initialized: true
        }

      default:
        return state
    }
}
export default appReducer

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeAppThunk = (): ThunkAction<void, AppStateType, unknown, InitializedSuccessActionType> => (dispatch) => {
  let promise = dispatch(getAuthUserDataThunk())
  Promise.all([promise])
  .then(() => {
    dispatch(initializedSuccess())
  })

}