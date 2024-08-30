import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './redux/redux-store'
import { MainApp } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'))

let rerenderEntireTree = () => {
  root.render(
    <MainApp />
  )
}
rerenderEntireTree(store.getState())