/*
 *  Interface.js
 *  2014/08/11
 *  @auther minimo  
 *  This Program is MIT license.
 */

(function() {

//パワーゲージ
tm.define("tds.PowerGauge", {
    superClass:  tm.display.CanvasElement,

    min: 0,
    max: 180,
    _value: 0,

    init: function() {
        this.superInit();
        this.alpha = 0;
        this.rotation = -90;
    },

    update: function() {
        if (this.parent.level == 0 && this.parent.power == 0) {
            this.alpha-=0.05;
            if (this.alpha < 0.0)this.alpha = 0.0;
        } else {
            this.alpha+=0.05;
            if (this.alpha > 1.0)this.alpha = 1.0;
        }
    },

    draw: function(canvas) {
        canvas.lineWidth = 30;
        canvas.globalCompositeOperation = "lighter";

        var clock = true;
        var rad = this._value*toRad*2;

        var color1 = "hsla({0}, 60%, 50%, 0.8)".format(100+this.parent.level*120);
        var color2 = "hsla({0}, 60%, 50%, 0.8)".format(100+(this.parent.level+1)*120);

        canvas.strokeStyle = color1
        canvas.strokeArc(0, 0, 80, Math.PI*2, rad, clock);
        canvas.strokeStyle = color2;
        canvas.strokeArc(0, 0, 80, rad, 0, clock);
    },
});

tds.PowerGauge.prototype.accessor("value", {
    "get": function()   { return this._value; },
    "set": function(v)  { this._value = Math.clamp(v, this.min, this.max); }
});


})();