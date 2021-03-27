import * as api from '../Api/api';
import { AUTH, LOGOUT } from '../Constants/types';

export const logUp = (formData, setIsLogUp) => async (dispatch) => {
  try {
    await api.createUser(formData);
    setIsLogUp(false);
  } catch (error) {
    console.log(error.response.data);
  }
}

export const logIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(formData);
    dispatch(loggedIn(data.user.nombreUsuario, data.token));
    localStorage.setItem('auth', JSON.stringify({
      user: data.user.nombreUsuario,
      token: data.token
    }));
  } catch (error) {
    console.log(error.response.data);
  }
}

export const loggedIn = (user, token) => {
  return {
    type: AUTH,
    payload: {
      user,
      token
    }
  }
}

export const logOut = () => (dispatch) => {
  dispatch({
    type: LOGOUT
  });
  localStorage.removeItem('auth');
}