import {configureStore} from '@reduxjs/toolkit'
import { heroesReducer } from './slices/heroes'

const store = configureStore({
  reducer: {
    heroes: heroesReducer
  }
})

export default store