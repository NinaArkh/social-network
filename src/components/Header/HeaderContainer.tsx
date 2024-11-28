import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import { logoutThunk } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'

type MapStateToPropsType = {
  isAuth: boolean
  login: string | null
}
type MapDispatchToPropsType = {
  logout: () => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType


class HeaderContainer extends React.Component<PropsType>{
  render() {
    return  < Header {...this.props} />
    } 
}

const mapStateToProps = (state: AppStateType ) => {
  return {
    isAuth: state.auth.isAuth, 
    login: state.auth.login
  }
}

export default connect(mapStateToProps, {logout: logoutThunk})(HeaderContainer)