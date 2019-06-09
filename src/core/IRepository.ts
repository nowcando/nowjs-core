import { Predicate, Selector } from "./Func";

export type EntityKey = number | string | object;

/**
 * Repository Base operations
 */
export interface IRepository<T> {
    name: string;

    /**
     * Return average amount of the selected field.
     * @param selector Field name selector @example (person)=>person.Age.
     * @param predicate Filter data by this predicate function @example (person)=>person.Firstname="Saeed".
     */
    avg(selector: Selector<T>, predicate?: Predicate<T>): Promise<number>;
    /**
     * Return sum amount of the selected field.
     * @param selector Field name selector @example (person)=>person.Age.
     * @param predicate Filter data by this predicate function @example (person)=>person.Firstname="Saeed".
     */
    sum(selector: Selector<T>, predicate?: Predicate<T>): Promise<number>;

    /**
     * Return count amount of the selected field.
     * @param selector Field name selector @example (person)=>person.Age.
     * @param predicate Filter data by this predicate function @example (person)=>person.Firstname="Saeed".
     */
    count(selector?: Selector<T>, predicate?: Predicate<T>): Promise<number>;

    /**
     * Return true if all of items supports predicate otherwise returns false.
     * @param predicate @param predicate Filter data by this predicate function
     * @example (person)=>person.Firstname="Saeed".
     */
    all(predicate?: Predicate<T>): Promise<boolean>;

    /**
     * Return true if any of items supports predicate otherwise returns false.
     * @param predicate @param predicate Filter data by this predicate function
     * @example (person)=>person.Firstname="Saeed".
     */
    any(predicate?: Predicate<T>): Promise<boolean>;
    /**
     * Return all entities that support predicate.
     * @param predicate @param predicate Filter data by this predicate function
     * @example (person)=>person.Firstname="Saeed".
     */
    findAll(predicate?: Predicate<T>): Promise<T[]>;

    /**
     * Return first entity that support predicate
     * @param predicate @param predicate Filter data by this predicate function
     * @example (person)=>person.Firstname="Saeed".
     */
    findOne(predicate?: Predicate<T>): Promise<T>;

    /**
     * Find an entity by id field
     * @param id Entity id
     */
    find(id: EntityKey): Promise<T>;

   /**
    * Load entity form repository.
    * @param id entity id.
    */
    load(id: EntityKey): Promise<T>;

    /**
     * Save to repository
     * @param entity Entity in memory that you want to save in repository.
     */
    save(entity: T): Promise<T>;
}

