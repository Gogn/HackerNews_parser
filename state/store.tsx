import {
  configureStore,
} from '@reduxjs/toolkit'
import {hackersApi} from "../services/queries";
import hackersReducer from './slices/hackers.slice'


const store = configureStore({
  reducer: {
    [hackersApi.reducerPath]: hackersApi.reducer,
    hackers: hackersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(hackersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>


export default store
