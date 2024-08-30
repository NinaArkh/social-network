import { usersAPI } from "../api/api"

const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 200,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_FOLLOW: 
      return {
        ...state,
        users: state.users.map(item => {
          if(item.id === action.userId) {
            return { ...item, followed: !item.followed }
          }
          return item
        })
      }
      case SET_USERS:
        return { ...state, users: action.users}

      case SET_CURRENT_PAGE:
        return {...state, currentPage: action.currentPage} 
        
      case SET_TOTAL_USERS_COUNT:   
        return {...state, totalUsersCount: action.count}

      case TOGGLE_IS_FETCHING:
        return {...state, isFetching: action.isFetching}  

      case TOGGLE_IS_FOLLOWING_PROGRESS:
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


export const toggleFollow = (userId) => ( {type: TOGGLE_FOLLOW, userId } )
export const setUsers = (users) => ( {type: SET_USERS, users} )

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => {
  return { type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}
}
export const toggleIsFetching = (isFetching) => ( { type: TOGGLE_IS_FETCHING, isFetching } )
export const toggleIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})


export const getUsersThunkCreator = (pageSize, currentPage) => async (dispatch) => {
    dispatch(toggleIsFetching(true))

  const data = await usersAPI.getUsers(pageSize, currentPage)
    dispatch(setCurrentPage(currentPage))
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    //dispatch(setTotalUsersCount(data.totalCount))
}

const followUnfollowDuck = async(dispatch, userId, apimethod) => {
  dispatch(toggleIsFollowingProgress(true, userId))

  let data = await apimethod(userId)
  if(data.resultCode === 0) {
    dispatch(toggleFollow(userId))
  }
  dispatch(toggleIsFollowingProgress(false, userId))
}


export const follow = (userId) => {
  return async (dispatch) => {
    const apimethod = usersAPI.setFollow.bind(usersAPI)
    followUnfollowDuck(dispatch, userId, apimethod)
  }
}
//follow-unfollow - это thunk-функции


export const unfollow = (userId) => async (dispatch) => {
  let apimethod = usersAPI.setUnfollow.bind(usersAPI)
  followUnfollowDuck(dispatch, userId, apimethod)
}
