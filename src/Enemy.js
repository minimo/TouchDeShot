/*
 *  Enemy.js
 *  2014/08/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tds.Enemy", {
    superClass: "tm.app.Object2D",
    layer: LAYER_OBJECT,
    isCollision: true,

    name: null,
    def: 0,
    defMax: 0,
    bulletPattern: null,
    nowBulletPattern: null,

    parentScene: null,
    data: null,

    algorithm: function() {},
    dead: function() {},

    init: function(name) {
        this.superInit();

        this.name = name;
        var d = this.data = tds.enemyData[name];
        if (!d) return false;

        this.def = d.def;
        this.defMax = d.def;

        this.width = d.width;
        this.height = d.height;
        this.layer = d.layer;
        this.point = d.point;

        this.setup = d.setup;
        if (d.algorithm) this.algorithm = d.algorithm;
        if (d.dead) this.dead = d.dead;

        this.bulletPattern = d.bulletPattern;
        if (this.bulletPattern instanceof Array) {
            this.nowBulletPattern = this.bulletPattern[0];
        } else {
            this.nowBulletPattern = this.bulletPattern;
        }

        var params = {
            target: app.player,
            createNewBullet: function(runner, attr) {
                tds.Bullet(runner, attr).addChildTo(app.currentScene);
            }
        };
        this.setup();
        this.startDanmaku(tds.bulletPattern[this.nowBulletPattern], params);

        //当り判定設定
        this.boundingType = "rect";

        this.time = 0;
    },

    setup: function(name) {
    },

    update: function() {
        this.algorithm();
        this.time++;
    },

    damage: function(power) {
        this.def -= power;
        if (this.def < 1) {
            this.dead();
            this.remove();
        }
    },

    dead: function() {
    },
});

})();
