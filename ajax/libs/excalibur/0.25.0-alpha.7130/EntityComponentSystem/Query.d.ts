import { Entity } from './Entity';
import { Observable } from '../Util/Observable';
import { Component } from '..';
import { AddedEntity, RemovedEntity } from './System';
/**
 * Represents query for entities that match a list of types that is cached and observable
 *
 * Queries can be strongly typed by supplying a type union in the optional type parameter
 * ```typescript
 * const queryAB = new ex.Query<ComponentTypeA, ComponentTypeB>(['A', 'B']);
 * ```
 */
export declare class Query<T extends Component = Component> extends Observable<AddedEntity | RemovedEntity> {
    types: string[];
    entities: Entity<T>[];
    get key(): string;
    constructor(types: string[]);
    /**
     * Add an entity to the query, will only be added if the entity matches the query types
     * @param entity
     */
    addEntity(entity: Entity<T>): void;
    /**
     * If the entity is part of the query it will be removed regardless of types
     * @param entity
     */
    removeEntity(entity: Entity<T>): void;
    /**
     * Removes all entities and observers from the query
     */
    clear(): void;
    /**
     * Returns whether the entity's types match query
     * @param entity
     */
    matches(entity: Entity): boolean;
    /**
     * Returns whether the list of ComponentTypes match the query
     * @param types
     */
    matches(types: string[]): boolean;
}
