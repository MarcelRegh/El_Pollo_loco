class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    levelEndX = 3650;

    constructor (enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}