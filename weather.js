import {util} from './util.js';
import * as matter from './matter.js';

export class weather {
    type = "weather";
    material;
    minX;
    maxX;
    minY;
    maxY;
    minXV;
    maxXV;
    minYV;
    maxYV;
    minSpawn;
    maxSpawn;
    randNum;

    constructor(util) {
        this.randNum = util.genRandNum;
    }

    spawnMaterials() {
        const newObjects = [];
        const spawnCount = this.randNum(this.minSpawn, this.maxSpawn);
        for (let i = 1; i <= spawnCount; i++) {
            const newObject = new this.material(
                this.randNum(this.minX, this.maxX),
                this.randNum(this.minY, this.maxY),
                this.randNum(this.minXV, this.maxXV),
                this.randNum(this.minYV, this.maxYV)
            );
            newObjects.push(newObject);
        }
        return newObjects;
    }
}

export class rainstorm extends weather {
    name = "rainstorm";
    material = matter.water;
    minX = -150;
    maxX = 999;
    minY = 0;
    maxY = 0;
    minXV = 15;
    maxXV = 50;
    minYV = 150;
    maxYV = 300;
    minSpawn = 15;
    maxSpawn = 30;
}