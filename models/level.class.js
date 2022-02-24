class Level {
    enemies;
    clouds;    
    backgroundObjects;
    levelEndX = 2250;

    constructor (enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}