class StatusBarBottle extends DrawableObject {
    
    IMAGES_BOTTLE = [
        'img/7.Marcadores/Barra/Marcador_botella/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/azul/100_.png',
    ];
    percentage = 0;

    constructor() {
        super();
        this.loadImgs(this.IMAGES_BOTTLE);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImgIndex()];
        this.img = this.imageCache[path];
    }

    resolveImgIndex() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage > 3) {
            return 4;
        } else if (this.percentage > 2) {
            return 3;
        } else if (this.percentage > 1) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }

}