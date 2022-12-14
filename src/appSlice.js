import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const appSlice = createSlice({
  name: 'application',
  initialState: {
    colorScheme: 'light',
    authenticated: null,
    userInfo: null,
    accessToken: null,
    isNotificationsVisible: false
  },
  reducers: {
    setColorScheme: (state) => {
      state.colorScheme = state.colorScheme === 'dark' ? 'light' : 'dark';
    },
    setAuthentication: (state, action) => {
      state.authenticated = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setNotificationsVisiblity: (state) => {
      const visible = state.isNotificationsVisible
      state.isNotificationsVisible = !visible;
    }
  },

});

export const { setColorScheme, setAccessToken, setAuthentication, setUserInfo, setNotificationsVisiblity } = appSlice.actions;


export const changeColorSchemeAction = colorScheme => (dispatch) => {
  dispatch(setColorScheme(colorScheme));
};

export const setAccessTokenAction = accessToken => dispatch => {
  dispatch(setAccessToken(accessToken));
};

export const setAuthenticationAction = authenticated => dispatch => {
  dispatch(setAuthentication(authenticated));
};

export const setUserInfoAction = userInfo => dispatch => {
  dispatch(setUserInfo(userInfo));
};

export const toggleNotificationsAction = () => dispatch => {
  dispatch(setNotificationsVisiblity())
}

export default appSlice.reducer;
