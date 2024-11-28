import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useParams } from 'react-router-dom'
import { getProfileThunk, getStatusThunk, updateStatusThunk, savePhotoThunk, saveProfileThunk } from '../../redux/profile-reducer'
import Profile from './Profile'
import { AppStateType } from '../../redux/redux-store'

type MatchParams = {
  userId: string   // из URL приходит строка
}

export function withRouter<T>(Component: React.ComponentType<T>) {
  return(props: T) => {
    const match = {params: useParams<MatchParams>()}
      return <Component {...props as T} match={match} />
  }
}
//(Children) return <Children >

type PropsType = {
  getProfile: (userId: number) => void
  getStatus: (userId: number) => void
  isOwner: boolean
  match: { params: MatchParams }
  profile: any
  status: string
  store: any
  saveProfile: any
  updateStatus: any 
  savePhoto: any
}
type StateType = {

}

class ProfileContainer extends React.Component<PropsType, StateType> {

  refreshProfile() {
    let userId = this.props.match.params.userId

   /*  if(!userId) {
      userId = this.props.authorizedUserId
    } */
      if(!userId) {
        userId = '31456'
      } 
    
    this.props.getProfile(parseInt(userId))
    this.props.getStatus(parseInt(userId))
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if(this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return (
        <Profile {...this.props}
          isOwner = {!this.props.match.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          store={this.props.store}
          saveProfile={this.props.saveProfile}
          updateStatus={this.props.updateStatus} 
          savePhoto={this.props.savePhoto}/> 
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  })
}

export default compose(
  connect(mapStateToProps, { getProfile: getProfileThunk, getStatus: getStatusThunk, updateStatus: updateStatusThunk, savePhoto: savePhotoThunk, saveProfile: saveProfileThunk}),
  withRouter
  //withAuthRedirect
)(ProfileContainer)