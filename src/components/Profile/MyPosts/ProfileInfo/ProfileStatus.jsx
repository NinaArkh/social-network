import React from 'react'
import style from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
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

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps, prevState) {
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