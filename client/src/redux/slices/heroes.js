import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async (pageNumber) => {
  const {data} = await axios.get(`api/heroes?page=${pageNumber}`)
  return data
}) 

export const createHero = createAsyncThunk('heroes/createHero', async (hero) => {
  const {data} = await axios.post(`api/heroes`, {
    nickname: hero.nickname,
    real_name: hero.real_name,
    origin_description: hero.origin_description,
    superpowers: hero.superpowers,
    catch_phrase: hero.catch_phrase,
    images: hero.images
  })
  return data
})

export const updateHero = createAsyncThunk('heroes/updateHero', async (hero) => {
  const {data} = await axios.patch(`api/heroes/${hero[0].id}`, hero[1])
  return data
})

export const deleteHero = createAsyncThunk('heroes/deleteHero', async (id) => {
  const {data} = await axios.delete(`api/heroes/${id}`)
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
    [updateHero.pending]: (state) => {
      state.heroes.items = []
      state.heroes.status = 'loading'
      state.heroes.pagesAmount = 0
      state.heroes.currentPage = 1
    },
  }
})

export const heroesReducer = heroesSlice.reducer