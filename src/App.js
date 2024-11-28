import React, { Suspense, lazy } from 'react'
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import {compose} from 'redux'

import './App.css'
import { withRouter } from './components/Profile/ProfileContainer'
import store from './redux/redux-store'
import { initializeAppThunk } from './redux/app-reducer.ts'
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'
import UsersContainer from './components/Users/UsersContainer'
import Login from './components/Login/Login'
import Settings from './components/Settings/Settings'
import Preloader from './components/common/Preloader/Preloader'
import NotFound from './components/common/404/404'

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer')) 
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {

  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.error(promiseRejectionEvent)
  }

  componentDidMount() {
    this.props.initializeAppThunk()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  } 

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader />
    } else {
      return (
      <div className='app-wrapper'>
        
        < HeaderContainer />
        < Navbar data = {this.props.appState.sidebar}  />

        <div className = 'app-wrapper-content'>
        <Suspense fallback={<Preloader/>}>
            <Routes>
            
              <Route path='/profile/:userId?' element = { <ProfileContainer /> } />
              <Route path='/dialogs/*' element = { <DialogsContainer /> } />
              <Route path='/users' element = { < UsersContainer /> } />

              <Route path='/login' element = { < Login />} />
              <Route path='/settings' element = { < Settings />} />
              
              <Route exact path='/' element = { <ProfileContainer /> } />
              <Route path='/*' element = { <NotFound /> } />
            </Routes>  
          </Suspense>
        </div> 
      </div>
    )}
  }
}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeAppThunk}))(App) 

export const MainApp = (props) => {
  return (
    <HashRouter>  
    <React.StrictMode>
      <Provider store = {store} >
        <AppContainer appState={ store.getState() } />
      </Provider>
    </React.StrictMode>
  </HashRouter>  
  )
}