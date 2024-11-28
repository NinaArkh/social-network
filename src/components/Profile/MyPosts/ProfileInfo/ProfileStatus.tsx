import React, { ChangeEvent } from 'react'
import style from './ProfileStatus.module.css'

type PropsType = {
  status: string
  updateStatus: (status: string) => void
}
type StateType = {
  editMode: boolean
  status: string
}


class ProfileStatus extends React.Component<PropsType, StateType> {
  state ={
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState( {
      editMode: true
    })
  }
  deactivateEditMode() {
    this.setState({
      editMode: false
    })
    this.props.updateStatus(this.state.status)
  }
  
  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if(prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }
  

  render() {
    return (
      <> 
        {!this.state.editMode && 
          <div>
            <span onDoubleClick={ this.activateEditMode } className={style.status}> 
              {this.props.status || `You can set your status here`} 
            </span>
          </div>
        }

        {this.state.editMode && 
        <div>
          <input 
            onChange = {this.onStatusChange}
            autoFocus={true} 
            onBlur={ this.deactivateEditMode.bind(this)}  
            value={this.state.status} /> 
        </div>
        }
      </>
    )
  }
}

export default ProfileStatus