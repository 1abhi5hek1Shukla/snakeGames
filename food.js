import {onSnake, expandSnake} from "./snake.js"
import {getRandomPosition as randomGridPosition} from "./grid.js" 
let food = getFoodPosition()
const EXPANSION_RATE = 9

export function update(){
    if (onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getFoodPosition()
    }
}

export function draw(gameBoard){
    const foodELement = document.createElement('div')
    foodELement.style.gridRowStart = food.y	
    foodELement.style.gridColumnStart = food.x
    gameBoard.appendChild(foodELement)
    foodELement.classList.add('food')   
}

function getFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}