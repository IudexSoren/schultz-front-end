import { AUTH, LOGOUT } from '../Constants/types';

export const authReducer = (state = { logged: false }, action) => {
  switch (action.type) {
    case AUTH:
      return {
        user: action.payload.user,
        token: action.payload.token,
        logged: true
      };
    case LOGOUT:
      return {
        logged: false
      };

    default:
      return state;
  }
}