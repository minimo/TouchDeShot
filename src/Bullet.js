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

    param: null,

    isVanish: false,
    isShot: false,

    init: function(runner, param) {
        this.superInit(runner);
        this.removeChildren();

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        this.removeChildren();

        this.param = param;
        if (param.shot) {
            this.isShot = true;
            tm.display.Sprite("shot").addChildTo(this);
        } else {
        }

        this.beforeX = this.x;
        this.beforeY = this.y;
    },
    onremoved: function() {
        if (this.isVanish) {
        }
        if (this.isShot) {
        }
    },
});

var shotPath = [
    [32,0], [64,48], [32,64], [0,48], [32, 0]
];
tm.define("tds.ShotBullet", {
    superClass: "tm.display.Shape",
    layer: LAYER_SHOT,

    speed: 5,
    power: 1,
    defaultSpeed: 15,
    defaultPower: 1,

    init: function(rotation, speed, power) {
        this.superInit();
        this.width = this.height = 32;
        var c = this.canvas;
        c.setColorStyle("hsla(250, 50%, 50%, 1.0)", "hsla(250, 50%, 50%, 1.0)");
        c.setLineStyle(2);
        c.beginPath();
        c.moveTo(shotPath[0][0], shotPath[0][1]);
        for (var i = 1; i < shotPath.length; i++) {
            c.lineTo(shotPath[i][0], shotPath[i][1]);
        }
        c.stroke().fill().closePath();

        this.rotation = rotation || 0;
        this.speed = speed || this.defaultSpeed;
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
    },
});

})();
