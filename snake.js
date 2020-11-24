import { getInputDirection } from "./input.js"
import {outsideGrid, GRID_SIZE} from "./grid.js"
export const SNAKE_SPEED = 15


const snakeBody = [
	{x:11, y:11},
]
let newSegments = 0
export let score = 0

export function update(){
	addSegments()
	const inputDirection = getInputDirection()
	for (var i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = {...snakeBody[i]};
	}
	if (outsideGrid(getSnakeHead())){
		if (snakeBody[0].x < 1){
			snakeBody[0].x = 21
		}else if( snakeBody[0].x > GRID_SIZE){
			snakeBody[0].x = 1
		}else if(snakeBody[0].y < 1){
			snakeBody[0].y = 21
		}else if(snakeBody[0].y > GRID_SIZE){
			snakeBody[0].y = 1
		}
	}else{
		snakeBody[0].x += inputDirection.x
		snakeBody[0].y += inputDirection.y
	}

}


export function draw(gameBoard){
	for (let seg = 0; seg < snakeBody.length; seg++) {
		const snakeElement = document.createElement('div')
		snakeElement.style.gridRowStart = snakeBody[seg].y	
		snakeElement.style.gridColumnStart = snakeBody[seg].x
		gameBoard.appendChild(snakeElement)
		if (seg !== 0){
			snakeElement.classList.add('snake')
		}else{
			snakeElement.classList.add('head')
		}
		
	}
}

export function expandSnake(amount){
	score += 1
	newSegments += amount 
}

export function onSnake(position, { ignoreHead= false } = {}){
	return snakeBody.some((segment, index) =>{
		if (ignoreHead && index === 0) return false
		return equalPositions(segment, position)
	})
}

export function getSnakeHead(){
	return snakeBody[0]
}

export function snakeIntersection(){
	return (onSnake(snakeBody[0],{ ignoreHead: true } ))
}

function equalPositions(pos1, pos2){
	return pos1.x === pos2.x && pos1.y === pos2.y
}
function addSegments(){
	for (let i = 0; i< newSegments; i++){
		snakeBody.push({...snakeBody[snakeBody.length - 1]})
	}
	newSegments = 0;
}