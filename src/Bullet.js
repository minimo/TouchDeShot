/*
 *  ASURA
 *  Bullet.js
 *  2014/07/16
 *  @auther minimo  
 *  This Program is MIT license.
 */

tm.define("tds.Bullet", {
    superClass: "tm.display.Sprite",

    speed: 7,       //移動速度
    vx: 0,
    vy: 0,
    type: 0,        //タイプ

    init: function() {
        this.superInit("bullet1", 32, 32);
        this.setFrameIndex(4);

        this.time = 0;
        return this;
    },
    update: function() {
        this.x += this.vx;
        this.y += this.vy;
    },
});

