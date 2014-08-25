/*
 *  Effect.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
tds.Effect = [];

(function() {

//汎用パーティクル
tm.define("tds.Effect.Particle", {
    superClass: "tm.display.Shape",
    layer: LAYER_EFFECT_UPPER,

    alpha: 1.0,
    alphaDecayRate: 0.85,
    size: 0,

    image: null,
    isEffect: true,
    isUpper: true,

    init: function(size, initialAlpha, alphaDecayRate, color) {
        size = size || 32;
        color = color || 0;
        this.superInit(size, size);

        if (initialAlpha === undefined) initialAlpha = 1;
        if (alphaDecayRate === undefined) alphaDecayRate = 0.9;

        this.size = size;
        this.alpha = initialAlpha;
        this.alphaDecayRate = alphaDecayRate;
        this.blendMode = "lighter";

        var c = this.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
                .addColorStopList([
                    {offset:0.0, color: "hsla({0}, 60%, 50%, 1.0)".format(color)},
                    {offset:0.5, color: "hsla({0}, 60%, 50%, 0.5)".format(color)},
                    {offset:1.0, color: "hsla({0}, 60%, 50%, 0.0)".format(color)},
                ]).toStyle()
            ).fillRect(0, 0, size, size);

        this.on("enterframe", function() {
            this.alpha *= this.alphaDecayRate;
            if (this.alpha < 0.01) {
                this.remove();
                return;
            } else if (1.0 < this.alpha) {
                this.alpha = 1.0;
            }
        }.bind(this));
    },
});

//オーラ用パーティクル
tm.define("tds.Effect.Aura", {
    superClass: "tm.display.Shape",
    layer: LAYER_EFFECT_UPPER,

    init: function(target, size, alphaDecayRate) {
        size = size || 100;
        this.superInit();
        if (alphaDecayRate === undefined) alphaDecayRate = 0.9;

        this.width = this.height = this.size = size;
        this.alpha = 0.02;
        this.alphaDecayRate = alphaDecayRate;
        this.blendMode = "lighter";
        this.tweener.clear().to({alpha:1},200).to({alpha:0},2000);

        this.target = target;
        this.vanish = false;

        this.setScale(size*0.01);

        var c = this.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(25, 25, 0, 25, 25, 25)
                .addColorStopList([
                    {offset:0.0, color: "hsla({0}, 60%, 50%, 0.4)".format(200)},
                    {offset:0.5, color: "hsla({0}, 60%, 50%, 0.2)".format(240)},
                    {offset:1.0, color: "hsla({0}, 60%, 50%, 0.0)".format(240)},
                ]).toStyle()
            )
            .fillRect(0, 0, 50, 50);
    },

    update: function() {
        if (this.alpha < 0.01) {
            this.remove();
            return;
        } else if (1.0 < this.alpha) {
            this.alpha = 1.0;
        }
        if (this.target.mouseON && !this.vanish) {
             this.x += this.vx;
             this.y += this.vy;
        } else {
             this.vanish = true;
             this.x -= this.vx*3;
             this.y -= this.vy*3;
        }
        var x = this.target.x;
        var y = this.target.y;
        if (this.x-2 < x && x < this.x+2 && this.y-2 < y && y < this.y+2) {
            this.remove();
            return;
        }
        this.scaleX *= 0.98;
        this.scaleY *= 0.98;
    },
});

//爆発用パーティクル
tm.define("tds.Effect.BurnParticle", {
    superClass: "tm.display.Shape",
    layer: LAYER_EFFECT_UPPER,

    alpha: 1.0,
    alphaDecayRate: 0.85,
    size: 0,

    image: null,
    isEffect: true,
    isUpper: true,

    init: function(size, initialAlpha, alphaDecayRate, color) {
        size = size || 32;
        color = color || 0;
        this.superInit(size, size);

        if (initialAlpha === undefined) initialAlpha = 1;
        if (alphaDecayRate === undefined) alphaDecayRate = 0.9;

        this.size = size;
        this.alpha = initialAlpha;
        this.alphaDecayRate = alphaDecayRate;
        this.blendMode = "lighter";

        var c = this.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
                .addColorStopList([
                    {offset:0.0, color: "hsla({0}, 50%, 30%, 1.0)".format(color)},
                    {offset:0.5, color: "hsla({0}, 50%, 30%, 0.5)".format(color)},
                    {offset:1.0, color: "hsla({0}, 60%, 50%, 0.0)".format(color)},
                ]).toStyle()
            )
            .fillRect(0, 0, size, size);

        this.on("enterframe", function() {
            this.alpha *= this.alphaDecayRate;
            if (this.alpha < 0.01) {
                this.remove();
                return;
            } else if (1.0 < this.alpha) {
                this.alpha = 1.0;
            }
        }.bind(this));
    },
});

//敵弾消滅パーティクル
tm.define("tds.Effect.BulletVanish", {
    superClass: "tm.display.Shape",
    layer: LAYER_EFFECT_UPPER,

    alpha: 1.0,
    alphaDecayRate: 0.9,
    size: 0,

    image: null,
    isEffect: true,
    isUpper: true,

    deltaX: 0.0,    //水平方向速度
    deltaY: 0.0,    //垂直方向速度
    deltaA: 1.0,    //速度減衰率

    init: function(bullet) {
        var size = bullet.size || 16;
        var type = bullet.param.type || "RL";
        this.superInit(size, size);

        this.size = size;
        this.blendMode = "lighter";
        this.deltaX = bullet.runner.deltaX;
        this.deltaY = bullet.runner.deltaY;
        this.deltaA = 0.9;
        this.setPosition(bullet.x, bullet.y);

        var color = 0;
        switch (type) {
            case "RS":
            case "RL":
            case "RE":
                color = 320;
                break;
            case "BS":
            case "BL":
            case "BE":
                color = 240;
                break;
        }

        var c = this.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
                .addColorStopList([
                    {offset:0.0, color: "hsla({0}, 60%, 50%, 0.0)".format(color)},
                    {offset:0.9, color: "hsla({0}, 60%, 50%, 1.0)".format(color)},
                    {offset:1.0, color: "hsla({0}, 60%, 50%, 0.0)".format(color)},
                ]).toStyle()
            ).fillRect(0, 0, size, size);

        this.on("enterframe", function() {
            this.x += this.deltaX;
            this.y += this.deltaY;
            this.deltaX *= this.deltaA;
            this.deltaY *= this.deltaA;
        }.bind(this));

        this.tweener.clear()
            .to({scaleX: 3, scaleY: 3, alpha: 0.0}, 800, "easeOutQuad")
            .call(function() {
                this.remove();
            }.bind(this));
    },
});

//衝撃波
tm.define("tds.Effect.ShockWave", {
    superClass: "tm.display.Shape",
    layer: LAYER_EFFECT_UPPER,

    init: function(size, alphaDecayRate) {
        size = size || 64;
        this.superInit(size, size);

        if (alphaDecayRate === undefined) alphaDecayRate = 0.9;

        this.width = this.height = this.size = size;
        this.alphaDecayRate = alphaDecayRate;
        this.blendMode = "lighter";

        var c = this.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
                .addColorStopList([
                    {offset:0.0, color: "hsla(0, 100%, 100%, 0.0)"},
                    {offset:0.8, color: "hsla(0, 100%, 100%, 1.0)"},
                    {offset:1.0, color: "hsla(0, 100%, 100%, 0.0)"},
                ]).toStyle()
            ).fillRect(0, 0, size, size);
    },

    update: function() {
        if (this.alpha < 0.01) {
            this.remove();
            return;
        } else if (1.0 < this.alpha) {
            this.alpha = 1.0;
        }
    },
});

})();