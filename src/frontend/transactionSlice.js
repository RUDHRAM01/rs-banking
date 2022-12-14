import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: {},
    isLoading: false,
    error: false,
    transaction: {},
  },

  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.transactions = action.payload;
      state.isLoading = false;
    },
    addSuccess: (state, action) => {
      state.transactions = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { addSuccess, fetchSuccess, startLoading, hasError } =
  transactionSlice.actions;

// Fetch Data
export const fetchTransactions = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await axios.get("http://localhost:3000/transactions");
    dispatch(fetchSuccess(res.data));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

// Add Data
export const addTransaction = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await axios.post("http://localhost:3000/transaction", data);
    dispatch(addSuccess(res.data));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

// Update Data
export const putTransaction = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const id = data._id;
    const res = await axios.put(`http://localhost:3000/transaction/${id}`, data);
    dispatch(addSuccess(res.data));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

// Delete Data
export const deleteTransaction = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await axios.delete(`http://localhost:3000/transaction/${id}`);
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

export default transactionSlice.reducer;

