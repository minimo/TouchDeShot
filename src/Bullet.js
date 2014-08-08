/*
 *  Bullet.js
 *  2014/07/16
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tds.Bullet", {
    superClass: "tm.bulletml.Bullet",
    layer: LAYER_BULLET,
    parentScene: null,
    player: null,

    param: null,

    isVanish: false,
    isShot: false,

    init: function(runner, param) {
        this.superInit(runner);

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        var color = param.color || 200;
        this.removeChildren();

        this.setupNormal(color);

        this.on("enterframe", function(){
            this.rotation+=10;

            //自機との当り判定チェック
            if (this.player.mouseON && this.isHitElement(this.player)) {
                this.player.damage();
                this.remove();
            }
            if (this.x < -20 || this.x > SC_W+20 || this.y < -20 || this.y > SC_H+20) {
                this.remove();
            }
        }.bind(this) );

        this.beforeX = this.x;
        this.beforeY = this.y;
    },

    //通常弾
    setupNormal: function(color) {
        var b = tm.display.Shape(32, 32).addChildTo(this);
        var c = b.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(16, 16, 0, 16, 16, 16)
                .addColorStopList([
                    {offset:0.0, color: "hsla({0}, 50%, 50%, 0.0)".format(color)},
                    {offset:0.5, color: "hsla({0}, 50%, 50%, 1.0)".format(color)},
                    {offset:0.6, color: "hsla({0}, 50%, 50%, 0.0)".format(color)},
                    {offset:1.0, color: "hsla({0}, 50%, 50%, 0.0)".format(color)},
                ]).toStyle()
            )
            .fillRect(0, 0, 32, 32);

        var style = tm.graphics.RadialGradient(8, 8, 0, 8, 8, 8)
                    .addColorStopList([
                        {offset:0.0, color: "hsla({0}, 70%, 70%, 1.0)".format(color)},
                        {offset:0.5, color: "hsla({0}, 50%, 50%, 0.5)".format(color)},
                        {offset:1.0, color: "hsla({0}, 50%, 50%, 0.0)".format(color)},
                    ]).toStyle();

        var b = tm.display.Shape(16, 16).addChildTo(this).setPosition(2,2);
        b.canvas.setFillStyle(style).fillRect(0, 0, 16, 16);
        var b = tm.display.Shape(16, 16).addChildTo(this).setPosition(-2,-2);
        b.canvas.setFillStyle(style).fillRect(0, 0, 16, 16);
    },
});

var shotPath = [
    [16,0], [32,24], [16,32], [0,24],
];
tm.define("tds.ShotBullet", {
    superClass: "tm.display.Shape",
    layer: LAYER_SHOT,
    parentScene: null,
    player: null,

    speed: 15,
    power: 1,
    defaultSpeed: 15,
    defaultPower: 1,

    init: function(rotation, power) {
        this.superInit(32,32);
        var c = this.canvas;
        c.setColorStyle("hsla(250, 50%, 50%, 1.0)", "hsla(250, 50%, 50%, 1.0)");
        c.setLineStyle(2);
        c.beginPath();
        c.moveTo(shotPath[0][0], shotPath[0][1]);
        for (var i = 1; i < shotPath.length; i++) {
            c.lineTo(shotPath[i][0], shotPath[i][1]);
        }
        c.lineTo(shotPath[0][0], shotPath[0][1]);
        c.stroke().fill().closePath();

        this.rotation = rotation || 0;
        this.speed = this.defaultSpeed;
        this.power = power || this.defaultPower;

        this.alpha = 0.8;
        this.blendMode = "lighter";

        rotation-=90;
        this.vx = Math.cos(rotation*toRad) * this.speed;
        this.vy = Math.sin(rotation*toRad) * this.speed;

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        this.beforeX = this.x;
        this.beforeY = this.y;
    },
    update: function() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -20 || this.x > SC_W+20 || this.y < -20 || this.y > SC_H+20) {
            this.remove();
        }

        //敵との当り判定チェック
        var s = [LAYER_OBJECT_UPPER, LAYER_OBJECT, LAYER_OBJECT_LOWER];
        for (var i = 0; i < 3; i++) {
            var layer = this.parentScene.layers[s[i]];
            layer.children.each(function(a) {
                if (this.parent && a.isCollision && a.isHitElement(this)) {
                    a.damage(this.power);
                    this.vanish();
                    this.remove();
                    return;
                }
            }.bind(this));
        }
    },

    vanish: function() {
        for (var i = 0; i < 5; i++) {
            var p = tds.Effect.Particle(32, 1, 0.95).addChildTo(this.parentScene).setPosition(this.x, this.y);
            var x = rand(0, 30)-15;
            var y = rand(0, 50)*-1;
            p.tweener.moveBy(x, y, 1000, "easeOutCubic");
        }
    },
});

})();
