import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendMessageCreator } from '../../redux/dialogs-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import Dialogs from './Dialogs'

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    newMessageBody: state.dialogsPage.newMessageBody
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)