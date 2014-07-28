/*
 *  Bullet.js
 *  2014/07/16
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tds.Bullet", {
    superClass: "tm.bulletml.Bullet",

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

tm.define("tds.ShotBullet", {
    superClass: "tm.display.Sprite",

    speed: 5,
    power: 1,

    init: function(rotation, speed, power) {
        this.superInit("shot");

        this.rotation = rotation || 0;
        this.speed = speed || 5;
        this.power = power || 1;

        this.vx = Math.cos(rotation*toRad) * speed;
        this.vy = Math.sin(rotation*toRad) * speed;

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        this.beforeX = this.x;
        this.beforeY = this.y;
    },
    onremoved: function() {
        this.x += this.vx;
        this.y += this.vx;

        if (this.x < -20 || this.x > SC_W+20 || this.y < -20 || this.y > SC_H+20) {
            this.remove();
        }
    },
});

})();
