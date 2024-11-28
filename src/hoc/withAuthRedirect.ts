import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { connect, ConnectedProps } from 'react-redux'
import { AppStateType } from '../redux/redux-store'

/* const useAuth = () => {
  return useSelector( (state: AppStateType) => state.auth.isAuth)
}

export function withAuthRedirect<T>(SomeComponent: React.ComponentType<T>) {
  const RedirectComponent: React.FC<T> = (props) => {
    const isAuth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if(!isAuth) {
        navigate('/login')
      }
    }, [isAuth, navigate])

    if(!isAuth) {
      return null
    }

    return <SomeComponent {...props} />
  }

  return RedirectComponent
}
 */




/*
let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
})

const connector = connect(mapStateToPropsForRedirect)
type ReduxProps = ConnectedProps<typeof connector>
type PropsType<T> = ReduxProps & T

export function withAuthRedirect<T> (Component: React.ComponentType<T>) {

  const RedirectComponent: React.FC<PropsType<T>> = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
      if(!props.isAuth) {
        navigate('/login')
      }
    }, [props.isAuth, navigate])

    if(!props.isAuth) {
      return null
    }

    const {isAuth, ...rest} = props
    return <Component {...(rest as T)} />
  }

  return connector(RedirectComponent)
}
*/


/*
export function withAuthRedirect<T> (Component: React.ComponentType<T>) {
  class RedirectComponent extends React.Component<PropsType> {

    render() {
      if(!this.props.isAuth) {
        return <Navigate to={'/login'} />
      }
      const { isAuth, ...rest} = this.props
      return <Component {...(rest as T)} />
    }
  }
  return connector(RedirectComponent)
}


let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
return ConnectedAuthRedirectComponent
*/