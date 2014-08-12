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

    //アクティブフラグ
    active: false,

    //最小値
    min: 0,

    //中央値
    center: 100,

    //最大値
    max: 180,

    //現在値
    _value: 0,

    init: function() {
        this.superInit();
        this.alpha = 0;
    },

    update: function() {
        if (this.active) {
            this.alpha+=0.05;
            if (this.alpha > 1.0)this.alpha = 1.0;
        } else {
            this.alpha-=0.05;
            if (this.alpha < 0.0)this.alpha = 0.0;
        }
    },

    draw: function(canvas) {
        canvas.lineWidth = 10;
        canvas.globalCompositeOperation = "lighter";

        var clock = true;
        var color = 'lime'
        var rad = this._value*toRad*2;

        canvas.strokeStyle = 'blue';
        canvas.strokeArc(0, 0, 40, Math.PI*2, rad, clock);

        canvas.strokeStyle = color;
        canvas.strokeArc(0, 0, 40, rad, 0, clock);
    },
});

tds.PowerGauge.prototype.accessor("value", {
    "get": function()   { return this._value; },
    "set": function(v)  { this._value = clamp(v, this.min, this.max); }
});


})();