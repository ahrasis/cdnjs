"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
const Attract_1 = require("./Attract");
const Enums_1 = require("../../../Enums");
const Trail_1 = require("./Trail");
const Noise_1 = require("./Noise/Noise");
class Move {
    constructor() {
        this.attract = new Attract_1.Attract();
        this.direction = Enums_1.MoveDirection.none;
        this.enable = false;
        this.noise = new Noise_1.Noise();
        this.outMode = Enums_1.OutMode.out;
        this.random = false;
        this.speed = 2;
        this.straight = false;
        this.trail = new Trail_1.Trail();
        this.vibrate = false;
        this.warp = false;
    }
    get collisions() {
        return false;
    }
    set collisions(value) {
    }
    get bounce() {
        return this.collisions;
    }
    set bounce(value) {
        this.collisions = value;
    }
    get out_mode() {
        return this.outMode;
    }
    set out_mode(value) {
        this.outMode = value;
    }
    load(data) {
        var _a;
        if (data !== undefined) {
            this.attract.load(data.attract);
            if (data.direction !== undefined) {
                this.direction = data.direction;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            this.noise.load(data.noise);
            const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;
            if (outMode !== undefined) {
                this.outMode = outMode;
            }
            if (data.random !== undefined) {
                this.random = data.random;
            }
            if (data.speed !== undefined) {
                this.speed = data.speed;
            }
            if (data.straight !== undefined) {
                this.straight = data.straight;
            }
            this.trail.load(data.trail);
            if (data.vibrate !== undefined) {
                this.vibrate = data.vibrate;
            }
            if (data.warp !== undefined) {
                this.warp = data.warp;
            }
        }
    }
}
exports.Move = Move;
