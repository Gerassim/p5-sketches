import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import mod from "../../helpers/modulus";

export interface Cell {
  value: number;
  isRoot: boolean;
  isActive: boolean;
  isHighlighted: boolean;
}

interface SudokuState {
  board: Cell[][],
  active?: number[]
}

const initialState: SudokuState = {
  board: [
    [0, 5, 0, 0, 0, 9, 8, 1, 3],
    [9, 8, 0, 3, 5, 0, 6, 0, 7],
    [6, 0, 0, 0, 8, 0, 5, 9, 4],
    [8, 3, 2, 0, 0, 6, 0, 0, 0],
    [7, 0, 0, 1, 2, 8, 0, 0, 9],
    [1, 9, 0, 0, 7, 3, 2, 0, 0],
    [3, 7, 0, 6, 9, 0, 0, 5, 0],
    [0, 2, 0, 0, 0, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0],
  ].map((row) => row.map((v): Cell => ({value: v, isRoot: v !== 0, isActive: false, isHighlighted: false}))),
}

const isHighlighted = (row: number, col: number, active?: number[]) => {
  return !!active && (
    active[0] === row ||
    active[1] === col ||
    (Math.floor(active[0] / 3) === Math.floor(row / 3) && Math.floor(active[1] / 3) === Math.floor(col / 3))
  );
}

export const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<number[]>) => {
      state.active = action.payload
      state.board = state.board.map((r, ri) => r.map((c, ci) => ({
        ...c,
        isHighlighted: isHighlighted(ri, ci, state.active),
        isActive: ri === action.payload[0] && ci === action.payload[1]
      })))
    },
    moveActive: (state, action: PayloadAction<number[]>) => {
      const newActive = state.active ?
        [mod(state.active[0] + action.payload[0], 9), mod(state.active[1] + action.payload[1], 9)] :
        [0, 0];
      sudokuSlice.caseReducers.setActive(state, {payload: newActive, type: action.type})
    },
    setValue: (state, action: PayloadAction<number>) => {
      if (state.active && !state.board[state.active[0]][state.active[1]].isRoot) {
        state.board[state.active[0]][state.active[1]].value = action.payload;
      }
    }
  }
})

export const {setActive, setValue, moveActive} = sudokuSlice.actions

export default sudokuSlice.reducer;