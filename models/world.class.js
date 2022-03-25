class World {
    character = new Character();
    level = level1;
    canvas
    ctx;
    keyboard;
    camera_x = -100;
    statusBarLife = new StatusBarLife();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarBoss = new StatusBarBoss();
    throwableBottles = [];
    gameOver = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollision() {
        setInterval(() => {
            this.checkCollisionEnemy();
            this.checkCollisionsWihtCollectibles(this.level.coins);
            this.checkCollisionsWihtCollectibles(this.level.bottles);
            this.checkThrowObject();
            this.checkCollisionThrowableObject();
        }, 200)
    }

    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (!this.character.energy == 0) {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBarLife.setPercentage(this.character.energy);
                }
            } else {
                setTimeout(() =>{
                    this.youLost();
                }, 500)
            }
        });
    }

    checkCollisionThrowableObject() {
        this.throwableBottles.forEach( throwableBottles => {
            this.level.enemies.forEach( enemy => {
                if (!enemy.energy == 0) {
                    if(throwableBottles.isColliding(enemy)) {
                        enemy.hit();
                        this.statusBarBoss.setPercentage(enemy.energy);
                    }
                }
                else {
                    setTimeout(() =>{
                        this.youWon();
                    }, 500)
                }
            })
        })
    }

    checkCollisionsWihtCollectibles(array){
        array.forEach((element, index)=>{
            if(this.character.isColliding(element)){
                this.updateStatusBar(array);
               array.splice(index, 1);
            }
        });
    }

    updateStatusBar(array) {
        if (array == this.level.bottles) {
            this.character.bottleCollected();
            this.statusBarBottle.setPercentage(this.character.collectedBottles);
        } else if (array == this.level.coins) {
            this.character.coinCollected();
            this.statusBarCoin.setPercentage(this.character.collectedCoins);
        }
    }

    checkThrowObject() {
        if(this.keyboard.SPACE && this.character.collectedBottles >= 1) { // if SPACE is pressed and collectedBottles are more than 1 you can throw 1
            this.character.collectedBottles -= 1; // delet 1 Bottle from the collectedBottles var 
            let bottle = new ThrowableObject(this.character.x + 25, this.character.y + 50); // A var to add a Bottle to the map
            this.throwableBottles.push(bottle); // push a New Object / Bottle to the Array
            this.statusBarBottle.setPercentage(this.character.collectedBottles); // Refreshs the Statusbar
        }
    }

    youWon() {
        document.getElementById('world-end').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('youWon').classList.remove('d-none');
            document.getElementById('restart-game-btn').classList.remove('d-none');
        }, 500);

        setTimeout(() => {
            document.getElementById('infobox').innerHTML=`<h4> Congratulations, YOU WON! </h4>`;
        }, 600);
    }

    youLost() {
        document.getElementById('world-end').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('youLost').classList.remove('d-none');
            document.getElementById('restart-game-btn').classList.remove('d-none');
        }, 500);

        setTimeout(() => {
            document.getElementById('infobox').innerHTML=`<h4> Oh NO! You've lost! TRY AGAIN!</h4>`;
        }, 600);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableBottles);
        this.addToMap(this.statusBarBoss);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.mirrorImg(mo);
        }
        mo.draw(this.ctx);
        mo.drawHitBox(this.ctx);
        if (mo.otherDirection) {
            this.backMirrorImg(mo)
        }
    }

    mirrorImg(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    backMirrorImg(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}