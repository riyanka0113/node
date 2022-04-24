import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../config";

export const getProduct = createAsyncThunk("product/get", async () => {
  const respose = await axios.get(`${API}product`);

  return respose.data.data;
});

export const createProduct = createAsyncThunk("product/create", async (value) => {
  const respose = await axios.post(`${API}product`, value);

  return respose.data.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [createProduct.fulfilled]: (state, action) => action.payload
  },
});

export default productSlice.reducer;
