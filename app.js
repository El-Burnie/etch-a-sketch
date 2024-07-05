//Represents the number of squares on one row or column of the grid
let gridSize = 16;
//Represents the vh value of the container.  Update this number manually if it changes
const vhValue = 80;

const container = document.querySelector("#container");
const shakeItButton = document.querySelector("#shakeItButton");
const optionButtons = document.querySelectorAll(".optionButton");

let selectedOption = "blackToggle";

generateCells();

//Take an input and validate it to make sure its an integer from 1 to 100.  If a valid
//input is given, clear and refill the board to the specified size.
shakeItButton.addEventListener("click", () => {
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

optionButtons.forEach((optionButton) => {
    optionButton.addEventListener("click", e => {
        const selectedButton = e.target;
        optionButtons.forEach((button) => {
            if (selectedButton !== button) {
                button.classList.remove("selected");
            }
        });
        selectedButton.classList.add("selected");
        selectedOption = selectedButton.id;
        console.log(selectedOption)
    })
});

function generateCells() {
    const cellSize = calculateCellSize()
    for (let i = 0; i < (gridSize ** 2); i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${cellSize}vh`;
        cell.style.height = `${cellSize}vh`;
        cell.addEventListener("mouseover", () => {
            if (!cell.classList.contains("filled")) {
                fillCell(cell);
                cell.classList.toggle("filled");
            }
        });
        container.appendChild(cell);
    }
}

//check the selected options and color the cell accordingly
function fillCell(cell) {
    if (selectedOption === "blackToggle") {
        cell.style.backgroundColor = "black";
    } else if (selectedOption === "randomToggle") {
        cell.style.backgroundColor = getRandomColor();
    }
}

function calculateCellSize() {
    return Math.round((vhValue / gridSize) * 10000) / 10000;
}

function deleteAllCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => { cell.remove(); });
}

function getRandomColor() {
    const hexChars = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
}