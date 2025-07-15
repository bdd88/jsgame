import { entity } from "./entity";

/**
 * Collection of entities, and a location map of their positions on the x/y grid.
 */
export class entities {
    /** All entities that exist. */
    list = new Set();
    /** Position of entities on an integer x/y grid. */
    locations = new Map();
    /** Entities that should have physics applied every update. */
    active = new Set();
    /** Entities that can have simulation skipped some or all of the time. */
    inactive = new Set();

    /**
     * Place a new entity object into the location map.
     * 
     * @param {entity} entity Entity to place.
     * @returns {boolean} False if the entity was not found.
     */
    placeEntity(entity) {
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
    moveEntity(x, y, targetX, targetY) {
        const location = x + ',' + y;
        const newLocation = targetX + ',' + targetY;
        if ( !this.locations.has(location) ) { return false; }

        const entity = this.locations.get(location);
        entity.posX = targetX;
        entity.posY = targetY;
        this.locations.delete(location);
        this.locations.set(newLocation, entity);
        this.active.add(entity);
        return true;
    }

    /**
     * Remove an entity from the location map, and then delete it from the entity list.
     * 
     * @param {entity} entity Entity to delete.
     * @returns {boolean} False if the entity was not found, or was not fully removed.
     */
    removeEntity(entity) {
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
    updateEntity(entity, timeDelta) {
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
    update(timeDelta) {
        this.active.forEach(
            entity => this.updateEntity(entity, timeDelta)
        );
    }
}