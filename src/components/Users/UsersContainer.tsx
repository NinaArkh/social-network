import React from 'react'
import Preloader from '../common/Preloader/Preloader'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions, getUsersThunkCreator } from '../../redux/users-reducer'
import Users from './Users'
import { getUsers, getPageSize, getCurrentPage, getTotalUsersCount, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors'
import {UserType} from '../../types/types'
import { AppStateType } from '../../redux/redux-store'

type PropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
  pageSize: number
  totalUsersCount: number 
  currentPage: number 
  isFetching: boolean
  users: Array<UserType>
  followingInProgress: Array<number>
  portionSize: number
}

const { toggleFollow, setTotalUsersCount, toggleIsFollowingProgress } = actions

type MapDispatchToPropsType = {
  getUsers: (pageSize: number, currentPage: number) => void
  toggleFollow: (userId: number) => void
  setTotalUsersCount: (totalCount: number) => void
  toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
}

//unfollow: (userId: number) => void
// follow: (userId: number) => void


class UsersAPIComponent extends React.Component<PropsType> {
  componentDidMount() {
    const { pageSize, currentPage } = this.props
    this.props.getUsers(pageSize, currentPage)
  }
    //    this.props.getUsers(this.props.pageSize, this.props.currentPage)

  onPageChanged = (pageNumber: number) =>{
    this.props.getUsers(this.props.pageSize, pageNumber)
  } 

  render() {
    return (
      <>
      {this.props.isFetching ? <Preloader /> : null}
        <Users 
           // key = {this.id}
            total = {this.props.totalUsersCount}
            pageSize = {this.props.pageSize}
            users = {this.props.users}
            portionSize = {this.props.portionSize}
            toggle = {this.props.toggleFollow}

           // follow = {this.props.follow}
           // unfollow = {this.props.unfollow}

            onPageChanged = {this.onPageChanged}
            currentPage = {this.props.currentPage}
            followingInProgress = {this.props.followingInProgress}
          />
      </>
    )
  }
}

const mapStateToProps = (state: AppStateType):
  MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    portionSize: 10
  }
}
const mapDispatchToProps: MapDispatchToPropsType = {
  getUsers: getUsersThunkCreator,
  //unfollow,
  //follow,
  toggleFollow, 
  setTotalUsersCount,
  toggleIsFollowingProgress
}

// usersPage берется из redux-store.js, так мы назвали результат функции в users-reduces.js
// usersPage.users - указано в usersReducer

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
)(UsersAPIComponent)

// {} - пустой объект для OwnProps, т.к. они отсутствуют


/*
export default withAuthRedirect(connect(mapStateToProps,  
  { toggleFollow, follow, unfollow, setTotalUsersCount, toggleIsFollowingProgress, getUsers: getUsersThunkCreator }
) (UsersAPIComponent))
*/

// toggleIsFollowingProgress = {this.props.toggleIsFollowingProgress}

// в connect() пары ключ-значения состоят из одинаковых названий, поэтому можно сократить toggleFollow: toggleFollow 
//const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)
// благодаря mapStateToProps и mapDispatchToProps в Storage отсылаются (dispatch) свойства и колбэки