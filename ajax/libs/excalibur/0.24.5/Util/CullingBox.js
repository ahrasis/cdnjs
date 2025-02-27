import { Vector } from '../Algebra';
import { Color } from '../Drawing/Color';
var CullingBox = /** @class */ (function () {
    function CullingBox() {
        this._topLeft = new Vector(0, 0);
        this._topRight = new Vector(0, 0);
        this._bottomLeft = new Vector(0, 0);
        this._bottomRight = new Vector(0, 0);
    }
    CullingBox.prototype.isSpriteOffScreen = function (actor, engine) {
        var drawingWidth = actor.currentDrawing.drawWidth;
        var drawingHeight = actor.currentDrawing.drawHeight;
        var rotation = actor.rotation;
        var anchor = actor.center;
        var worldPos = actor.getWorldPos();
        this._topLeft.x = worldPos.x - drawingWidth / 2;
        this._topLeft.y = worldPos.y - drawingHeight / 2;
        this._topLeft = this._topLeft.rotate(rotation, anchor);
        this._topRight.x = worldPos.x + drawingWidth / 2;
        this._topRight.y = worldPos.y - drawingHeight / 2;
        this._topRight = this._topRight.rotate(rotation, anchor);
        this._bottomLeft.x = worldPos.x - drawingWidth / 2;
        this._bottomLeft.y = worldPos.y + drawingHeight / 2;
        this._bottomLeft = this._bottomLeft.rotate(rotation, anchor);
        this._bottomRight.x = worldPos.x + drawingWidth / 2;
        this._bottomRight.y = worldPos.y + drawingHeight / 2;
        this._bottomRight = this._bottomRight.rotate(rotation, anchor);
        ///
        var topLeftScreen = engine.worldToScreenCoordinates(this._topLeft);
        var topRightScreen = engine.worldToScreenCoordinates(this._topRight);
        var bottomLeftScreen = engine.worldToScreenCoordinates(this._bottomLeft);
        var bottomRightScreen = engine.worldToScreenCoordinates(this._bottomRight);
        this._xCoords = [];
        this._yCoords = [];
        this._xCoords.push(topLeftScreen.x, topRightScreen.x, bottomLeftScreen.x, bottomRightScreen.x);
        this._yCoords.push(topLeftScreen.y, topRightScreen.y, bottomLeftScreen.y, bottomRightScreen.y);
        this._xMin = Math.min.apply(null, this._xCoords);
        this._yMin = Math.min.apply(null, this._yCoords);
        this._xMax = Math.max.apply(null, this._xCoords);
        this._yMax = Math.max.apply(null, this._yCoords);
        var minWorld = engine.screenToWorldCoordinates(new Vector(this._xMin, this._yMin));
        var maxWorld = engine.screenToWorldCoordinates(new Vector(this._xMax, this._yMax));
        this._xMinWorld = minWorld.x;
        this._yMinWorld = minWorld.y;
        this._xMaxWorld = maxWorld.x;
        this._yMaxWorld = maxWorld.y;
        var boundingPoints = [
            new Vector(this._xMin, this._yMin),
            new Vector(this._xMax, this._yMin),
            new Vector(this._xMin, this._yMax),
            new Vector(this._xMax, this._yMax) // bottom right
        ];
        // sprite can be wider than canvas screen (and still visible within canvas)
        // top or bottom of sprite must be within canvas
        if (boundingPoints[0].x < 0 &&
            boundingPoints[1].x > engine.canvas.clientWidth &&
            (boundingPoints[0].y > 0 || boundingPoints[2].y < engine.canvas.clientHeight)) {
            return false;
        }
        // sprite can be taller than canvas screen (and still visible within canvas)
        // left or right of sprite must be within canvas
        if (boundingPoints[0].y < 0 &&
            boundingPoints[2].y > engine.canvas.clientHeight &&
            (boundingPoints[1].x > 0 || boundingPoints[0].x < engine.canvas.clientWidth)) {
            return false;
        }
        // otherwise if any corner is visible, we're not offscreen
        for (var i = 0; i < boundingPoints.length; i++) {
            if (boundingPoints[i].x > 0 &&
                boundingPoints[i].y > 0 &&
                boundingPoints[i].x < engine.canvas.clientWidth &&
                boundingPoints[i].y < engine.canvas.clientHeight) {
                return false;
            }
        }
        return true;
    };
    CullingBox.prototype.debugDraw = function (ctx) {
        // bounding rectangle
        ctx.beginPath();
        ctx.strokeStyle = Color.White.toString();
        ctx.rect(this._xMinWorld, this._yMinWorld, this._xMaxWorld - this._xMinWorld, this._yMaxWorld - this._yMinWorld);
        ctx.stroke();
        ctx.fillStyle = Color.Red.toString();
        ctx.beginPath();
        ctx.arc(this._topLeft.x, this._topLeft.y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = Color.Green.toString();
        ctx.beginPath();
        ctx.arc(this._topRight.x, this._topRight.y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = Color.Blue.toString();
        ctx.beginPath();
        ctx.arc(this._bottomLeft.x, this._bottomLeft.y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = Color.Magenta.toString();
        ctx.beginPath();
        ctx.arc(this._bottomRight.x, this._bottomRight.y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };
    return CullingBox;
}());
export { CullingBox };
//# sourceMappingURL=CullingBox.js.map