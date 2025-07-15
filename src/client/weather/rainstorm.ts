import { weather } from "../weather";
import { water } from "../matter/liquid/water";

export class rainstorm extends weather {
    name = "rainstorm";
    material = water;
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