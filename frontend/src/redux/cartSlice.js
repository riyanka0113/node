import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../config";

export const getCart = createAsyncThunk("cart/get", async () => {
  const respose = await axios.get(`${API}cart`);

  return respose.data.data;
});

export const createCart = createAsyncThunk("cart/create", async (value) => {
  const respose = await axios.post(`${API}cart`, value);

  return respose.data.data;
});

export const update = createAsyncThunk("cart/update", async (value) => {
  await axios.patch(`${API}cart`, value);

});

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getCart.fulfilled]: (state, action) => action.payload,
    [createCart.fulfilled]: (state, action) => action.payload,
  },
});

export default cartSlice.reducer;
