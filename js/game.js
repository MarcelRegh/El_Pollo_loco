let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    world = new World(canvas, keyboard);
    document.getElementById('start-game-btn').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('infobox').innerHTML = `<h5> Use the Arrow Keys to move and Jump with space you can Throw bottles to kill the endboss </h5>`;
}

function restartGame() {
    location.reload();
}

window.addEventListener("keydown", (e) => {

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    } if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    } if (e.keyCode == 38) {
        keyboard.UP = true;
    } if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

});

window.addEventListener("keyup", (e) => {

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    } if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    } if (e.keyCode == 38) {
        keyboard.UP = false;
    } if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

});