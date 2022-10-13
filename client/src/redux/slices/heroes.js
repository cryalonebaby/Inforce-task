import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async (pageNumber) => {
  const {data} = await axios.get(`api/heroes?page=${pageNumber}`)
  return data
})

const initialState = {
  heroes: {
    items: [],
    status: 'loading',
    pagesAmount: 0,
    currentPage: 1 
  }
}

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHeroes.pending]: (state) => {
      state.heroes.items = []
      state.heroes.status = 'loading'
      state.heroes.pagesAmount = 0
      state.heroes.currentPage = 1
    },
    [fetchHeroes.fulfilled]: (state, action) => {
      state.heroes.items = action.payload.heroes
      state.heroes.status = 'loaded'
      state.heroes.pagesAmount = action.payload.pages
      state.heroes.currentPage = action.payload.current
    },
    [fetchHeroes.rejected]: (state) => {
      state.heroes.items = []
      state.heroes.status = 'error'
      state.heroes.pagesAmount = 0
      state.heroes.currentPage = 1
    },
  }
})

export const heroesReducer = heroesSlice.reducer