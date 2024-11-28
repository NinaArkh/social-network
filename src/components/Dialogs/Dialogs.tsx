import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {DialogType, MessageType } from '../../types/types'

type PropsType = {
  sendMessage: (message: string) => void
  dialogsPage: {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
  }
}
interface Values {
  message: string
}

const Dialogs: React.FC<PropsType> = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map(dialog => {
      return <DialogItem 
                key={dialog.id}
                name={dialog.name} 
                id ={dialog.id} 
                avatar = {dialog.img} 
              />
    }
  )

  let messagesElements = props.dialogsPage.messages.map(item => {
      return <Message key={item.id} message={item.message} />
    }
  )

  let onSendMessageClick = (values: Values, {resetForm} : {resetForm: Function}) => {
    props.sendMessage(values.message)
    resetForm()
  }

  return (
    <div className= {style.dialogs}>
      <div className={style.dialogsItems}>
        { dialogsElements }
      </div>

      <div className={style.messages}>
        <div> {messagesElements} 

          
        <Formik
          initialValues={{ message: ''}}
          validate={values => {
            const errors: { message?: string } = {}
            
            if(!values.message) {
              errors.message = "Empty message"
            }
            return errors
          }}
          onSubmit = {onSendMessageClick}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({
            values, 
            errors, 
            handleSubmit,
            handleChange
          }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <Field 
                  type='text'
                  name='message'
                  className={style.texting} 
                  placeholder="Enter your message"
                  autocomplete='off'
                  onChange={handleChange}
                  value={values.message}
                />
                <ErrorMessage 
                  className={style.errorMessage}
                  name='message' component='div' />
              </div>

              <div> 
              <button type='submit'> Send message </button> 
            </div>
          </Form>
        )
        } 
      </Formik>
    </div>
  </div>          
  </div>
  )
}

export default Dialogs