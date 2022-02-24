class MoveableObject {
    x = 120;
    y = 250;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            if (this.inAir() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }

    inAir() {
        return this.y < 190;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImgs(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    moveRight() {

    }
}