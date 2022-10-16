import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const {data} = await axios.get('api/products')
  return data
})

export const fetchProductsSortedByCount = createAsyncThunk('products/fetchProductsSortedByCount', async () => {
  const {data} = await axios.get('api/products?sort=true')
  return data
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  const {data} = await axios.delete(`api/products/${id}`)
  return data
})

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
  const {data} = await axios.patch(`api/products/${product[0]}`, product[1])
  return data
})

export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
  const newProduct = {
    name: product.name,
    count: product.count,
    imageUrl: product.imageUrl,
    size: product.size,
    weight: product.weight,
    comments: []
  }
  const {data} = await axios.post('api/products', newProduct)
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
    [fetchProductsSortedByCount.pending]: (state) => {
      state.products.items = []
      state.products.status = 'loading'
    },
    [fetchProductsSortedByCount.fulfilled]: (state, action) => {
      state.products.items = action.payload.products
      state.products.status = 'loaded'
    },
    [fetchProductsSortedByCount.rejected]: (state) => {
      state.products.items = []
      state.products.status = 'error'
    },
  }
})

export const productsReducer = productsSlice.reducer