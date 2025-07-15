import { entity } from "./entity";
import { util } from "./util";

/**
 * Collection of entities, and a location map of their positions on the x/y grid.
 */
export class entities {
    list: Set<entity>;
    active: Set<entity>;
    inactive: Set<entity>;
    locations: Map<string,entity>;
    util: util;

    constructor(util: util) {
        this.util = util;
        this.list = new Set();
        this.locations = new Map();
        this.active = new Set();
        this.inactive = new Set();
    }

    /**
     * Place a new entity object into the location map.
     * 
     * @param {entity} entity Entity to place.
     * @returns {boolean} False if the entity was not found.
     */
    placeEntity(entity: entity) {
        const location = entity.x + ',' + entity.y;
        if ( this.locations.has(location) ) { return false; }
        this.list.add(entity);
        this.active.add(entity);
        this.locations.set(location, entity);
        return true;
    }

    /**
     * Move an entity at a location to a new location.
     * 
     * @param {integer} x Current horizontal position.
     * @param {integer} y Current veritical position.
     * @param {integer} targetX New horizontal position.
     * @param {integer} targetY New vertical position.
     * @returns {boolean} False if entity not found.
     */
    moveEntity(x: number, y: number, targetX: number, targetY: number) {
        const location = x + ',' + y;
        const newLocation = targetX + ',' + targetY;
        if ( !this.locations.has(location) ) { return false; }

        if (this.locations.get(location) === undefined) { return false; }
        const entityInstance = this.locations.get(location) as entity;
        entityInstance.x = targetX;
        entityInstance.x = targetY;
        this.locations.delete(location);
        this.locations.set(newLocation, entityInstance);
        this.active.add(entityInstance);
        return true;
    }

    /**
     * Remove an entity from the location map, and then delete it from the entity list.
     * 
     * @param {entity} entity Entity to delete.
     * @returns {boolean} False if the entity was not found, or was not fully removed.
     */
    removeEntity(entity: entity) {
        const location = entity.x + ',' + entity.y;
        if ( !this.locations.has(location) ) { return false; }
        if ( !this.locations.delete(location) ) { return false;} 
        if ( !this.active.delete(entity) ) { return false; }
        if ( !this.list.delete(entity) ) { return false; }
        return true;
    }

    /**
     * Apply physics to an entity and updates its' location.
     * The entity will be removed if it moves below the floor.
     * 
     * @param {entity} entity An in-game entity with physics simulations applied.
     * @param {integer} timeDelta Milliseconds since the last update.
     * @returns {boolean} False if entity not found.
     */
    updateEntity(entity: entity, timeDelta: number) {
        const x1 = entity.x;
        const y1 = entity.y;
        entity.applyPhysics(timeDelta);
        
        if ( !this.moveEntity(x1, y1, entity.x, entity.y) ) { return false; }
        if (entity.y > 999) {
            this.removeEntity(entity);
        }
        return true;
    }

    /**
     * Apply physics and update the locations of all active entities.
     * 
     * @param {integer} timeDelta Milliseconds since the last update.
     */
    update(timeDelta: number) {
        this.active.forEach(
            entity => this.updateEntity(entity, timeDelta)
        );
    }
}