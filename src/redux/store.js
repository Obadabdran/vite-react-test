import { configureStore } from '@reduxjs/toolkit'
import postReducer from './postReducer'
import { apiSlice } from '../sevices/apiSlice'

export const store = configureStore({
  reducer: {
    post:postReducer, [apiSlice.reducerPath]: apiSlice.reducer
},
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
})