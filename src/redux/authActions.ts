import { AppDispatch } from './store';
import axios from 'axios';
import { loginSuccess, loginFailure, signupSuccess, signupFailure } from './authSlice';

const API_URL = 'https://dummyjson.com';


export const signupAsync = (userData: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL + "/users/add", userData, {
      headers: { 'Content-Type': 'application/json' },
    });


    dispatch(signupSuccess(response.data));
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error: any) {
    dispatch(signupFailure(error.message));
  }
};



export const loginAsync = (credentials: { id: number; username: string; password: string }) => async (dispatch: AppDispatch) => {
  try {
    const localUserData = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUserData.username === credentials.username && localUserData.password === credentials.password) {
      dispatch(loginSuccess(localUserData));
      return;
    }

    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        id: credentials.id,
        username: credentials.username,
        password: credentials.password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    dispatch(loginSuccess(response.data));

  } catch (error: any) {

    dispatch(loginFailure(error.message));
  }
};



