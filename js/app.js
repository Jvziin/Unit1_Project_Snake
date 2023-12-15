function init() {

    //!! FIX SHOW SCORE
    //! Make snake speed up as it eats
    //! start button

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
    let snakeDirection = 1
    let score = 0
  
    // CHARACTER CONFIG
    const startingPosition = 3 
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

      addHead()
      addFood()
    }

    // ADD HEAD 
    function addHead(position) {
        const [snakeHead, ...snakeBody] = snake
        cells[snakeHead].classList.add("head")
        snakeBody.forEach(bodyPosition => {
            cells[bodyPosition].classList.add("snakeBody")
        })
    }
    // ADD FOOD
    function addFood() {
        foodLocation = Math.floor(Math.random() * cellCount) 
        cells[foodLocation].classList.add("food")
    }

    function removeFood() {
        cells[foodLocation].classList.remove("food")
    }
    //REMOVE HEAD
    function removeHead() {
        const [snakeHead, ...snakeBody] = snake
        cells[snakeHead].classList.remove("head")
        snakeBody.forEach(bodyPosition => {
            cells[bodyPosition].classList.remove("snakeBody")
        })
    }
    
    // SHOW SCORE 
    function updateScore() {
        const scoreDisplay = document.getElementById("scoreDisplay");
        if (scoreDisplay) {
            scoreDisplay.innerText = score;
        }
    }

    // ? HANDLE MOVEMENT 
    function checkCollision() {
        const headIndex = snake[0]
        if ((Math.floor(headIndex / width) === 0 && snakeDirection === -10) ||
            (Math.floor(headIndex / width) === 9 && snakeDirection === 10)|| 
            (snakeDirection === 1 && headIndex % width === 9) ||
            (snakeDirection === -1 && headIndex % width === 0)
        ) {
            clearInterval(timer)
            alert("Game Over - Hit the walls!")
            return
        }
        if (cells[headIndex].classList.contains("snakeBody")) {
            clearInterval(timer)
            alert("Game Over - Collision with the body!")
            return true
        }
    }

    function moveSnake() {
        timer = setInterval(() => {
            checkCollision()
            removeHead()
            if (!cells[snake[0] + snakeDirection].classList.contains("food")) {
                snake.pop()
            } else {
                removeFood()
                addFood()
                score++
                console.log(`score: ` + score)
            } 
            snake.unshift(snake[0] + snakeDirection)
            addHead()
        }, 200)
    }

    function handleMovement(event) {
        const key = event.key

        const up = "ArrowUp"
        const down = "ArrowDown"
        const left = "ArrowLeft"
        const right = "ArrowRight"

        // Remove head from previous position before updating current position to new cell
        removeHead()

        // check which key was pressed and execute code
        if (key === up && snakeDirection !== 10) {
            // currentPosition -= width
            snakeDirection = -10
        }else if (key === down && currentPosition + width <= cellCount -1 && snakeDirection !== -10) {
            // currentPosition += width
            snakeDirection = 10
        }else if (key === left && currentPosition % width !== 0 && snakeDirection !== 1) {   
            // currentPosition--   
            snakeDirection = -1
        }else if (key === right && currentPosition % width !== width -1 && snakeDirection !== -1) {
            snakeDirection = 1
        }else {
        }

        // Add Head class once currentPosition has been updated
        addHead()
    }

    // EVENTS
    document.addEventListener("keyup", handleMovement)

    // LOAD PAGE
    createGrid()
    moveSnake()
    updateScore()
  }
  
window.addEventListener("DOMContentLoaded", init)
