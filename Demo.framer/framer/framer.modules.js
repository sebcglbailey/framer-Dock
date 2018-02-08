require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Dock":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Dock = (function(superClass) {
  extend(Dock, superClass);

  function Dock(options1) {
    var base;
    this.options = options1 != null ? options1 : {};
    if ((base = this.options).margin == null) {
      base.margin = 10;
    }
    Dock.__super__.constructor.call(this, this.options);
    this.options.availableFrame = {
      x: this.margin,
      y: this.margin,
      width: this.width - this.margin * 2,
      height: this.height - this.margin * 2
    };
  }

  Dock.prototype.addLayer = function(position, options) {
    var layer;
    if (options == null) {
      options = {};
    }
    if (this.options.backgroundColor == null) {
      this.backgroundColor = null;
    }
    if (typeof position === "object") {
      options = position;
      position = "fill";
    }
    if (this.options.availableFrame.x > 0 && this.options.availableFrame.y > 0 && this.options.availableFrame.width > 0 && this.options.availableFrame.height > 0) {
      layer = new Layer({
        parent: this
      });
      if (options.width == null) {
        options.width = 200;
      }
      if (options.height == null) {
        options.height = 200;
      }
      if (options.backgroundColor == null) {
        options.backgroundColor = options.color || new Color("#222").alpha(0.5);
      }
      layer.props = options;
      layer.position = position;
      return this.drawLayer(position, layer);
    } else {
      Utils.throwInStudioOrWarnInProduction("Not enough space to add layer in the canvas");
    }
  };

  Dock.prototype.insertLayer = function(layer, position) {
    if (position == null) {
      position = "top";
    }
    if (this.options.backgroundColor == null) {
      this.backgroundColor = null;
    }
    if (this.options.availableFrame.x > 0 && this.options.availableFrame.y > 0 && this.options.availableFrame.width > 0 && this.options.availableFrame.height > 0 && (layer != null)) {
      layer.position = position;
      layer.parent = this;
      return this.drawLayer(position, layer);
    } else if (layer != null) {
      Utils.throwInStudioOrWarnInProduction("Not enough space to add this layer in the canvas");
    } else {
      return Utils.throwInStudioOrWarnInProduction("Cannot add layer undefined to the Dock");
    }
  };

  Dock.prototype.drawLayer = function(position, layer) {
    if (position === "top") {
      layer.props = {
        y: this.options.availableFrame.y,
        x: this.options.availableFrame.x,
        width: this.options.availableFrame.width
      };
      this.options.availableFrame.y += layer.height + this.options.margin;
      return this.options.availableFrame.height -= layer.height + this.options.margin;
    } else if (position === "left") {
      layer.props = {
        y: this.options.availableFrame.y,
        x: this.options.availableFrame.x,
        height: this.options.availableFrame.height
      };
      this.options.availableFrame.x += layer.width + this.options.margin;
      return this.options.availableFrame.width -= layer.width + this.options.margin;
    } else if (position === "bottom") {
      layer.props = {
        x: this.options.availableFrame.x,
        maxY: this.options.availableFrame.height + this.options.availableFrame.y,
        width: this.options.availableFrame.width
      };
      return this.options.availableFrame.height -= layer.height + this.options.margin;
    } else if (position === "right") {
      layer.props = {
        y: this.options.availableFrame.y,
        maxX: this.options.availableFrame.width + this.options.availableFrame.x,
        height: this.options.availableFrame.height
      };
      return this.options.availableFrame.width -= layer.width + this.options.margin;
    } else if (position === "fill" || position === void 0) {
      layer.props = {
        y: this.options.availableFrame.y,
        x: this.options.availableFrame.x,
        width: this.options.availableFrame.width,
        height: this.options.availableFrame.height
      };
      return this.options.availableFrame = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
  };

  Dock.define("availableFrame", {
    get: function() {
      return this.options.availableFrame;
    },
    set: function(value) {
      return this.options.availableFrame = value;
    }
  });

  Dock.define("margin", {
    get: function() {
      return this.options.margin;
    },
    set: function(value) {
      var child, diff, i, len, originalMargin, ref, results;
      originalMargin = this.options.margin;
      diff = value - originalMargin;
      this.options.margin = value;
      this.options.availableFrame = {
        x: value,
        y: value,
        width: this.width - value * 2,
        height: this.height - value * 2
      };
      ref = this.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        results.push(this.drawLayer(child.position, child));
      }
      return results;
    }
  });

  return Dock;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NlYmFzdGlhbi9Eb2N1bWVudHMvUm9ndWUgT25lL0dpdEh1Yi9mcmFtZXItRG9jay9EZW1vLmZyYW1lci9tb2R1bGVzL0RvY2suY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBleHBvcnRzLkRvY2sgZXh0ZW5kcyBMYXllclxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMubWFyZ2luID89IDEwXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUgPVxuXHRcdFx0eDogQG1hcmdpblxuXHRcdFx0eTogQG1hcmdpblxuXHRcdFx0d2lkdGg6IEB3aWR0aCAtIEBtYXJnaW4qMlxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0IC0gQG1hcmdpbioyXG5cblx0YWRkTGF5ZXI6IChwb3NpdGlvbiwgb3B0aW9ucz17fSkgLT5cblx0XHR1bmxlc3MgQG9wdGlvbnMuYmFja2dyb3VuZENvbG9yPyB0aGVuIEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cblx0XHRpZiB0eXBlb2YgcG9zaXRpb24gPT0gXCJvYmplY3RcIlxuXHRcdFx0b3B0aW9ucyA9IHBvc2l0aW9uXG5cdFx0XHRwb3NpdGlvbiA9IFwiZmlsbFwiXG5cblx0XHRpZiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54ID4gMCAmJiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS55ID4gMCAmJiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aCA+IDAgJiYgQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUuaGVpZ2h0ID4gMFxuXHRcdFx0bGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFxuXHRcdFx0b3B0aW9ucy53aWR0aCA/PSAyMDBcblx0XHRcdG9wdGlvbnMuaGVpZ2h0ID89IDIwMFxuXHRcdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gb3B0aW9ucy5jb2xvciB8fCBuZXcgQ29sb3IoXCIjMjIyXCIpLmFscGhhKDAuNSlcblx0XHRcdGxheWVyLnByb3BzID0gb3B0aW9uc1xuXG5cdFx0XHRsYXllci5wb3NpdGlvbiA9IHBvc2l0aW9uXG5cblx0XHRcdEBkcmF3TGF5ZXIgcG9zaXRpb24sIGxheWVyXG5cblx0XHRlbHNlXG5cdFx0XHRVdGlscy50aHJvd0luU3R1ZGlvT3JXYXJuSW5Qcm9kdWN0aW9uIFwiTm90IGVub3VnaCBzcGFjZSB0byBhZGQgbGF5ZXIgaW4gdGhlIGNhbnZhc1wiXG5cdFx0XHRyZXR1cm5cblxuXHRpbnNlcnRMYXllcjogKGxheWVyLCBwb3NpdGlvbiA9IFwidG9wXCIpIC0+XG5cdFx0dW5sZXNzIEBvcHRpb25zLmJhY2tncm91bmRDb2xvcj8gdGhlbiBAYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXG5cdFx0aWYgQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueCA+IDAgJiYgQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueSA+IDAgJiYgQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUud2lkdGggPiAwICYmIEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLmhlaWdodCA+IDAgJiYgbGF5ZXI/XG5cdFx0XHRsYXllci5wb3NpdGlvbiA9IHBvc2l0aW9uXG5cdFx0XHRsYXllci5wYXJlbnQgPSBAXG5cblx0XHRcdEBkcmF3TGF5ZXIgcG9zaXRpb24sIGxheWVyXG5cblx0XHRlbHNlIGlmIGxheWVyP1xuXHRcdFx0VXRpbHMudGhyb3dJblN0dWRpb09yV2FybkluUHJvZHVjdGlvbiBcIk5vdCBlbm91Z2ggc3BhY2UgdG8gYWRkIHRoaXMgbGF5ZXIgaW4gdGhlIGNhbnZhc1wiXG5cdFx0XHRyZXR1cm5cblxuXHRcdGVsc2Vcblx0XHRcdFV0aWxzLnRocm93SW5TdHVkaW9Pcldhcm5JblByb2R1Y3Rpb24gXCJDYW5ub3QgYWRkIGxheWVyIHVuZGVmaW5lZCB0byB0aGUgRG9ja1wiXG5cblx0ZHJhd0xheWVyOiAocG9zaXRpb24sIGxheWVyKSAtPlxuXHRcdGlmIHBvc2l0aW9uID09IFwidG9wXCJcblx0XHRcdGxheWVyLnByb3BzID1cblx0XHRcdFx0eTogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueVxuXHRcdFx0XHR4OiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54XG5cdFx0XHRcdHdpZHRoOiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aFxuXHRcdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueSArPSBsYXllci5oZWlnaHQgKyBAb3B0aW9ucy5tYXJnaW5cblx0XHRcdEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLmhlaWdodCAtPSBsYXllci5oZWlnaHQgKyBAb3B0aW9ucy5tYXJnaW5cblxuXHRcdGVsc2UgaWYgcG9zaXRpb24gPT0gXCJsZWZ0XCJcblx0XHRcdGxheWVyLnByb3BzID1cblx0XHRcdFx0eTogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueVxuXHRcdFx0XHR4OiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54XG5cdFx0XHRcdGhlaWdodDogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUuaGVpZ2h0XG5cdFx0XHRAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54ICs9IGxheWVyLndpZHRoICsgQG9wdGlvbnMubWFyZ2luXG5cdFx0XHRAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aCAtPSBsYXllci53aWR0aCArIEBvcHRpb25zLm1hcmdpblxuXG5cdFx0ZWxzZSBpZiBwb3NpdGlvbiA9PSBcImJvdHRvbVwiXG5cdFx0XHRsYXllci5wcm9wcyA9XG5cdFx0XHRcdHg6IEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLnhcblx0XHRcdFx0bWF4WTogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUuaGVpZ2h0ICsgQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueVxuXHRcdFx0XHR3aWR0aDogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUud2lkdGhcblx0XHRcdEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLmhlaWdodCAtPSBsYXllci5oZWlnaHQgKyBAb3B0aW9ucy5tYXJnaW5cblxuXHRcdGVsc2UgaWYgcG9zaXRpb24gPT0gXCJyaWdodFwiXG5cdFx0XHRsYXllci5wcm9wcyA9XG5cdFx0XHRcdHk6IEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLnlcblx0XHRcdFx0bWF4WDogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUud2lkdGggKyBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54XG5cdFx0XHRcdGhlaWdodDogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUuaGVpZ2h0XG5cdFx0XHRAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aCAtPSBsYXllci53aWR0aCArIEBvcHRpb25zLm1hcmdpblxuXG5cdFx0ZWxzZSBpZiBwb3NpdGlvbiA9PSBcImZpbGxcIiB8fCBwb3NpdGlvbiA9PSB1bmRlZmluZWRcblx0XHRcdGxheWVyLnByb3BzID1cblx0XHRcdFx0eTogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueVxuXHRcdFx0XHR4OiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54XG5cdFx0XHRcdHdpZHRoOiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLmhlaWdodFxuXHRcdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUgPVxuXHRcdFx0XHR4OiAwXG5cdFx0XHRcdHk6IDBcblx0XHRcdFx0d2lkdGg6IDBcblx0XHRcdFx0aGVpZ2h0OiAwXG5cblx0QGRlZmluZSBcImF2YWlsYWJsZUZyYW1lXCIsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUgPSB2YWx1ZVxuXHRAZGVmaW5lIFwibWFyZ2luXCIsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5tYXJnaW5cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdG9yaWdpbmFsTWFyZ2luID0gQG9wdGlvbnMubWFyZ2luXG5cdFx0XHRkaWZmID0gdmFsdWUgLSBvcmlnaW5hbE1hcmdpblxuXHRcdFx0QG9wdGlvbnMubWFyZ2luID0gdmFsdWVcblxuXHRcdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUgPVxuXHRcdFx0XHR4OiB2YWx1ZVxuXHRcdFx0XHR5OiB2YWx1ZVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoIC0gdmFsdWUqMlxuXHRcdFx0XHRoZWlnaHQ6IEBoZWlnaHQgLSB2YWx1ZSoyXG5cblx0XHRcdGZvciBjaGlsZCBpbiBAY2hpbGRyZW5cblx0XHRcdFx0QGRyYXdMYXllciBjaGlsZC5wb3NpdGlvbiwgY2hpbGQiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBREFBLElBQUE7OztBQUFNLE9BQU8sQ0FBQzs7O0VBRUEsY0FBQyxRQUFEO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSw2QkFBRCxX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
