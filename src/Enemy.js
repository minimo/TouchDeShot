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

    parentScene: null,

    init: function() {
        this.superInit();

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        this.on("enterframe", function() {this.time++;});

        this.time = 0;
    },
});

tds.setupEnemy = function(name) {
    var data = tds.enemyData[name];
}

})();
