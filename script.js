// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

let ballX = 30;
let ballY = 30;
let ballSpeed = 4;
// let ballSize = 20;

let isBallMovingRight = true; // true => se mueve a la derecha. false => se mueve a la izquierda
let isBallMovingDown = true; // true => se mueve a la abajo. false => se mueve a la arriba

let paddleX = 150;
let paddleY = 550;
let paddleSpeed = 20;

// *** Game Functions ***

function ballMovement() {
  if (isBallMovingRight === true) {
    ballX += ballSpeed // la pelotita se moverá 120 pixeles por segundo
  } else {
    ballX -= ballSpeed
  }
  //! CADA VEZ QUE MODIFICAMOS UNA VARIABLE DE POSICION, TAMAÑO, COLOR, DEBEMOS ACTUALIZAR EL DOM
  ballNode.style.left = `${ballX}px` // IMPORTANTE AGREGAR px

  if (isBallMovingDown === true) {
    ballY += ballSpeed
  } else {
    ballY -= ballSpeed
  }
  ballNode.style.top = `${ballY}px`
}

function ballWallCollision() {
  // determina cuando la pelotita colisiona con la pared del game box
  // gameBoxNode.offsetWidth es siempre el valor numero del ancho del canvas
  // gameBoxNode.offsetHeight es siempre el valor numero del alto del canvas
  if ((ballX + ballNode.offsetWidth) >= gameBoxNode.offsetWidth) {
    // console.log("la pelotita ha colisionado con la pared derecha")
    isBallMovingRight = false;
  } else if ((ballY + ballNode.offsetHeight) >= gameBoxNode.offsetHeight) {
    // console.log("pelotita colisionando con la pared de abajo")
    // isBallMovingDown = false;
    //* queremos ocasionar el fin del juego
    clearInterval(gameIntervalId)
    alert("Perdiste el juego")
  } else if (ballX <= 0) {
    isBallMovingRight = true;
  } else if (ballY <= 0) {
    isBallMovingDown = true;
  }
}

function ballPaddleCollision() {

  if (ballY + ballNode.offsetHeight > paddleY && ballX > paddleX && ballX < (paddleX + paddleNode.offsetWidth)) {
    // console.log("pelotita colisionando con paleta")
    isBallMovingDown = false;
  }

}

function gameLoop() {

  // console.log("juego andando")
  // lo que relentiza un ordenador son los console.logs
  // hacemos console.logs para probar y luego los borramos o comentamos

  ballMovement()
  ballWallCollision()
  ballPaddleCollision()

}



// *** Game Loop Interval ***
let gameIntervalId = setInterval(gameLoop, 1000/60) // 60fps frames per second




// *** Event Listeners ***
// tambien podemos hacer document.addEventListener
window.addEventListener("keydown", (event) => {
  // console.log(event.code)
  // console.log("presionando teclas")
  if (event.code === "ArrowRight") {
    // console.log("quiero mover la paleta a la derecha")
    paddleX += paddleSpeed
    paddleNode.style.left = `${paddleX}px`
  } else if (event.code === "ArrowLeft") {
    // console.log("quiero moverl la paleta a la izquierda")
    paddleX -= paddleSpeed
    paddleNode.style.left = `${paddleX}px`
  }

  //! en nuestro codigo SOLO necesitamos un eventListener keydown. Todas las teclas van aqui mismo

})



