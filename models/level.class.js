class Level {
    enemies;
    clouds;    
    backgroundObjects;
    levelEndX = 3650;

    constructor (enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}