import dialogsAva1 from '../img/dialogs-ava1.png'
import dialogsAva2 from '../img/dialogs-ava2.png'
import dialogsAva3 from '../img/dialogs-ava3.png'
import dialogsAva4 from '../img/dialogs-ava4.png'
import dialogsAva5 from '../img/dialogs-ava5.png'
import dialogsAva6 from '../img/dialogs-ava6.png'
import { DialogType, MessageType } from '../types/types'

const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
  dialogs: [
    {id: 1, name: 'Dima', img: dialogsAva1},
    {id: 2, name: 'Andrey', img: dialogsAva2},
    {id: 3, name: 'Sveta', img: dialogsAva3}, 
    {id: 4, name: 'Sasha', img: dialogsAva4},
    {id: 5, name: 'Victor', img: dialogsAva5},
    {id: 6, name: 'Valera', img: dialogsAva6}
  ] as Array<DialogType>,
  messages: [
    {id: 1, message: 'Hey there!'},
    {id: 2, message: "How's your day?"},
    {id: 3, message: 'I am commander Shepard, and'},
    {id: 4, message: 'This is my favourite store on the Citadel'},
    {id: 5, message: 'I should go'}
  ] as Array<MessageType>,
  newMessageBody: ''    //иначе DialogContainer не заработает
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: SendMessageCreatorActionType): InitialStateType  => { 
  switch(action.type) {
      case SEND_MESSAGE:
        let body = action.newMessageBody

        return {
          ...state,
          messages: [...state.messages, { id: state.messages.length + 1, message: body}]
        }

        default:
          return state
  }
}
export default dialogsReducer


type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody})