import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const {data} = await axios.get('api/products')
  return data
})

export const fetchProductsSortedByCount = createAsyncThunk('products/fetchProducts', async () => {
  const {data} = await axios.get('api/products?sort=true')
  return data
})

const initialState = {
  products: {
    items: [],
    status: 'loading'
  }
}

const productsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.products.items = []
      state.products.status = 'loading'
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.items = action.payload.products
      state.products.status = 'loaded'
    },
    [fetchProducts.rejected]: (state) => {
      state.products.items = []
      state.products.status = 'error'
    },
  }
})

export const productsReducer = productsSlice.reducer