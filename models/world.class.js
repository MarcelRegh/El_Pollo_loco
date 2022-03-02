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
            this.checkCollisionBottles();
            this.checkCollisionCoins();
            this.checkThrowObject();
        }, 200)
    }

    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
                console.log('Collision with character', this.character.energy);
            }
        })
    }

    checkCollisionBottles() {
        this.level.bottles.forEach((bottles) => {
            if (this.character.isColliding(bottles)) {
                this.character.bottleCollected();
                this.statusBarBottle.setPercentage(this.character.collectedBottles);
                console.log('Collision with Bottle', this.character.collectedBottles);
            }
        })
    }

    checkCollisionCoins() {
        this.level.coins.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.character.coinCollected();
                this.statusBarCoin.setPercentage(this.character.collectedCoins);
                console.log('Collision with Coin', this.character.collectedCoins);
            }
        })
    }

    checkThrowObject() {
        if(this.keyboard.SPACE && this.character.collectedBottles >= 1) { // if SPACE is pressed and collectedBottles are more than 1 you can throw 1
            this.character.collectedBottles -= 1; // delet 1 Bottle from the collectedBottles var 
            let bottle = new ThrowableObject(this.character.x + 25, this.character.y + 50); // A var to add a Bottle to the map
            this.throwableBottles.push(bottle); // push a New Object / Bottle to the Array
            this.statusBarBottle.setPercentage(this.character.collectedBottles); // Refreshs the Statusbar
        }
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