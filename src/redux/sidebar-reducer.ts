import ava1 from '../img/friends-ava1.png'
import ava2 from '../img/friends-ava2.jpg'
import ava3 from '../img/friends-ava3.png'


let initialState = {
  friends: [
    {id: 1, name: 'Sasha', img: ava1 },
    {id: 2, name: 'Sveta', img: ava2 },
    {id: 3, name: 'Monica', img: ava3 }
  ]
}

type InitialState = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialState => {
  return state
}
export default sidebarReducer