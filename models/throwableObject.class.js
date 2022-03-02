class ThrowableObject extends MoveableObject {
    height = 100;
    width = 100;
    IMAGES_THROW = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
    ];

    constructor(x, y) {
        super().loadImg('img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png');
        // this.loadImgs(this.IMAGES_THROW);
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }

}