class Coins extends MoveableObject {

    height = 70;
    width = 70;
    y = 100;

    constructor() {
        super().loadImg('img/7.Marcadores/Icono/Monedas.png');
        this.x = 200 + Math.random() * 3000;
    }

}