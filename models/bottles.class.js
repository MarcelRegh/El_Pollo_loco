class Bottles extends MoveableObject {
    
    height = 100;
    width = 100;
    y = 350;

    constructor() {
        super().loadImg('img/6.botella/2.Botella_enterrada2.png');
        this.x = 200 + Math.random() * 3000;
    }

}