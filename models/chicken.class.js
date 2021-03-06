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
        this.x = 300 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.moveLeft();
        }, 1000 / 60)
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}