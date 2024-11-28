import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendMessageCreator } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { AppStateType } from '../../redux/redux-store'

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
    newMessageBody: state.dialogsPage.newMessageBody
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: (newMessageBody: string) => {
      dispatch(sendMessageCreator(newMessageBody))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
 // withAuthRedirect
)(Dialogs)