//Represents the number of squares on one row or column of the grid
let gridSize = 16;
//Represents the vh value of the container.  Update this number manually if it changes
const vhValue = 90;

const container = document.querySelector("#container");

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