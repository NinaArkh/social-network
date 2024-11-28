import React from 'react'
import style from '../Dialogs.module.css'

const Message = ({ message }: { message: string }) => {
  return (
    <div className = {style.dialog}
    style={{
      marginTop: '10px',
      color: '#36454F'
    }} > 
      { message }
    </div>
  )
}

export default Message 