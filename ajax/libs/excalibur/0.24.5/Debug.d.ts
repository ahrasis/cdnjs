import { DebugFlags, ColorBlindFlags } from './DebugFlags';
import { Pair } from './Collision/Pair';
import { Engine } from './Engine';
/**
 * Debug stats containing current and previous frame statistics
 */
export interface DebugStats {
    currFrame: FrameStats;
    prevFrame: FrameStats;
}
/**
 * Hash containing the [[Pair.id]]s of pairs that collided in a frame
 */
export interface CollidersHash {
    [pairId: string]: Pair;
}
/**
 * Represents a frame's individual statistics
 */
export interface FrameStatistics {
    /**
     * The number of the frame
     */
    id: number;
    /**
     * Gets the frame's delta (time since last frame scaled by [[Engine.timescale]]) (in ms)
     */
    delta: number;
    /**
     * Gets the frame's frames-per-second (FPS)
     */
    fps: number;
    /**
     * Duration statistics (in ms)
     */
    duration: FrameDurationStats;
    /**
     * Actor statistics
     */
    actors: FrameActorStats;
    /**
     * Physics statistics
     */
    physics: PhysicsStatistics;
}
/**
 * Represents actor stats for a frame
 */
export interface FrameActorStats {
    /**
     * Gets the frame's number of actors (alive)
     */
    alive: number;
    /**
     * Gets the frame's number of actors (killed)
     */
    killed: number;
    /**
     * Gets the frame's number of remaining actors (alive - killed)
     */
    remaining: number;
    /**
     * Gets the frame's number of UI actors
     */
    ui: number;
    /**
     * Gets the frame's number of total actors (remaining + UI)
     */
    total: number;
}
/**
 * Represents duration stats for a frame
 */
export interface FrameDurationStats {
    /**
     * Gets the frame's total time to run the update function (in ms)
     */
    update: number;
    /**
     * Gets the frame's total time to run the draw function (in ms)
     */
    draw: number;
    /**
     * Gets the frame's total render duration (update + draw duration) (in ms)
     */
    total: number;
}
/**
 * Represents physics stats for the current frame
 */
export interface PhysicsStatistics {
    /**
     * Gets the number of broadphase collision pairs which
     */
    pairs: number;
    /**
     * Gets the number of actual collisions
     */
    collisions: number;
    /**
     * A Hash storing the [[Pair.id]]s of [[Pair]]s that collided in the frame
     */
    collidersHash: CollidersHash;
    /**
     * Gets the number of fast moving bodies using raycast continuous collisions in the scene
     */
    fastBodies: number;
    /**
     * Gets the number of bodies that had a fast body collision resolution
     */
    fastBodyCollisions: number;
    /**
     * Gets the time it took to calculate the broadphase pairs
     */
    broadphase: number;
    /**
     * Gets the time it took to calculate the narrowphase
     */
    narrowphase: number;
}
/**
 * Debug statistics and flags for Excalibur. If polling these values, it would be
 * best to do so on the `postupdate` event for [[Engine]], after all values have been
 * updated during a frame.
 */
export declare class Debug implements DebugFlags {
    private _engine;
    constructor(engine: Engine);
    /**
     * Performance statistics
     */
    stats: DebugStats;
    /**
     * Correct or simulate color blindness using [[ColorBlindness]] post processor.
     * @warning Will reduce FPS.
     */
    colorBlindMode: ColorBlindFlags;
}
/**
 * Implementation of a frame's stats. Meant to have values copied via [[FrameStats.reset]], avoid
 * creating instances of this every frame.
 */
export declare class FrameStats implements FrameStatistics {
    private _id;
    private _delta;
    private _fps;
    private _actorStats;
    private _durationStats;
    private _physicsStats;
    /**
     * Zero out values or clone other IFrameStat stats. Allows instance reuse.
     *
     * @param [otherStats] Optional stats to clone
     */
    reset(otherStats?: FrameStatistics): void;
    /**
     * Provides a clone of this instance.
     */
    clone(): FrameStats;
    /**
     * Gets the frame's id
     */
    get id(): number;
    /**
     * Sets the frame's id
     */
    set id(value: number);
    /**
     * Gets the frame's delta (time since last frame)
     */
    get delta(): number;
    /**
     * Sets the frame's delta (time since last frame). Internal use only.
     * @internal
     */
    set delta(value: number);
    /**
     * Gets the frame's frames-per-second (FPS)
     */
    get fps(): number;
    /**
     * Sets the frame's frames-per-second (FPS). Internal use only.
     * @internal
     */
    set fps(value: number);
    /**
     * Gets the frame's actor statistics
     */
    get actors(): FrameActorStats;
    /**
     * Gets the frame's duration statistics
     */
    get duration(): FrameDurationStats;
    /**
     * Gets the frame's physics statistics
     */
    get physics(): PhysicsStats;
}
export declare class PhysicsStats implements PhysicsStatistics {
    private _pairs;
    private _collisions;
    private _collidersHash;
    private _fastBodies;
    private _fastBodyCollisions;
    private _broadphase;
    private _narrowphase;
    /**
     * Zero out values or clone other IPhysicsStats stats. Allows instance reuse.
     *
     * @param [otherStats] Optional stats to clone
     */
    reset(otherStats?: PhysicsStatistics): void;
    /**
     * Provides a clone of this instance.
     */
    clone(): PhysicsStatistics;
    get pairs(): number;
    set pairs(value: number);
    get collisions(): number;
    set collisions(value: number);
    get collidersHash(): CollidersHash;
    set collidersHash(colliders: CollidersHash);
    get fastBodies(): number;
    set fastBodies(value: number);
    get fastBodyCollisions(): number;
    set fastBodyCollisions(value: number);
    get broadphase(): number;
    set broadphase(value: number);
    get narrowphase(): number;
    set narrowphase(value: number);
}
