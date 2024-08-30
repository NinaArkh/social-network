import { createSelector } from 'reselect'

export const getUsersSelector = (state) => {
  return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter(user => true)
})

export const getPageSize = (state) => {
  return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
}
export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}
export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress
}

/* в более сложный селектор придет users - результат getUsers()
 createSelector может принимать результаты других сложных селекторов от других createSelector

export const getUsers = createSelector(getUsers, getIsFetching, (users, isFetching) => {
  return users.filter(user => true)
*/