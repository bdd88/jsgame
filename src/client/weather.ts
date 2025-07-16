import {entity} from './entity.js';
import { matter } from './matter/matter.js';
import {util} from './util.js';

export class weather extends entity {
    type = "weather";
    material: typeof matter | null = null;
    minSpawnX: number = 0;
    maxSpawnX: number = 0;
    minSpawnY: number = 0;
    maxSpawnY: number = 0;
    minSpawnXV: number = 0;
    maxSpawnXV: number = 0;
    minSpawnYV: number = 0;
    maxSpawnYV: number = 0;
    minSpawnCount: number = 0;
    maxSpawnCount: number = 0;
    randNum: util['genRandNum'];

    constructor(util: util, x: number, y: number, xv: number, yv: number) {
        super(x, y, xv, yv);
        this.randNum = util.genRandNum;
    }

    /** Create a list of new objects to spawn, based on weather parameters. */
    spawnMaterials() {
        const newObjects = [];
        const spawnCount = this.randNum(this.minSpawnCount, this.maxSpawnCount);
        for (let i = 1; i <= spawnCount; i++) {
            if (this.material === null) { return false; }
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

