//Represents the number of squares on one row or column of the grid
let gridSize = 16;
//Represents the vh value of the container.  Update this number manually if it changes
const vhValue = 80;

const container = document.querySelector("#container");
const shakeItButton = document.querySelector("#shakeItButton");
const optionButtons = document.querySelectorAll(".optionButton");

//The value here is the default option selected on page load
let selectedOption = "black";
let gradualShadingEnabled = false;
const colorOptions = ["red", "green", "blue", "black", "random"];

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

//Clicking an option button toggles off all other buttons (except for gradual shading)
//Gradual shading can be on at the same time as other options to modify
//their behavior.
optionButtons.forEach((optionButton) => {
    optionButton.addEventListener("click", e => {
        const selectedButton = e.target;
        if (selectedButton.id === "gradualShading") {
            selectedButton.classList.toggle("selected");
            gradualShadingEnabled = !gradualShadingEnabled;
        } else {
            selectedButton.classList.add("selected");
            selectedOption = selectedButton.id;
        }
        optionButtons.forEach((button) => {
            if (selectedButton !== button && selectedButton.id !== "gradualShading") {
                button.id !== "gradualShading" && button.classList.remove("selected");
            }
        });
    })
});

//Generates a new grid of cells in container.
function generateCells() {
    const cellSize = calculateCellSize()
    for (let i = 0; i < (gridSize ** 2); i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${cellSize}vh`;
        cell.style.height = `${cellSize}vh`;
        cell.addEventListener("mouseover", () => {
            updateCell(cell);
        });
        container.appendChild(cell);
    }
}

//Logic to handle cell behavior on mouseover. Cells already fully colored in
//cannot be changed to a different color. Shaded cells will be incremented
//10% more opaque. Shaded cells can be overwritten by a non-shaded color.
function updateCell(cell) {
    if (selectedOption === "eraser") {
        eraseCell(cell);
    } else if (gradualShadingEnabled && !cell.classList.contains("filled")) {
        increaseOpacity(cell);
    } if (!cell.style.getPropertyValue("background-color")) {
        fillCell(cell);
    } else if (!gradualShadingEnabled && cell.classList.contains("shaded")) {
        eraseCell(cell);
        fillCell(cell);
    }
}

//check the selected options and color the cell accordingly
function fillCell(cell) {
    if (selectedOption === "random") {
        cell.style.backgroundColor = getRandomColor();
        cell.classList.add("random");
    } else {
        cell.style.backgroundColor = `${selectedOption}`;
        cell.classList.add(`${selectedOption}`);
    }
    if (!cell.classList.contains("shaded")) {
        cell.classList.add("filled");
    }
}

function calculateCellSize() {
    return Math.round((vhValue / gridSize) * 10000) / 10000;
}

//removes all cell divs so the generateCells function can fill 
//the container with new cells
function deleteAllCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => { cell.remove(); });
}

//resets all attributes of the cell to make it blank
function eraseCell(cell) {
    cell.style.removeProperty("background-color");
    cell.style.opacity = "1";
    cell.classList.remove("shaded");
    cell.classList.remove("filled");
    colorOptions.forEach((color) => {
        cell.classList.remove(`${color}`);
    });
}

function getRandomColor() {
    const hexChars = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
}

function increaseOpacity(cell) {
    if (!cell.classList.contains("shaded")) {
        cell.style.opacity = "0.1";
        cell.classList.add("shaded");
    }
    let opacity = +cell.style.getPropertyValue("opacity");
    if (cell.classList.contains(`${selectedOption}`) && opacity < 1) {
        opacity += 0.1;
        cell.style.opacity = `${opacity}`;
    }
}