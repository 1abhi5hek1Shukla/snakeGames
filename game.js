
import {SNAKE_SPEED, score} from "./snake.js"
import {draw as drawSnake, update as updateSnake, getSnakeHead, snakeIntersection} from "./snake.js"
import {draw as drawFood, update as updateFood} from "./food.js"
import {outsideGrid} from "./grid.js" 
let lastRenderTime = 0;


function main(currentTime){
	if (gameOver){
		if (confirm("Your score is: " + score + "\n press ok to restart : ")){
			window.location = "/"
		}
		return
	}
	window.requestAnimationFrame(main);
	const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
	if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
	lastRenderTime = currentTime;
	update()
	draw()
}
window.requestAnimationFrame(main);

// ////////////////////////////////////////////////
const gameBoard = document.getElementById("gameBoard")
let gameOver = false
function update(){
	updateSnake()
	updateFood()
	checkDeath()
}

function draw(){
	gameBoard.innerHTML = ''
	drawSnake(gameBoard)	
	drawFood(gameBoard)
}
///////////////////////////////////////////////////

function checkDeath(){
	gameOver = snakeIntersection()
}
