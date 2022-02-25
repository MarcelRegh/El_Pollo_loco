class Cloud extends MoveableObject {
    width = 500;
    height = 300;
    y = 20;
    constructor() {
        super().loadImg('img/5.Fondo/Capas/4.nubes/1.png');

        this.x = Math.random() * 3000;
        this.animate();
    }

    animate() {
        setInterval (() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}