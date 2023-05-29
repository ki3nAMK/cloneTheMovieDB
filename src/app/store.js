import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import getAPI from '../features/counter/getAPI'

export default configureStore({
  reducer: {
    api: getAPI 
  }
})