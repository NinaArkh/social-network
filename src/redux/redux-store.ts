import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension';
import { UnknownAction } from '@reduxjs/toolkit';
import { thunk as thunkMiddleWare } from 'redux-thunk'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import appReducer from './app-reducer'
import { buildGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

export type AppStateType = ReturnType<typeof store.getState>

const rootReducer = {
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer
}
const store = configureStore({
  //@ts-ignore
  reducer: rootReducer,
  //@ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleWare),
  //@ts-ignore
  devTools: composeWithDevTools() // true
})

if(typeof window !== 'undefined') {
  (window as any).store = store
}

export type AppDispatch = typeof store.dispatch
export default store

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>


/* 
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
applyMiddleware(thunkMiddleWare)) */

// window.store = store

