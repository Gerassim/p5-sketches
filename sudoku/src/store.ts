import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter";
import sudokuReducer from "./features/sudoku/sudoku";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sudoku: sudokuReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch