import { SET_ADMIN } from './action-types'
import WebSocket from '../services/web-socket-service'

const setAdminAction = (dispatch, payload) => {
  dispatch({
    type: SET_ADMIN,
    payload: payload
  });

  WebSocket.send("{\"data\": \"Hello from client!\"}");
}

export {
  setAdminAction
}