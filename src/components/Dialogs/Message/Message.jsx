import React from 'react'
import style from '../Dialogs.module.css'

const Message = (props) => {
  return (
    <div className = {style.dialog}
    style={{
      marginTop: '10px',
      color: '#36454F'
    }} > 
      {props.message}
    </div>
  )
}

export default Message 