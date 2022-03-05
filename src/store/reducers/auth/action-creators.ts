import axios from 'axios';
import { AppDispatch } from '../..';
import { IUser } from '../../../models/IUser';
import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetLoadingAction,
  SetUserAction,
} from './types';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (isLoading: boolean): SetLoadingAction => ({
    type: AuthActionEnum.SET_LOADING,
    payload: isLoading,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error,
  }),
  signIn:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        //imitate backend request
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const response = await axios.get<IUser[]>('./users.json');
          const mockUser = response.data.find(
            (user) => user.username === username && user.password === password
          );
          if (mockUser) {
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', mockUser.username);
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setUser(mockUser));
          } else {
            dispatch(
              AuthActionCreators.setError('Incorrect username or password')
            );
          }
          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000);
      } catch (e) {
        dispatch(AuthActionCreators.setError('Sign in error occured'));
      }
    },
  signOut: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};
