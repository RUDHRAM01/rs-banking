import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signSlice = createSlice({
  name: "signs",
  initialState: {
    signs: {},
    isLoading: false,
    error: false,
    sign: {},
  },

  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.signs = action.payload;
      state.isLoading = false;
    },
    addSuccess: (state, action) => {
      state.signs = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { addSuccess, fetchSuccess, startLoading, hasError } =
  signSlice.actions;

// Fetch Data
export const fetchSigns = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await axios.get("http://localhost:3000/signs");
    dispatch(fetchSuccess(res.data));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

// Add Data
export const addSign = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await axios.post("http://localhost:3000/sign", data);
    dispatch(addSuccess(res.data));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

// Update Data
export const putSign = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const id = data._id;
    const res = await axios.put(`http://localhost:3000/sign/${id}`, data);
    dispatch(addSuccess(res.data));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

// Delete Data
export const deleteSign = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await axios.delete(`http://localhost:3000/sign/${id}`);
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

export default signSlice.reducer;

