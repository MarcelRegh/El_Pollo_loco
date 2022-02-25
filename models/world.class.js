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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
        this.checkCollisionEnemy();
        this.checkCollisionBottles();
        this.checkCollisionCoins();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollision() {
        setInterval(() => {
            this.checkCollisionEnemy();
            this.checkCollisionBottles();
            this.checkCollisionCoins();
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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