import React from 'react'
import Preloader from '../common/Preloader/Preloader'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { toggleFollow, follow, unfollow, setTotalUsersCount, toggleIsFollowingProgress, getUsersThunkCreator } from '../../redux/users-reducer'
import Users from './Users'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getUsers, getPageSize, getCurrentPage, getTotalUsersCount, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors'

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    const { pageSize, currentPage } = this.props
    this.props.getUsers(pageSize, currentPage)
  }
    //    this.props.getUsers(this.props.pageSize, this.props.currentPage)

  onPageChanged = (pageNumber) =>{
    this.props.getUsers(this.props.pageSize, pageNumber)
  } 

  render() {
    return (
      <>
      {this.props.isFetching ? <Preloader /> : null}
        <Users 
            key = {this.id}
            total = {this.props.totalUsersCount}
            pageSize = {this.props.pageSize}
            users = {this.props.users}
            toggle = {this.props.toggleFollow}

            follow = {this.props.follow}
            unfollow = {this.props.unfollow}

            onPageChanged = {this.onPageChanged}
            currentPage = {this.props.currentPage}
            followingInProgress = {this.props.followingInProgress}
          />
      </>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}



// usersPage берется из redux-store.js, так мы назвали результат функции в users-reduces.js
// usersPage.users - указано в usersReducer

export default compose(
  connect(mapStateToProps,  
    { toggleFollow, follow, unfollow, setTotalUsersCount, toggleIsFollowingProgress, getUsers: getUsersThunkCreator })
)(UsersAPIComponent)

/*
export default withAuthRedirect(connect(mapStateToProps,  
  { toggleFollow, follow, unfollow, setTotalUsersCount, toggleIsFollowingProgress, getUsers: getUsersThunkCreator }
) (UsersAPIComponent))
*/



// toggleIsFollowingProgress = {this.props.toggleIsFollowingProgress}

// в connect() пары ключ-значения состоят из одинаковых названий, поэтому можно сократить toggleFollow: toggleFollow 

//const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)

// export default UsersContainer

// благодаря mapStateToProps и mapDispatchToProps в Storage отсылаются (dispatch) свойства и колбэки\

/*

let mapDispatchToProps = (dispatch) => {
  return {
    toggleFollow: (userId) => {
      dispatch(toggleFollowActionCreator(userId))
    },
    setUsers: (users) => {
      dispatch(setUsersActionCreator(users))
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageActionCreator(pageNumber))
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountActionCreator(totalCount))
    },
    toggleIsFetching: (isFetching) => {
      dispatch(toggleIsFetchingActionCreator(isFetching))
    }
  }
}

*/