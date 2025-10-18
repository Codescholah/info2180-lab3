// tic-tac-toe.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const newGameBtn = document.querySelector(".btn");
  if (!board || !status || !newGameBtn) return;

  // Exercise 1: layout the board by applying the CSS hook
  const squares = Array.from(board.children);
  squares.forEach((sq) => sq.classList.add("square")); 
  

  // Game state
  const state = Array(9).fill(null);
  let current = "X";
  let gameOver = false;
  const initialStatus = status.textContent;

  // Exercise 3: hover styling
  squares.forEach((el) => {
    el.addEventListener("mouseenter", () => el.classList.add("hover"));
    el.addEventListener("mouseleave", () => el.classList.remove("hover"));
  }); 

  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function checkWinner() {
    for (const [a,b,c] of wins) {
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        gameOver = true;
        status.textContent = `Congratulations! ${state[a]} is the Winner!`;
        status.classList.add("you-won"); 
        return true;
      }
    }
    return false;
  }

  // Exercise 2, 4, 6
  function play(idx, el) {
    if (gameOver) return;
    if (state[idx]) return;                  
    state[idx] = current;
    el.textContent = current;               
    el.classList.add(current);               
    if (!checkWinner()) current = current === "X" ? "O" : "X";
  }

  squares.forEach((el, idx) => {
    el.addEventListener("click", () => play(idx, el));
  });

  // Exercise 5: New Game resets everything
  newGameBtn.addEventListener("click", () => {
    state.fill(null);
    squares.forEach((el) => {
      el.textContent = "";
      el.classList.remove("X", "O", "hover");
    });
    status.textContent = initialStatus;
    status.classList.remove("you-won");
    current = "X";
    gameOver = false;
  }); 
});
