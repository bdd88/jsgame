import { physicsObject } from "./physics";

/**
 * An in-game object that has physics simulations applied to it.
 */
export class entity extends physicsObject {
    name = "Entity";
    description = "Generic description of the entity.";
    color = "White";
    opacity = 100;
}