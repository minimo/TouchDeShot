/*
 *  Ground.js
 *  2014/08/08
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tds.Ground", {
    superClass: "tm.display.CanvasElement",
    layer: LAYER_BACKGROUND,    //所属レイヤー
    parentScene: null,      //親シーン
    player: null,           //プレイヤー参照用

    init: function(name) {
        this.superInit();
    },
});

})();
