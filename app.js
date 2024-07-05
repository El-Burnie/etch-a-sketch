//Represents the number of squares on one row or column of the grid
let gridSize = 16;
//Represents the vh value of the container.  Update this number manually if it changes
const vhValue = 90;

const container = document.querySelector("#container");
const button = document.querySelector("button");

//Takes an input and validates it to make sure its an integer from 1 to 100.  If a valid
//input is given it clears and refills the board to the specified size.
button.addEventListener("click", () =>{
    let validInput = false;
    while (!validInput) {
        let input = prompt("How big should each side be? (1-100)");
        if (!input) {
            alert("The shake has been cancelled");
            validInput = true;
        } else if (Number.isNaN(+input)) {
            alert("That was not a number you silly goose!")
        } else if (+input < 1 || +input > 100) {
            alert("That number is not in the acceptable range.")
        } else {
            gridSize = +input;
            deleteAllCells();
            generateCells();
            validInput = true;
        }
    }
})

function generateCells() {
    const cellSize = calculateCellSize()
    for (let i = 0; i < (gridSize ** 2); i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${cellSize}vh`;
        cell.style.height = `${cellSize}vh`;
        cell.addEventListener("mouseover", () => { 
            cell.style.backgroundColor = "black";
        });
        container.appendChild(cell);
    }
}

function calculateCellSize() {
    return Math.round((vhValue / gridSize) * 10000) / 10000;
}

function deleteAllCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => { cell.remove(); });
}

generateCells();