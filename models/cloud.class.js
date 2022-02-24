class Cloud extends MoveableObject {
    width = 500;
    height = 200;
    y = 20;
    constructor() {
        super().loadImg('img/5.Fondo/Capas/4.nubes/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

}