import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "../store";

type HackersState = {
  randomizedStories: number[] | [],
  viewedStories: number[] | [],
}

const initialState = { viewedStories: [], randomizedStories: [], }


const slice = createSlice({
  name: 'hackers',
  initialState: initialState as HackersState,
  reducers: {
    setRandomizedStories: (
      state,
      { payload: { randomizedStories } }: PayloadAction<{ randomizedStories: number[] | [] }>
    ) => { state.randomizedStories = randomizedStories },
    setViewedStories: (
      state,
      { payload: { viewedStories } }: PayloadAction<{ viewedStories: number[] | [] }>
    ) => { state.viewedStories = [...state.viewedStories, ...viewedStories] },
    resetHackersData: state => initialState,
  },
})

export const { setRandomizedStories, setViewedStories, resetHackersData } = slice.actions

export default slice.reducer

// export const selectCurrentUser = (state: RootState) => state.auth.user
