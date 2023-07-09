/* 
setup the game board 
Computer should randomly choose box to put its choice inside
have a function to choose which box in the grid
use set timeout to wait before displaying comp choice
use math.rand function to generate number from 0-9
use options array to check if cell has been chosen
use while to keep doing so until it is empty box in options array

COMMIT FIRST WITHOUT THESE ADDITIONS^^^ THEN ADD CHANGES AND COMMIT AGAIN

check if  current player is "O" if O, then shoud generate random number 
checl if element in options array is empty, if empty then place O
*/

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let running = false;

initialiseGame();

function initialiseGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));

    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    if(running && currentPlayer == "O"){
        compTurn();
    }

}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;

}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }

}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");

    running = true;

}

function compTurn(){

    let compChoice = Math.round(Math.random() * 9);

    while(options[compChoice] != ""){
        compChoice = Math.round(Math.random() * 9);
    }

    compCell = document.querySelector(`div[cellIndex='${compChoice}']`);
    updateCell(compCell, compChoice);

    checkWinner();
}