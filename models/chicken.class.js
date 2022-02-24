class Chicken extends MoveableObject {

    height = 60;
    width = 80;
    y = 370;
    IMAGES_WALKING = [
        'img/3.gegner/Version_normal/1.Ga_paso_derecho.png',
        'img/3.gegner/Version_normal/2-Ga_centro.png',
        'img/3.gegner/Version_normal/3.Ga_paso izquierdo.png',
    ];
    constructor() {
        super().loadImg('img/3.gegner/Version_normal/1.Ga_paso_derecho.png');
        this.loadImgs(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }

}