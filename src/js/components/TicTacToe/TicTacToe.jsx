import React, { useState, useRef } from "react";
import "./TicTacToe.css";
// If you want images, uncomment and fix the paths:
// import circle_icon from "/src/img/circle.png";
// import cross_icon from "/src/img/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const handleClick = (index) => {
    if (lock || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O"; // or set to <img src={cross_icon} /> if using images
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWin(newBoard);
  };

  const checkWin = (data) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: ${winner}`;
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setLock(false);
    titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span>";
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>

      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
