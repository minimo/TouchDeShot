/*
 *  player.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
tds.Effect = [];

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

