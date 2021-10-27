import React from "react";
import {useDispatch} from "react-redux";
import {Cell, setActive} from "../features/sudoku/sudoku";

const Cell = ({cell, row, col}: { cell: Cell, row: number, col: number }) => {

  const getCellClass = () => {
    if (cell.isActive) return 'active';
    if (cell.isHighlighted) return 'highlighted'
  }

  const dispatch = useDispatch();

  return <td className={getCellClass()}
             onClick={() => dispatch(setActive([row, col]))}>{cell.value ? cell.value : ''}</td>
}

export default React.memo(Cell);