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

    init: function(runner, param) {
        this.superInit(runner);

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        this.param = param;
        var color = param.color || 200;
        this.removeChildren();

        //弾種別グラフィック
        switch (param.type) {
            case "normal":
                this.setupNormalBullet(color);
                break;
            case "large":
                this.setupNormalBullet(color, 24);
                break;
            default:
                this.setupNormal(color);
                break;
        }

        this.on("enterframe", function(){
            this.rotation+=10;

            //自機との当り判定チェック
            if (this.player.isCollision) {
                if (this.player.mouseON) {
                    //自機着弾
                    if (this.isHitElement(this.player.core) ) {
                        this.player.damage();
                        this.isVanish = true;
                        this.remove();
                    }
                } else {
                    //シールド着弾
                    if (this.isHitElement(this.player.shield) ) {
                        this.isVanish = true;
                        this.remove();
                    }
                }
            }

            //画面範囲外
            if (this.x<-32 || this.x>SC_W+32 || this.y<-32 || this.y>SC_H+323) {
                this.remove();
            }
        }.bind(this) );

        this.on("removed", function(){
            if (this.isVanish) tds.Effect.BulletVanish(this).addChildTo(app.currentScene);
        }.bind(this));

        this.beforeX = this.x;
        this.beforeY = this.y;
    },

    //通常弾
    setupNormalBullet: function(color, size) {
        size = size || 16;
        this.size = size;
        var size_h = size/2;
        var size_q = size/4;
        var size_z = size/8;
        var b = tm.display.Shape(size, size).addChildTo(this);
        var c = b.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(size_h, size_h, 0, size_h, size_h, size_h)
                .addColorStopList([
                    {offset:0.0, color: "hsla({0}, 50%, 50%, 0.0)".format(color)},
                    {offset:0.9, color: "hsla({0}, 50%, 50%, 1.0)".format(color)},
                    {offset:1.0, color: "hsla({0}, 50%, 50%, 0.0)".format(color)},
                ]).toStyle()
            ).fillRect(0, 0, size, size);

        var style = tm.graphics.RadialGradient(size_q, size_q, 0, size_q, size_q, size_q)
                    .addColorStopList([
                        {offset:0.0, color: "hsla({0}, 70%, 70%, 1.0)".format(color)},
                        {offset:0.9, color: "hsla({0}, 50%, 50%, 0.5)".format(color)},
                        {offset:1.0, color: "hsla({0}, 50%, 50%, 0.0)".format(color)},
                    ]).toStyle();

        var b = tm.display.Shape(size_h, size_h).addChildTo(this).setPosition(size_z, size_z);
        b.canvas.setFillStyle(style).fillRect(0, 0, size_h, size_h);
        var b = tm.display.Shape(size_h, size_h).addChildTo(this).setPosition(-size_z, -size_z);
        b.canvas.setFillStyle(style).fillRect(0, 0, size_h, size_h);
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
        this.radius = 12;

        //威力により大きさと判定を変更
        if (power > 10) {
            this.setScale(2);
            this.radius = 24;
        }

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
