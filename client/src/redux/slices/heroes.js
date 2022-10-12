import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  const {data} = await axios.get('api/heroes')
  return data
})

const initialState = {
  heroes: {
    items: [],
    status: 'loading'
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
    },
    [fetchHeroes.fulfilled]: (state, action) => {
      state.heroes.items = action.payload
      state.heroes.status = 'loaded'
    },
    [fetchHeroes.rejected]: (state) => {
      state.heroes.items = []
      state.heroes.status = 'error'
    },
  }
})

export const heroesReducer = heroesSlice.reducer