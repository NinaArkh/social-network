import React from 'react'
import { useState, useEffect, useRef } from 'react'

const ProfileStatusWithHooks = (props) => {

  const [editMode, setEditMode]  = useState(false) 
  const [status, setStatus] = useState(props.status)
  const timer = useRef(null)

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  const onKeyEnter = (event) => {
    if(event.key === 'Enter') {
      deactivateEditMode()
    }
  }

  const handleTapStart = () => {
    timer.current = setTimeout(activateEditMode, 500)
  }
  const handleTapEnd = () => {
    if(timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  useEffect(() => {
    setStatus(props.status)
  }, [props.status]) 

  return (
    <> 
    {!editMode && 
      <div>
        <span 
          onDoubleClick={ activateEditMode }
          onTouchStart = {handleTapStart}
          onTouchEnd = {handleTapEnd}
          style={{
            fontStyle: 'italic',
            color: '#630330',
            marginLeft: '10px'
          }} > 
          {props.status || `You can set your status here`} 
        </span>
      </div>
    }

    {editMode && 
    <div>
      <input 
        onChange = {onStatusChange}
        autoFocus={true} 
        onBlur={ deactivateEditMode }  
        onKeyDown={onKeyEnter}
        value={status} /> 
    </div>
    }
  </>
  )
}
export default ProfileStatusWithHooks

