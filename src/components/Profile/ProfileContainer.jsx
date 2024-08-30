import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useParams } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getProfileThunk, getStatusThunk, updateStatusThunk, savePhotoThunk, saveProfileThunk } from '../../redux/profile-reducer'
import Profile from './Profile'

export function withRouter(Children) {
  return(props) => {
    const match = {params: useParams()}
      return <Children {...props} match={match} />
  }
}

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId

    if(!userId) {
      userId = this.props.authorizedUserId
    } 
    
    this.props.getProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState) {
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
          updateStatus={this.props.updateStatus} 
          savePhoto={this.props.savePhoto}/> 
    )
  }
}

let mapStateToProps = (state) => {
  return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  })
}

export default compose(
  connect(mapStateToProps, { getProfile: getProfileThunk, getStatus: getStatusThunk, updateStatus: updateStatusThunk, savePhoto: savePhotoThunk, saveProfile: saveProfileThunk}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)