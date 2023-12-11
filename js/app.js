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
    let foodLocation
    let snake = [3, 2, 1]

    // use pop and unshift 
    // pop remove the tail and unshit add the head
    // use this to move the snake
    // for each to apply the class and remove to each part of the snake
  
    // CHARACTER CONFIG
    const startingPosition = 0  
    let currentPosition = startingPosition

    // FOOD CONFIG
    const foodStartingPosition = 66
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
      addFood()
    }

    // ADD HEAD CLASS 
    function addHead(position) {
        //foEach
        cells[position].classList.add("head")
    }
    // ADD FOOD CLASS
    function addFood() {
        foodLocation = Math.floor(Math.random() * cellCount) 
        cells[foodLocation].classList.add("food")
    }
    function removeFood(position) {
        cells[position].classList.remove("food")
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

    // LOAD PAGE
    createGrid()
  }
  
window.addEventListener("DOMContentLoaded", init)
