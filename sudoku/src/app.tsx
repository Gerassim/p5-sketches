import React from "react";
import "./styles/main.css";
import Board from "./components/board";

const App = () => {

  return (
    <div className="container">
      <h1>Sudoku</h1>
      <Board />
    </div>
  )
}

export default App