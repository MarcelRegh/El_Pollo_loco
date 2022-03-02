class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    collectedBottles = 0;
    lastCollectedBottle = 0;
    collectedCoins = 0;
    lastCollectedCoin = 0;

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    jump() {
        this.speedY = 20;
    }

    applyGravity() {
        setInterval(() => {
            if (this.inAir() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }

    inAir() {
        if (this instanceof ThrowableObject) {
            return true;
        }  else {
            return this.y < 190; 
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    bottleCollected() {
        this.collectedBottles += 1;
        if (this.collectedBottles > 5) {
            this.collectedBottles = 5;
        } else {
            this.lastCollectedBottle = new Date().getTime();
        }
    }

    coinCollected() {
        this.collectedCoins += 1;
        if (this.collectedCoins > 5) {
            this.collectedCoins = 5;
        } else {
            this.lastCollectedCoin = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }
}