const container = document.querySelector(".container");
const colorPicker = document.querySelector("#color-picker");

const INITAL_ROWS = 16;
const INITIAL_WIDTH = 480;
container.style.maxWidth = INITIAL_WIDTH + "px";

let selectedColor = "#000000";
let isDrawing = false;

colorPicker.addEventListener("input", function (e) {
  selectedColor = e.target.value;
});

container.addEventListener("mousedown", function (e) {
  isDrawing = true;
  if (e.target.classList.contains("pixel")) {
    e.target.style.backgroundColor = selectedColor;
  }
});

document.addEventListener("mouseup", function () {
  isDrawing = false;
});

function createGrid(numRows) {
  const boxsize = INITIAL_WIDTH / numRows;
  for (let i = 0; i < numRows * numRows; i++) {
    let div = document.createElement("div");
    div.classList.add("pixel");
    div.style.height = div.style.width = boxsize + "px";
    div.addEventListener("mouseover", function (e) {
      if (!isDrawing) return;
      e.target.style.backgroundColor = selectedColor;
    });
    container.appendChild(div);
  }
}

function deletePixels() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    container.removeChild(pixel);
  });
}

function clearGrid() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = "white";
  });

  //need to delete child of container
  console.log("clear grid called");
}

function changeSize() {
  deletePixels();
  let numRows = INITAL_ROWS;
  // Accept positive integer size up to 100.
  do {
    numRows = prompt("Enter the number of rows (1-100)");
    if (numRows === null) {
      createGrid(INITAL_ROWS);
      return;
    }
    numRows = parseInt(numRows);
  } while (!Number.isInteger(numRows) || numRows <= 0 || numRows > 100);
  createGrid(numRows);
}

createGrid(INITAL_ROWS);
