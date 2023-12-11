function init() {

    // ? ELEMENTS
    // create grid
    const grid = document.querySelector(".grid")
    const food = document.getElementById("food")
  
    // ? VARIABLES
    // congif
    const width = 10
    const height = 10
    const cellCount = width * height
    let cells = []
  
    // CHARACTER CONFIG
    const startingPosition = 0  
    let currentPosition = startingPosition

    // FOOD CONFIG
    const foodStartingPosition = 80
    let currentFoodPosition = foodStartingPosition


    // GRID CELLS
    function createGrid() {
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div")
        cell.dataset.index = 1
        cell.style.height = `${100 / height}`
        cell.style.width = `${100 / width}`
        grid.appendChild(cell)
        cells.push(cell)
      }

      addHead(currentPosition)
      addFood(currentFoodPosition)
    }

    // FOOD
    function setRandomPosition() {
        const randomColumn = Math.floor(Math.random() * width) + 1
        const randomRow = Math.floor(Math.random() * height) + 1
        
        randomFood.style.gridColumn = `${randomColumn} / span 1`
        randomFood.style.gridRow = `${randomRow}/ span 1`
    }

    function placeFood(grid) {
        const foodPosition = setRandomPosition();
        const isOccupied = snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y);
        if (isOccupied) {
            return placeFood(grid);
          }
          grid[foodPosition.y][foodPosition.x] = 'F';
    }

    // ADD HEAD CLASS 
    function addHead(position) {
        cells[position].classList.add("head")
    }
    // ADD FOOD CLASS
    function addFood(position) {
        cells[position].classList.add("food")
    }

    //REMOVE HEAD CLASS
    function removeHead() {
        cells[currentPosition].classList.remove("head")
    }

    // ? HANDLE MOVEMENT 
    function handleMovement(event) {
        const key = event.key

        const up = "ArrowUp"
        const down = "ArrowDown"
        const left = "ArrowLeft"
        const right = "ArrowRight"

        // Remove head from previous position before updating current position to new cell
        removeHead()

        // check which key was pressed and execute code
        if (key === up && currentPosition >= width) {
            currentPosition -= width
            console.log("UP")
        }else if (key === down && currentPosition + width <= cellCount -1) {
            currentPosition += width
            console.log("DOWN")
        }else if (key === left && currentPosition % width !== 0) {   
            currentPosition--   
            console.log("LEFT")
        }else if (key === right && currentPosition % width !== width -1) {
            console.log("RIGHT")
            currentPosition++
            console.log(currentPosition)
        }else {
            console.log("INVALID KEY")
        }

        // Add Head class once currentPosition has been updated
        addHead(currentPosition)
    }
    
    // EVENTS
    document.addEventListener("keyup", handleMovement)
    randomFood.addEventListener("click", setRandomPosition)


    // LOAD PAGE
    createGrid()
    setRandomPosition()
    placeFood(grid)
  }
  
window.addEventListener("DOMContentLoaded", init)
