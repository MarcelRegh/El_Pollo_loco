class Chicken extends MoveableObject {
    
    height = 60;
    width = 80;
    y = 370;

    constructor() {
        super().loadImg('img/3.gegner/Version_normal/1.Ga_paso_derecho.png');

        this.x = 200 + Math.random() * 500;
    }

}