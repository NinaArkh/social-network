import { Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { usersAPI } from "../api/api"
import { UserType } from '../types/types'
import { AppStateType } from "./redux-store"
import { InferActionTypes } from "./redux-store"

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 200,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number> 
}
// в функции reducer указано, что при действии toggle_is_fetching должен прийти массив с userId

type InitialState = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialState => {
  switch(action.type) {
    case 'TOGGLE_FOLLOW': 
      return {
        ...state,
        users: state.users.map(item => {
          if(item.id === action.userId) {
            return { ...item, followed: !item.followed }
          }
          return item
        })
      }
      case 'SET_USERS':
        return { ...state, users: action.users}

      case 'SET_CURRENT_PAGE':
        return {...state, currentPage: action.currentPage} 
        
      case 'SET_TOTAL_USERS_COUNT':   
        return {...state, totalUsersCount: action.count}

      case 'TOGGLE_IS_FETCHING':
        return {...state, isFetching: action.isFetching}  

      case 'TOGGLE_IS_FOLLOWING_PROGRESS':
        return {...state, 
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId ]
                : state.followingInProgress.filter(id => id !== action.userId) 
        }

      default:
        return state  
  }

}
export default usersReducer


export const actions = {
  toggleFollow: (userId: number) => ({type: 'TOGGLE_FOLLOW', userId} as const),
  setUsers:(users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage} as const),
  setTotalUsersCount: (totalUsersCount: number) =>  ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

//type ActionTypes = ToggleFollowType | SetUsersType| SetCurrentPageType| SetTotalUsersCountType | ToggleIsFetchingType | ToggleIsFollowingProgressType

/* type ToggleFollowType = {
  type: typeof TOGGLE_FOLLOW
  userId: number
}
export const toggleFollow = (userId: number): ToggleFollowType => ( {type: TOGGLE_FOLLOW, userId } )

type SetUsersType= {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ( {type: SET_USERS, users} )

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage })

type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT
  count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => {
  return { type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}
}

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ( { type: TOGGLE_IS_FETCHING, isFetching } )

type ToggleIsFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})
 */

type ActionTypes = InferActionTypes<typeof actions>

type GetStateType = () => AppStateType
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const getUsersThunkCreator = (pageSize: number, currentPage: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))

  const data = await usersAPI.getUsers(pageSize, currentPage)
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    //dispatch(setTotalUsersCount(data.totalCount))
}

const followUnfollowDuck = async(dispatch: Dispatch<ActionTypes>, userId: number, apimethod: any) => {
  dispatch(actions.toggleIsFollowingProgress(true, userId))

  let data = await apimethod(userId)
  if(data.resultCode === 0) {
    dispatch(actions.toggleFollow(userId))
  }
  dispatch(actions.toggleIsFollowingProgress(false, userId))
}


export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    const apimethod = usersAPI.setFollow.bind(usersAPI)
    followUnfollowDuck(dispatch, userId, apimethod)
  }
}
//follow-unfollow - это thunk-функции


export const unfollow = (userId: number) => async (dispatch: Dispatch<ActionTypes>) => {
  let apimethod = usersAPI.setUnfollow.bind(usersAPI)
  followUnfollowDuck(dispatch, userId, apimethod)
}
