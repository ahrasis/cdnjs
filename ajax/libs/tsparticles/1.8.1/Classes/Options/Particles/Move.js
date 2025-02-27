"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Move = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Attract = require("./Attract");

var _MoveDirection = require("../../../Enums/MoveDirection");

var _OutMode = require("../../../Enums/OutMode");

var _Messages = require("../../Utils/Messages");

var Move = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Move, [{
    key: "out_mode",

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.move.out_mode", "particles.move.outMode");

      return this.outMode;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.move.out_mode", "particles.move.outMode");

      this.outMode = value;
    }
  }]);

  function Move() {
    (0, _classCallCheck2["default"])(this, Move);
    this.attract = void 0;
    this.bounce = void 0;
    this.direction = void 0;
    this.enable = void 0;
    this.outMode = void 0;
    this.random = void 0;
    this.speed = void 0;
    this.straight = void 0;
    this.attract = new _Attract.Attract();
    this.bounce = false;
    this.direction = _MoveDirection.MoveDirection.none;
    this.enable = true;
    this.outMode = _OutMode.OutMode.out;
    this.random = false;
    this.speed = 2;
    this.straight = false;
  }

  return Move;
}();

exports.Move = Move;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL01vdmUudHMiXSwibmFtZXMiOlsiTW92ZSIsIk1lc3NhZ2VzIiwiZGVwcmVjYXRlZCIsIm91dE1vZGUiLCJ2YWx1ZSIsImF0dHJhY3QiLCJib3VuY2UiLCJkaXJlY3Rpb24iLCJlbmFibGUiLCJyYW5kb20iLCJzcGVlZCIsInN0cmFpZ2h0IiwiQXR0cmFjdCIsIk1vdmVEaXJlY3Rpb24iLCJub25lIiwiT3V0TW9kZSIsIm91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztJQUVhQSxJOzs7O0FBQ1Q7Ozs7d0JBSStCO0FBQzNCQyx5QkFBU0MsVUFBVCxDQUFvQix5QkFBcEIsRUFBK0Msd0JBQS9DOztBQUVBLGFBQU8sS0FBS0MsT0FBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLb0JDLEssRUFBZ0I7QUFDaENILHlCQUFTQyxVQUFULENBQW9CLHlCQUFwQixFQUErQyx3QkFBL0M7O0FBRUEsV0FBS0MsT0FBTCxHQUFlQyxLQUFmO0FBQ0g7OztBQVdELGtCQUFjO0FBQUE7QUFBQSxTQVRQQyxPQVNPO0FBQUEsU0FSUEMsTUFRTztBQUFBLFNBUFBDLFNBT087QUFBQSxTQU5QQyxNQU1PO0FBQUEsU0FMUEwsT0FLTztBQUFBLFNBSlBNLE1BSU87QUFBQSxTQUhQQyxLQUdPO0FBQUEsU0FGUEMsUUFFTztBQUNWLFNBQUtOLE9BQUwsR0FBZSxJQUFJTyxnQkFBSixFQUFmO0FBQ0EsU0FBS04sTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCTSw2QkFBY0MsSUFBL0I7QUFDQSxTQUFLTixNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtMLE9BQUwsR0FBZVksaUJBQVFDLEdBQXZCO0FBQ0EsU0FBS1AsTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SU1vdmV9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lNb3ZlXCI7XG5pbXBvcnQge0F0dHJhY3R9IGZyb20gXCIuL0F0dHJhY3RcIjtcbmltcG9ydCB7TW92ZURpcmVjdGlvbn0gZnJvbSBcIi4uLy4uLy4uL0VudW1zL01vdmVEaXJlY3Rpb25cIjtcbmltcG9ydCB7T3V0TW9kZX0gZnJvbSBcIi4uLy4uLy4uL0VudW1zL091dE1vZGVcIjtcbmltcG9ydCB7SUF0dHJhY3R9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lBdHRyYWN0XCI7XG5pbXBvcnQge01lc3NhZ2VzfSBmcm9tIFwiLi4vLi4vVXRpbHMvTWVzc2FnZXNcIjtcblxuZXhwb3J0IGNsYXNzIE1vdmUgaW1wbGVtZW50cyBJTW92ZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGlzIHByb3BlcnR5IGlzIG9ic29sZXRlLCBwbGVhc2UgdXNlIHRoZSBuZXcgb3V0TW9kZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgb3V0X21vZGUoKTogT3V0TW9kZSB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJwYXJ0aWNsZXMubW92ZS5vdXRfbW9kZVwiLCBcInBhcnRpY2xlcy5tb3ZlLm91dE1vZGVcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3V0TW9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyBvdXRNb2RlXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHNldCBvdXRfbW9kZSh2YWx1ZTogT3V0TW9kZSkge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwicGFydGljbGVzLm1vdmUub3V0X21vZGVcIiwgXCJwYXJ0aWNsZXMubW92ZS5vdXRNb2RlXCIpO1xuXG4gICAgICAgIHRoaXMub3V0TW9kZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhdHRyYWN0OiBJQXR0cmFjdDtcbiAgICBwdWJsaWMgYm91bmNlOiBib29sZWFuO1xuICAgIHB1YmxpYyBkaXJlY3Rpb246IE1vdmVEaXJlY3Rpb247XG4gICAgcHVibGljIGVuYWJsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgb3V0TW9kZTogT3V0TW9kZTtcbiAgICBwdWJsaWMgcmFuZG9tOiBib29sZWFuO1xuICAgIHB1YmxpYyBzcGVlZDogbnVtYmVyO1xuICAgIHB1YmxpYyBzdHJhaWdodDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmF0dHJhY3QgPSBuZXcgQXR0cmFjdCgpO1xuICAgICAgICB0aGlzLmJvdW5jZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IE1vdmVEaXJlY3Rpb24ubm9uZTtcbiAgICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm91dE1vZGUgPSBPdXRNb2RlLm91dDtcbiAgICAgICAgdGhpcy5yYW5kb20gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgICAgIHRoaXMuc3RyYWlnaHQgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=