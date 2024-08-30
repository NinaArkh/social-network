import { getAuthUserDataThunk } from "./auth-reducer"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = { 
  initialized: false,
  globalError: null
}

const appReducer = (state = initialState, action) => {
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

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeAppThunk = () => (dispatch) => {
  let promise = dispatch(getAuthUserDataThunk())
  Promise.all([promise])
  .then(() => {
    dispatch(initializedSuccess())
  })

}