/*
 *  Effect.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
tds.Effect = [];

(function() {

//パーティクル
tm.define("tds.Effect.Particle", {
    superClass: tm.display.CanvasElement,

    alpha: 1.0,
    alphaDecayRate: 0.85,
    size: 0,

    image: null,
    isEffect: true,

    init: function(size, initialAlpha, alphaDecayRate, image) {
        this.superInit();
        size = size || 100;
        if (initialAlpha === undefined) initialAlpha = 1;
        if (alphaDecayRate === undefined) alphaDecayRate = 0.9;

        this.width = this.height = this.size = size;
        this.alpha = initialAlpha;
        this.alphaDecayRate = alphaDecayRate;
        this.blendMode = "lighter";

        if (image) {
            this.image = image;
        } else {
            var size_half = size*0.5;
            this.image = tm.graphics.Canvas()
                .resize(size, size)
                .setFillStyle(
                    tm.graphics.RadialGradient(size_half, size_half, 0, size_half, size_half, size_half)
                        .addColorStopList([
                            {offset:0, color: "rgba(255,255,255,0.1)"},
                            {offset:1, color: "rgba(  0,  0,  0,0.0)"},
                        ]).toStyle()
                )
                .fillRect(0, 0, size, size)
                .element;
        }
    },
    update: function(app) {
        this.alpha *= this.alphaDecayRate;
        if (this.alpha < 0.01) {
            this.remove();
        } else if (1.0 < this.alpha) {
            this.alpha = 1.0;
        }
    },
    draw: function(canvas) {
        canvas.context.drawImage(this.image, -this.width*this.origin.x, -this.height*this.origin.y, this.width, this.height);
    },
    clone: function() {
        return tds.Effect.Particle(this.size, this.initialAlpha, this.alphaDecayRate, this.image);
    },
});

tm.define("tds.Effect.Aura", {
    superClass: "tds.Effect.Particle",

    init: function(target, size, initialAlpha, alphaDecayRate) {
        this.superInit(size, initialAlpha, alphaDecayRate, tds.AuraPaticleImage);
        this.target = target;
        this.vanish = false;
    },

    update: function() {
        this.alpha *= this.alphaDecayRate;
        if (this.alpha < 0.01) {
            this.remove();
        } else if (1.0 < this.alpha) {
            this.alpha = 1.0;
        }
        if (this.target.mouseON && !this.vanish) {
             this.x += this.vx;
             this.y += this.vy;
//              this.x += (this.target.x-this.x)*0.05;
//              this.y += (this.target.y-this.y)*0.05;
        } else {
             this.vanish = true;
             this.x -= this.vx*3;
             this.y -= this.vy*3;
        }
        var x = this.target.x;
        var y = this.target.y;
        if (this.x-2 < x && x < this.x+2 && this.y-2 < y && y < this.y+2) {
            this.remove();
        }
    },
});

//オーラパーティクル用
tds.AuraPaticleImage = tm.graphics.Canvas()
    .resize(50, 50)
    .setFillStyle(
        tm.graphics.RadialGradient(25, 25, 0, 25, 25, 25)
            .addColorStopList([
                {offset:0, color: "rgba(255,255,255,0.1)"},
                {offset:1, color: "rgba(  0,  0,  0,0.0)"},
            ]).toStyle()
    )
    .fillRect(0, 0, 50, 50)
    .element;

})();