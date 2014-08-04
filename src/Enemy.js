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

    name: null,
    parentScene: null,
    data: null,

    algorithm: function() {},
    dead: function() {},

    init: function(name) {
        this.superInit();

        this.name = name;
        var d = this.data = tds.enemyData[name];
        if (!d) return false;
        
        this.width = d.width;
        this.height = d.height;
        this.layer = d.layer;

        this.setup = d.setup;
        this.algorithm = d.algorithm;
        this.dead = d.dead;

        this.setup();

        //当り判定設定
        this.boundingType = "rect";

        this.time = 0;
    },

    setup: function(name) {
    },

    update: function() {
        this.algorithm();

        if (this.HP < 1) {
            this.dead();
            this.remove();
        }
        this.time++;
    },
});

})();
