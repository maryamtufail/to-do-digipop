import { AppDispatch } from './store';
import axios from 'axios';
import { loginSuccess, loginFailure, signupSuccess, signupFailure } from './authSlice';

const API_URL = 'https://dummyjson.com/users';

export const loginAsync = (credentials: { email: string; password: string }) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, credentials);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const signupAsync = (userData: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, userData);
    dispatch(signupSuccess(response.data));
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};