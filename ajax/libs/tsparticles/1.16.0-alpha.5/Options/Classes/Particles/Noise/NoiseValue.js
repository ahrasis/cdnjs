"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoiseValue = void 0;
class NoiseValue {
    constructor() {
        this.value = 1;
        this.offset = 0;
    }
    load(data) {
        if (data !== undefined) {
            if (data.value !== undefined) {
                this.value = data.value === 0 ? this.value : data.value;
            }
            if (data.offset !== undefined) {
                this.offset = data.offset;
            }
        }
    }
}
exports.NoiseValue = NoiseValue;
