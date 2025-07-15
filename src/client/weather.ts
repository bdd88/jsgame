import {entity} from './entity';
import {util} from './util';
import * as matter from './matter';

export class weather extends entity {
    type = "weather";
    material;
    minSpawnX;
    maxSpawnX;
    minSpawnY;
    maxSpawnY;
    minSpawnXV;
    maxSpawnXV;
    minSpawnYV;
    maxSpawnYV;
    minSpawnCount;
    maxSpawnCount;
    randNum;

    /**
     * 
     * @param {util} util 
     */
    constructor(util) {
        this.randNum = util.genRandNum;
    }

    /**
     * 
     * @returns {Array} A list of objects, created based on given spawn parameters.
     */
    spawnMaterials() {
        const newObjects = [];
        const spawnCount = this.randNum(this.minSpawnCount, this.maxSpawnCount);
        for (let i = 1; i <= spawnCount; i++) {
            const newObject = new this.material(
                this.randNum(this.minSpawnX, this.maxSpawnX),
                this.randNum(this.minSpawnY, this.maxSpawnY),
                this.randNum(this.minSpawnXV, this.maxSpawnXV),
                this.randNum(this.minSpawnYV, this.maxSpawnYV)
            );
            newObjects.push(newObject);
        }
        return newObjects;
    }
}

export class rainstorm extends weather {
    name = "rainstorm";
    material = matter.water;
    minSpawnX = -150;
    maxSpawnX = 999;
    minSpawnY = 0;
    maxSpawnY = 0;
    minSpawnXV = 15;
    maxSpawnXV = 50;
    minSpawnYV = 150;
    maxSpawnYV = 300;
    minSpawn = 15;
    maxSpawn = 30;
}