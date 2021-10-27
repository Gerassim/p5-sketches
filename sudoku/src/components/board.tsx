import React, {useEffect} from "react";
import Cell from "./cell";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {moveActive, setValue} from "../features/sudoku/sudoku";

const Board = () => {
  const field = useSelector((state: RootState) => state.sudoku.board);
  const dispatch = useDispatch();

  const numberKeyListener = (e: KeyboardEvent) => {
    if (Number.isInteger(parseInt(e.key))) {
      dispatch(setValue(parseInt(e.key)));
    }
  }

  const arrowKeyListener = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        dispatch(moveActive([0, -1]))
        break;
      case 'ArrowUp':
        dispatch(moveActive([-1, 0]))
        break;
      case 'ArrowRight':
        dispatch(moveActive([0, 1]))
        break;
      case 'ArrowDown':
        dispatch(moveActive([1, 0]))
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', numberKeyListener)
    document.addEventListener('keydown', arrowKeyListener)
    return () => {
      document.removeEventListener('keypress', numberKeyListener)
      document.removeEventListener('keydown', arrowKeyListener)
    }
  }, [])

  return <table>
    <tbody>
    {field.map((r, row) => <tr key={row}>{r.map((c, col) => <Cell cell={c} row={row} col={col} key={`${row}-${col}`}/>)}</tr>)}
    </tbody>
  </table>
}

export default Board;
