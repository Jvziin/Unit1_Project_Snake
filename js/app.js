const grid = document.querySelector(".grid")

function init() {

    // ? ELEMENTS
    // create grid
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
        while (snake.includes(foodLocation)) {
            foodLocation = Math.floor(Math.random() * cellCount)
        }
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
            scoreDisplay.innerText = `Score: ` + score;
        }
    }

    // ? HANDLE MOVEMENT 

    function moveSnake() {
        timer = setInterval(() => {
            // removeHead()
            // checkCollision()
            const headIndex = snake[0]
            if ((Math.floor(headIndex / width) === 0 && snakeDirection === -10) ||
                (Math.floor(headIndex / width) === 9 && snakeDirection === 10)|| 
                (headIndex % width === 9 && snakeDirection === 1) ||
                (headIndex % width === 0 && snakeDirection === -1 )
            ) {
                clearInterval(timer)
                
                gameOver()
                document.getElementById("startBtn").style.display = "block"
                return 
            }
            
            if (cells[headIndex].classList.contains("snakeBody")) {
                clearInterval(timer)
                gameOver()
                document.getElementById("startBtn").style.display = "block"
                return true
            }
            removeHead()
            if (!cells[snake[0] + snakeDirection].classList.contains("food")) {
                snake.pop()
            } else {
                removeFood()
                addFood()
                score++
            } 
            snake.unshift(snake[0] + snakeDirection)
            addHead()
            updateScore()
        }, 200)
    }

    function handleMovement(event) {
        const key = event.key

        const up = "ArrowUp"
        const down = "ArrowDown"
        const left = "ArrowLeft"
        const right = "ArrowRight"

        removeHead()

        if (key === up && snakeDirection !== 10) {
            snakeDirection = -10
        }else if (key === down && currentPosition + width <= cellCount -1 && snakeDirection !== -10) {
            snakeDirection = 10
        }else if (key === left && currentPosition % width !== 0 && snakeDirection !== 1) {   
            snakeDirection = -1
        }else if (key === right && currentPosition % width !== width -1 && snakeDirection !== -1) {
            snakeDirection = 1
        }else {
        }

        addHead()
    }

    // EVENTS
    document.addEventListener("keyup", handleMovement)
    document.getElementById("startBtn").addEventListener("click", startGame)

    // LOAD PAGE
    createGrid()
    moveSnake()
  }

  function startGame() {
    document.getElementById("gameOver").style.visibility = "hidden"
    document.getElementById("startBtn").style.display = "none"
    grid.innerHTML = ""
    document.getElementById("startBtn").blur()
    init()
}

function gameOver() {
    document.getElementById("gameOver").style.visibility = "visible"
    document.getElementById("startBtn").style.display = "block"
}
  
window.addEventListener("DOMContentLoaded", init)
