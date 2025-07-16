import { entity } from "./entity.js";
import { util } from "./util.js";

/** Collection of entities, and a location map of their positions on the x/y grid. */
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

    /** Place a new entity object into the location map. */
    placeEntity(entity: entity) {
        const location = entity.x + ',' + entity.y;
        if ( this.locations.has(location) ) { return false; }
        this.list.add(entity);
        this.active.add(entity);
        this.locations.set(location, entity);
        return true;
    }

    /** Move an entity at a location to a new location. */
    moveEntity(x: number, y: number, targetX: number, targetY: number) {
        const location = x + ',' + y;
        const newLocation = targetX + ',' + targetY;
        if ( !this.locations.has(location) ) { return false; }
        if (this.locations.get(location) === undefined) { return false; }
        const entityInstance = this.locations.get(location) as entity;
        entityInstance.x = targetX;
        entityInstance.y = targetY;
        this.locations.delete(location);
        this.locations.set(newLocation, entityInstance);
        this.active.add(entityInstance);
        return true;
    }

    /** Remove an entity from the location map, and then delete it from the entity list. */
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

    /** Apply physics and update the locations of all active entities. */
    update(timeDelta: number) {
        this.active.forEach(
            entity => this.updateEntity(entity, timeDelta)
        );
    }
}