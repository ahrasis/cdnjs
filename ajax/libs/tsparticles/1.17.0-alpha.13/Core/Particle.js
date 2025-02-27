"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
const Updater_1 = require("./Particle/Updater");
const Particles_1 = require("../Options/Classes/Particles/Particles");
const Shape_1 = require("../Options/Classes/Particles/Shape/Shape");
const Enums_1 = require("../Enums");
const Utils_1 = require("../Utils");
class Particle {
    constructor(container, position, overrideOptions) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.container = container;
        this.fill = true;
        this.close = true;
        this.links = [];
        this.lastNoiseTime = 0;
        this.destroyed = false;
        const options = container.options;
        const particlesOptions = new Particles_1.Particles();
        particlesOptions.load(options.particles);
        if ((_a = overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) === null || _a === void 0 ? void 0 : _a.type) {
            const shapeType = overrideOptions.shape.type;
            this.shape = shapeType instanceof Array ? Utils_1.Utils.itemFromArray(shapeType) : shapeType;
            const shapeOptions = new Shape_1.Shape();
            shapeOptions.load(overrideOptions.shape);
            if (this.shape) {
                const shapeData = shapeOptions.options[this.shape];
                if (shapeData) {
                    this.shapeData = Utils_1.Utils.deepExtend({}, shapeData instanceof Array ? Utils_1.Utils.itemFromArray(shapeData) : shapeData);
                }
            }
        }
        else {
            const shapeType = particlesOptions.shape.type;
            this.shape = shapeType instanceof Array ? Utils_1.Utils.itemFromArray(shapeType) : shapeType;
            const shapeData = particlesOptions.shape.options[this.shape];
            if (shapeData) {
                this.shapeData = Utils_1.Utils.deepExtend({}, shapeData instanceof Array ? Utils_1.Utils.itemFromArray(shapeData) : shapeData);
            }
        }
        if (overrideOptions !== undefined) {
            particlesOptions.load(overrideOptions);
        }
        if (((_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.particles) !== undefined) {
            particlesOptions.load((_c = this.shapeData) === null || _c === void 0 ? void 0 : _c.particles);
        }
        this.fill = (_e = (_d = this.shapeData) === null || _d === void 0 ? void 0 : _d.fill) !== null && _e !== void 0 ? _e : this.fill;
        this.close = (_g = (_f = this.shapeData) === null || _f === void 0 ? void 0 : _f.close) !== null && _g !== void 0 ? _g : this.close;
        this.particlesOptions = particlesOptions;
        const noiseDelay = this.particlesOptions.move.noise.delay;
        this.noiseDelay =
            (noiseDelay.random.enable
                ? Utils_1.Utils.randomInRange(noiseDelay.random.minimumValue, noiseDelay.value)
                : noiseDelay.value) * 1000;
        container.retina.initParticle(this);
        const color = this.particlesOptions.color;
        const sizeValue = (_h = this.sizeValue) !== null && _h !== void 0 ? _h : container.retina.sizeValue;
        const randomSize = typeof this.particlesOptions.size.random === "boolean"
            ? this.particlesOptions.size.random
            : this.particlesOptions.size.random.enable;
        this.size = {
            value: randomSize && this.randomMinimumSize !== undefined
                ? Utils_1.Utils.randomInRange(this.randomMinimumSize, sizeValue)
                : sizeValue,
        };
        this.direction = this.particlesOptions.move.direction;
        this.bubble = {
            inRange: false,
        };
        this.initialVelocity = this.calculateVelocity();
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };
        const rotateOptions = this.particlesOptions.rotate;
        const initialAngle = rotateOptions.path
            ? Math.atan2(this.initialVelocity.vertical, this.initialVelocity.horizontal)
            : 0;
        const degAngle = rotateOptions.random ? Math.random() * 360 : rotateOptions.value;
        this.angle = initialAngle + (degAngle * Math.PI) / 180;
        this.rotateDirection = rotateOptions.direction;
        if (this.rotateDirection === Enums_1.RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);
            this.rotateDirection = index > 0 ? Enums_1.RotateDirection.counterClockwise : Enums_1.RotateDirection.clockwise;
        }
        const sizeAnimation = this.particlesOptions.size.animation;
        if (sizeAnimation.enable) {
            switch (sizeAnimation.startValue) {
                case Enums_1.StartValueType.min:
                    if (!randomSize) {
                        const pxRatio = container.retina.pixelRatio;
                        this.size.value = sizeAnimation.minimumValue * pxRatio;
                    }
                    break;
            }
            this.size.status = Enums_1.SizeAnimationStatus.increasing;
            this.size.velocity = ((_j = this.sizeAnimationSpeed) !== null && _j !== void 0 ? _j : container.retina.sizeAnimationSpeed) / 100;
            if (!sizeAnimation.sync) {
                this.size.velocity = this.size.velocity * Math.random();
            }
        }
        this.color = Utils_1.ColorUtils.colorToHsl(color);
        const colorAnimation = this.particlesOptions.color.animation;
        if (colorAnimation.enable) {
            this.colorVelocity = colorAnimation.speed / 100;
            if (!colorAnimation.sync) {
                this.colorVelocity = this.colorVelocity * Math.random();
            }
        }
        else {
            this.colorVelocity = 0;
        }
        if (colorAnimation.enable && !colorAnimation.sync && this.color) {
            this.color.h = Math.random() * 360;
        }
        this.position = this.calcPosition(this.container, position);
        this.offset = {
            x: 0,
            y: 0,
        };
        if (this.particlesOptions.collisions.enable && !this.checkOverlap(position)) {
            throw new Error();
        }
        const opacityOptions = this.particlesOptions.opacity;
        const randomOpacity = opacityOptions.random;
        const opacityValue = opacityOptions.value;
        this.opacity = {
            value: randomOpacity.enable ? Utils_1.Utils.randomInRange(randomOpacity.minimumValue, opacityValue) : opacityValue,
        };
        const opacityAnimation = opacityOptions.animation;
        if (opacityAnimation.enable) {
            this.opacity.status = Enums_1.OpacityAnimationStatus.increasing;
            this.opacity.velocity = opacityAnimation.speed / 100;
            if (!opacityAnimation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }
        let drawer = container.drawers.get(this.shape);
        if (!drawer) {
            drawer = Utils_1.Plugins.getShapeDrawer(this.shape);
            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }
        this.loadImageShape(container, drawer);
        this.stroke =
            this.particlesOptions.stroke instanceof Array
                ? Utils_1.Utils.itemFromArray(this.particlesOptions.stroke)
                : this.particlesOptions.stroke;
        this.strokeColor = Utils_1.ColorUtils.colorToHsl(this.stroke.color);
        if (typeof this.stroke.color !== "string") {
            const strokeColorAnimation = (_k = this.stroke.color) === null || _k === void 0 ? void 0 : _k.animation;
            if (strokeColorAnimation && this.strokeColor) {
                if (strokeColorAnimation.enable) {
                    this.strokeColorVelocity = colorAnimation.speed / 100;
                    if (!strokeColorAnimation.sync) {
                        this.strokeColorVelocity = this.strokeColorVelocity * Math.random();
                    }
                }
                else {
                    this.strokeColorVelocity = 0;
                }
                if (strokeColorAnimation.enable && !strokeColorAnimation.sync && this.color) {
                    this.strokeColor.h = Math.random() * 360;
                }
            }
        }
        this.shadowColor = Utils_1.ColorUtils.colorToRgb(this.particlesOptions.shadow.color);
        this.updater = new Updater_1.Updater(this.container, this);
    }
    update(delta) {
        this.links = [];
        this.updater.update(delta);
    }
    draw(delta) {
        var _a;
        if (((_a = this.image) === null || _a === void 0 ? void 0 : _a.loaded) === false) {
            return;
        }
        this.container.canvas.drawParticle(this, delta);
    }
    isOverlapping() {
        const container = this.container;
        let collisionFound = false;
        const pos1 = this.getPosition();
        for (const p2 of container.particles.array.filter((t) => t != this)) {
            const pos2 = p2.getPosition();
            const dist = Utils_1.Utils.getDistance(pos1, pos2);
            if (dist <= this.size.value + p2.size.value) {
                collisionFound = true;
                break;
            }
        }
        return collisionFound;
    }
    startInfection(stage) {
        const container = this.container;
        const options = container.options;
        const stages = options.infection.stages;
        const stagesCount = stages.length;
        if (stage > stagesCount || stage < 0) {
            return;
        }
        this.infectionDelay = 0;
        this.infectionDelayStage = stage;
    }
    updateInfectionStage(stage) {
        const container = this.container;
        const options = container.options;
        const stagesCount = options.infection.stages.length;
        if (stage > stagesCount || stage < 0 || (this.infectionStage !== undefined && this.infectionStage > stage)) {
            return;
        }
        if (this.infectionTimeout !== undefined) {
            window.clearTimeout(this.infectionTimeout);
        }
        this.infectionStage = stage;
        this.infectionTime = 0;
    }
    updateInfection(delta) {
        const options = this.container.options;
        const infection = options.infection;
        const stages = options.infection.stages;
        const stagesCount = stages.length;
        if (this.infectionDelay !== undefined && this.infectionDelayStage !== undefined) {
            const stage = this.infectionDelayStage;
            if (stage > stagesCount || stage < 0) {
                return;
            }
            if (this.infectionDelay > infection.delay * 1000) {
                this.infectionStage = stage;
                this.infectionTime = 0;
                delete this.infectionDelay;
                delete this.infectionDelayStage;
            }
            else {
                this.infectionDelay += delta;
            }
        }
        else {
            delete this.infectionDelay;
            delete this.infectionDelayStage;
        }
        if (this.infectionStage !== undefined && this.infectionTime !== undefined) {
            const infectionStage = stages[this.infectionStage];
            if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
                if (this.infectionTime > infectionStage.duration * 1000) {
                    this.nextInfectionStage();
                }
                else {
                    this.infectionTime += delta;
                }
            }
            else {
                this.infectionTime += delta;
            }
        }
        else {
            delete this.infectionStage;
            delete this.infectionTime;
        }
    }
    getPosition() {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
        };
    }
    getFillColor() {
        var _a;
        return (_a = this.bubble.color) !== null && _a !== void 0 ? _a : this.color;
    }
    getStrokeColor() {
        var _a, _b;
        return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : this.strokeColor) !== null && _b !== void 0 ? _b : this.color;
    }
    destroy() {
        this.destroyed = true;
    }
    checkOverlap(position, iterations = 0) {
        const container = this.container;
        if (!container.particles.count) {
            return true;
        }
        if (iterations >= container.particles.count) {
            return false;
        }
        const overlapping = this.isOverlapping();
        console.log(overlapping);
        if (overlapping) {
            this.position.x = position ? position.x : Math.random() * container.canvas.size.width;
            this.position.y = position ? position.y : Math.random() * container.canvas.size.height;
            return this.checkOverlap(undefined, iterations + 1);
        }
        return true;
    }
    nextInfectionStage() {
        const options = this.container.options;
        const stagesCount = options.infection.stages.length;
        if (stagesCount <= 0 || this.infectionStage === undefined) {
            return;
        }
        this.infectionTime = 0;
        if (stagesCount <= ++this.infectionStage) {
            if (options.infection.cure) {
                delete this.infectionStage;
                delete this.infectionTime;
                return;
            }
            else {
                this.infectionStage = 0;
                this.infectionTime = 0;
            }
        }
    }
    calcPosition(container, position) {
        var _a, _b;
        for (const [, plugin] of container.plugins) {
            const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
            if (pluginPos !== undefined) {
                return Utils_1.Utils.deepExtend({}, pluginPos);
            }
        }
        const pos = {
            x: (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * container.canvas.size.width,
            y: (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * container.canvas.size.height,
        };
        const outMode = this.particlesOptions.move.outMode;
        if (Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounce) || Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounceHorizontal)) {
            if (pos.x > container.canvas.size.width - this.size.value * 2) {
                pos.x -= this.size.value;
            }
            else if (pos.x < this.size.value * 2) {
                pos.x += this.size.value;
            }
        }
        if (Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounce) || Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounceVertical)) {
            if (pos.y > container.canvas.size.height - this.size.value * 2) {
                pos.y -= this.size.value;
            }
            else if (pos.y < this.size.value * 2) {
                pos.y += this.size.value;
            }
        }
        return pos;
    }
    calculateVelocity() {
        const baseVelocity = Utils_1.Utils.getParticleBaseVelocity(this);
        const res = {
            horizontal: 0,
            vertical: 0,
        };
        const moveOptions = this.particlesOptions.move;
        const rad = (Math.PI / 180) * moveOptions.angle;
        const rad45 = Math.PI / 4;
        const range = {
            left: Math.sin(rad45 + rad / 2) - Math.sin(rad45 - rad / 2),
            right: Math.cos(rad45 + rad / 2) - Math.cos(rad45 - rad / 2),
        };
        if (moveOptions.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;
            if (moveOptions.random) {
                res.horizontal += Utils_1.Utils.randomInRange(range.left, range.right) / 2;
                res.vertical += Utils_1.Utils.randomInRange(range.left, range.right) / 2;
            }
        }
        else {
            res.horizontal = baseVelocity.x + Utils_1.Utils.randomInRange(range.left, range.right) / 2;
            res.vertical = baseVelocity.y + Utils_1.Utils.randomInRange(range.left, range.right) / 2;
        }
        return res;
    }
    loadImageShape(container, drawer) {
        var _a, _b, _c, _d;
        if (!(this.shape === Enums_1.ShapeType.image || this.shape === Enums_1.ShapeType.images)) {
            return;
        }
        const shape = this.particlesOptions.shape;
        const imageDrawer = drawer;
        const imagesOptions = shape.options[this.shape];
        const images = imageDrawer.getImages(container).images;
        const image = Utils_1.Utils.itemFromArray(images);
        const optionsImage = (imagesOptions instanceof Array
            ? imagesOptions.find((t) => t.src === image.source)
            : imagesOptions);
        const color = this.getFillColor();
        let imageRes;
        if ((image === null || image === void 0 ? void 0 : image.svgData) !== undefined && optionsImage.replaceColor && color) {
            const svgColoredData = Utils_1.Utils.replaceColorSvg(image, color, this.opacity.value);
            const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
            const domUrl = window.URL || window.webkitURL || window;
            const url = domUrl.createObjectURL(svg);
            const img = new Image();
            imageRes = {
                data: image,
                loaded: false,
                ratio: optionsImage.width / optionsImage.height,
                replaceColor: (_a = optionsImage.replaceColor) !== null && _a !== void 0 ? _a : optionsImage.replace_color,
                source: optionsImage.src,
            };
            img.addEventListener("load", () => {
                if (this.image) {
                    this.image.loaded = true;
                    image.element = img;
                }
                domUrl.revokeObjectURL(url);
            });
            img.addEventListener("error", () => {
                domUrl.revokeObjectURL(url);
                Utils_1.Utils.loadImage(optionsImage.src).then((img2) => {
                    if (this.image) {
                        image.element = img2.element;
                        this.image.loaded = true;
                    }
                });
            });
            img.src = url;
        }
        else {
            imageRes = {
                data: image,
                loaded: true,
                ratio: optionsImage.width / optionsImage.height,
                replaceColor: (_b = optionsImage.replaceColor) !== null && _b !== void 0 ? _b : optionsImage.replace_color,
                source: optionsImage.src,
            };
        }
        if (!imageRes.ratio) {
            imageRes.ratio = 1;
        }
        const fill = (_c = optionsImage.fill) !== null && _c !== void 0 ? _c : this.fill;
        const close = (_d = optionsImage.close) !== null && _d !== void 0 ? _d : this.close;
        return {
            image: imageRes,
            fill,
            close,
        };
    }
}
exports.Particle = Particle;
