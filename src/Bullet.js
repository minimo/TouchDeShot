/*
 *  ASURA
 *  Bullet.js
 *  2014/07/16
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tds.Bullet", {
    superClass: "tm.bulletml.Bullet",

    init: function(runner, param) {
        this.superInit(runner);
        this.removeChildren();

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        this.beforeX = this.x;
        this.beforeY = this.y;
    },
    onremoved: function() {
        
    },
});

})();
