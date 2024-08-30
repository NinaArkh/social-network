import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension';

import { thunk as thunkMiddleWare } from 'redux-thunk'
import profileReducer from '../redux/profile-reducer'
import dialogsReducer from '../redux/dialogs-reducer'
import sidebarReducer from '../redux/sidebar-reducer'
import usersReducer from '../redux/users-reducer'
import authReducer from './auth-reducer'
import appReducer from './app-reducer'


let store = configureStore({
  reducer: {
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
  }
}, composeWithDevTools,
applyMiddleware(thunkMiddleWare))

window.store = store

export default store
