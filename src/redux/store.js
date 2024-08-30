import ava1 from '../img/friends-ava1.png'
import ava2 from '../img/friends-ava2.jpg'
import ava3 from '../img/friends-ava3.png'

import dialogsAva1 from '../img/dialogs-ava1.png'
import dialogsAva2 from '../img/dialogs-ava2.png'
import dialogsAva3 from '../img/dialogs-ava3.png'
import dialogsAva4 from '../img/dialogs-ava4.png'
import dialogsAva5 from '../img/dialogs-ava5.png'
import dialogsAva6 from '../img/dialogs-ava6.png'

import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer'
import dialogsReducer from './dialogs-reducer'


let store = {
  _state: {
      profilePage:{
        posts: [
          {id: 1, message: 'Hey there!', likesCount: 15},
          {id: 2, message: 'This is my first post', likesCount: 20}
        ],
        newPostText: ''
      },
    
      dialogsPage: {
        dialogs: [
          {id: 1, name: 'Dima', img: dialogsAva1},
          {id: 2, name: 'Andrey', img: dialogsAva2},
          {id: 3, name: 'Sveta', img: dialogsAva3}, 
          {id: 4, name: 'Sasha', img: dialogsAva4},
          {id: 5, name: 'Victor', img: dialogsAva5},
          {id: 6, name: 'Valera', img: dialogsAva6}
        ],
        messages: [
          {id: 1, message: 'Hi'},
          {id: 2, message: "How's your day?"},
          {id: 3, message: 'Yo'},
          {id: 4, message: 'Yo'},
          {id: 5, message: 'Yo'}
        ],
        newMessageBody: '' 
      },
      sidebar: {
        friends: [
          {id: 1, name: 'Sasha', img: ava1 },
          {id: 2, name: 'Sveta', img: ava2 },
          {id: 3, name: 'Monica', img: ava3 }
        ]
      }
  },
  _callSubscriber() {
    console.log('state changed')
  },
  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar)

    this._callSubscriber(this._state)  
  }  

}
window.store = store

export default store


 
// изначально newText передавался в качестве аргумента функции updateNewPostText(newText)
// теперь же нужно ссылаться на свойство объека action, т.к. именно action мы передаем в dispatch



/*
let rerenderEntireTree = () => {
  console.log('state changed')
}

let state = {
  profilePage:{
    posts: [
      {id: 1, message: 'Hey there!', likesCount: 15},
      {id: 2, message: 'This is my first post', likesCount: 20}
    ],
    newPostText: ''
  },

  dialogsPage: {
    dialogs: [
      {id: 1, name: 'Dima', img: dialogsAva1},
      {id: 2, name: 'Andrey', img: dialogsAva2},
      {id: 3, name: 'Sveta', img: dialogsAva3}, 
      {id: 4, name: 'Sasha', img: dialogsAva4},
      {id: 5, name: 'Victor', img: dialogsAva5},
      {id: 6, name: 'Valera', img: dialogsAva6}
    ],
    messages: [
      {id: 1, message: 'Hi'},
      {id: 2, message: "How's your day?"},
      {id: 3, message: 'Yo'},
      {id: 4, message: 'Yo'},
      {id: 5, message: 'Yo'},
      {id: 6, message: 'sdfsdf'},
    ]
  },
  sidebar: {
    friends: [
      {id: 1, name: 'Sasha', img: ava1 },
      {id: 2, name: 'Sveta', img: ava2 },
      {id: 3, name: 'Monica', img: ava3 }
    ]
  }
}


export const addPost = (postMessage) => {
  let newPost = {
    id: 5,
    message: postMessage,
    likesCount: 0
  }
  state.profilePage.posts.push(newPost)
  state.profilePage.newPostText = '' // очищаем поле ввода <textarea> после добавления поста 
  rerenderEntireTree(state)
}


export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText
  rerenderEntireTree(state)
}

export const subscribe = (observer) => {
  rerenderEntireTree = observer
}

export default state
*/

