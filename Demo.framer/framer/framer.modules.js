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
        options.backgroundColor = options.color || Utils.randomColor();
      }
      layer.props = options;
      layer.position = position;
      return this.drawLayer(position, layer);
    } else {
      print("Not enough space to add the layer");
    }
  };

  Dock.prototype.insertLayer = function(layer, position) {
    if (position == null) {
      position = "fill";
    }
    if (this.options.availableFrame.x > 0 && this.options.availableFrame.y > 0 && this.options.availableFrame.width > 0 && this.options.availableFrame.height > 0 && (layer != null)) {
      layer.position = position;
      layer.parent = this;
      return this.drawLayer(position, layer);
    } else if (layer != null) {
      print("Not enough space to add the layer");
    } else {
      return print("Please input a layer to add the to Dock");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NlYmFzdGlhbi9Eb2N1bWVudHMvUm9ndWUgT25lL0dpdEh1Yi9mcmFtZXItRG9jay9EZW1vLmZyYW1lci9tb2R1bGVzL0RvY2suY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBleHBvcnRzLkRvY2sgZXh0ZW5kcyBMYXllclxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMubWFyZ2luID89IDEwXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUgPVxuXHRcdFx0eDogQG1hcmdpblxuXHRcdFx0eTogQG1hcmdpblxuXHRcdFx0d2lkdGg6IEB3aWR0aCAtIEBtYXJnaW4qMlxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0IC0gQG1hcmdpbioyXG5cblx0YWRkTGF5ZXI6IChwb3NpdGlvbiwgb3B0aW9ucz17fSkgLT5cblx0XHRpZiB0eXBlb2YgcG9zaXRpb24gPT0gXCJvYmplY3RcIlxuXHRcdFx0b3B0aW9ucyA9IHBvc2l0aW9uXG5cdFx0XHRwb3NpdGlvbiA9IFwiZmlsbFwiXG5cblx0XHRpZiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54ID4gMCAmJiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS55ID4gMCAmJiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aCA+IDAgJiYgQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUuaGVpZ2h0ID4gMFxuXHRcdFx0bGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFxuXHRcdFx0b3B0aW9ucy53aWR0aCA/PSAyMDBcblx0XHRcdG9wdGlvbnMuaGVpZ2h0ID89IDIwMFxuXHRcdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gb3B0aW9ucy5jb2xvciB8fCBVdGlscy5yYW5kb21Db2xvcigpXG5cdFx0XHRsYXllci5wcm9wcyA9IG9wdGlvbnNcblxuXHRcdFx0bGF5ZXIucG9zaXRpb24gPSBwb3NpdGlvblxuXG5cdFx0XHRAZHJhd0xheWVyIHBvc2l0aW9uLCBsYXllclxuXG5cdFx0ZWxzZVxuXHRcdFx0cHJpbnQgXCJOb3QgZW5vdWdoIHNwYWNlIHRvIGFkZCB0aGUgbGF5ZXJcIlxuXHRcdFx0cmV0dXJuXG5cblx0aW5zZXJ0TGF5ZXI6IChsYXllciwgcG9zaXRpb24pIC0+XG5cdFx0cG9zaXRpb24gPz0gXCJmaWxsXCJcblxuXHRcdGlmIEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLnggPiAwICYmIEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLnkgPiAwICYmIEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLndpZHRoID4gMCAmJiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS5oZWlnaHQgPiAwICYmIGxheWVyP1xuXHRcdFx0bGF5ZXIucG9zaXRpb24gPSBwb3NpdGlvblxuXHRcdFx0bGF5ZXIucGFyZW50ID0gQFxuXG5cdFx0XHRAZHJhd0xheWVyIHBvc2l0aW9uLCBsYXllclx0XG5cblx0XHRlbHNlIGlmIGxheWVyP1xuXHRcdFx0cHJpbnQgXCJOb3QgZW5vdWdoIHNwYWNlIHRvIGFkZCB0aGUgbGF5ZXJcIlxuXHRcdFx0cmV0dXJuXG5cblx0XHRlbHNlXG5cdFx0XHRwcmludCBcIlBsZWFzZSBpbnB1dCBhIGxheWVyIHRvIGFkZCB0aGUgdG8gRG9ja1wiXG5cblx0ZHJhd0xheWVyOiAocG9zaXRpb24sIGxheWVyKSAtPlxuXHRcdGlmIHBvc2l0aW9uID09IFwidG9wXCJcblx0XHRcdGxheWVyLnByb3BzID1cblx0XHRcdFx0eTogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueVxuXHRcdFx0XHR4OiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54XG5cdFx0XHRcdHdpZHRoOiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aFxuXHRcdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueSArPSBsYXllci5oZWlnaHQgKyBAb3B0aW9ucy5tYXJnaW5cblx0XHRcdEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLmhlaWdodCAtPSBsYXllci5oZWlnaHQgKyBAb3B0aW9ucy5tYXJnaW5cblxuXHRcdGVsc2UgaWYgcG9zaXRpb24gPT0gXCJsZWZ0XCJcblx0XHRcdGxheWVyLnByb3BzID1cblx0XHRcdFx0eTogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueVxuXHRcdFx0XHR4OiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54XG5cdFx0XHRcdGhlaWdodDogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUuaGVpZ2h0XG5cdFx0XHRAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54ICs9IGxheWVyLndpZHRoICsgQG9wdGlvbnMubWFyZ2luXG5cdFx0XHRAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aCAtPSBsYXllci53aWR0aCArIEBvcHRpb25zLm1hcmdpblxuXG5cdFx0ZWxzZSBpZiBwb3NpdGlvbiA9PSBcImJvdHRvbVwiXG5cdFx0XHRsYXllci5wcm9wcyA9XG5cdFx0XHRcdHg6IEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLnhcblx0XHRcdFx0bWF4WTogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUuaGVpZ2h0ICsgQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueVxuXHRcdFx0XHR3aWR0aDogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUud2lkdGhcblx0XHRcdEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLmhlaWdodCAtPSBsYXllci5oZWlnaHQgKyBAb3B0aW9ucy5tYXJnaW5cblxuXHRcdGVsc2UgaWYgcG9zaXRpb24gPT0gXCJyaWdodFwiXG5cdFx0XHRsYXllci5wcm9wcyA9XG5cdFx0XHRcdHk6IEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLnlcblx0XHRcdFx0bWF4WDogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUud2lkdGggKyBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54XG5cdFx0XHRcdGhlaWdodDogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUuaGVpZ2h0XG5cdFx0XHRAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aCAtPSBsYXllci53aWR0aCArIEBvcHRpb25zLm1hcmdpblxuXG5cdFx0ZWxzZSBpZiBwb3NpdGlvbiA9PSBcImZpbGxcIiB8fCBwb3NpdGlvbiA9PSB1bmRlZmluZWRcblx0XHRcdGxheWVyLnByb3BzID1cblx0XHRcdFx0eTogQG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUueVxuXHRcdFx0XHR4OiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS54XG5cdFx0XHRcdHdpZHRoOiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZS53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IEBvcHRpb25zLmF2YWlsYWJsZUZyYW1lLmhlaWdodFxuXHRcdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUgPVxuXHRcdFx0XHR4OiAwXG5cdFx0XHRcdHk6IDBcblx0XHRcdFx0d2lkdGg6IDBcblx0XHRcdFx0aGVpZ2h0OiAwXG5cblx0QGRlZmluZSBcImF2YWlsYWJsZUZyYW1lXCIsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hdmFpbGFibGVGcmFtZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUgPSB2YWx1ZVxuXHRAZGVmaW5lIFwibWFyZ2luXCIsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5tYXJnaW5cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdG9yaWdpbmFsTWFyZ2luID0gQG9wdGlvbnMubWFyZ2luXG5cdFx0XHRkaWZmID0gdmFsdWUgLSBvcmlnaW5hbE1hcmdpblxuXHRcdFx0QG9wdGlvbnMubWFyZ2luID0gdmFsdWVcblxuXHRcdFx0QG9wdGlvbnMuYXZhaWxhYmxlRnJhbWUgPVxuXHRcdFx0XHR4OiB2YWx1ZVxuXHRcdFx0XHR5OiB2YWx1ZVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoIC0gdmFsdWUqMlxuXHRcdFx0XHRoZWlnaHQ6IEBoZWlnaHQgLSB2YWx1ZSoyXG5cblx0XHRcdGZvciBjaGlsZCBpbiBAY2hpbGRyZW5cblx0XHRcdFx0QGRyYXdMYXllciBjaGlsZC5wb3NpdGlvbiwgY2hpbGQiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBREFBLElBQUE7OztBQUFNLE9BQU8sQ0FBQzs7O0VBRUEsY0FBQyxRQUFEO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSw2QkFBRCxXQUFTOztVQUNkLENBQUMsU0FBVTs7SUFFbkIsc0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsT0FBTyxDQUFDLGNBQVQsR0FDQztNQUFBLENBQUEsRUFBRyxJQUFDLENBQUEsTUFBSjtNQUNBLENBQUEsRUFBRyxJQUFDLENBQUEsTUFESjtNQUVBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxNQUFELEdBQVEsQ0FGeEI7TUFHQSxNQUFBLEVBQVEsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEs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
