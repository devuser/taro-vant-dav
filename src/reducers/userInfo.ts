import { CHANGEUSERNAME } from '../constants/userInfo'

const INITIAL_STATE = {
  userName: ''
}

export default function userInfo (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGEUSERNAME:
      return {
        ...state,
        userName: state.userName+state.userName
      }
     default:
       return state
  }
}
