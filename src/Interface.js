/*
 *  Interface.js
 *  2014/08/11
 *  @auther minimo  
 *  This Program is MIT license.
 */

(function() {

//ステージリザルト表示
tm.define("tds.StageResult", {
    superClass: "tm.display.CanvasElement",
    layer: LAYER_FOREGROUND,    //所属レイヤー
    parentScene: null,          //親シーン
    player: null,               //プレイヤー参照用

    init: function() {
        this.superInit();
        this.mask = tm.display.Shape(SC_W*0.9, SC_H*0.9).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.renderRectangle({fillStyle: "rgba(64,64,256,0.5)", strokeStyle: "rgba(128,128,128,0.5)"});
    },

    update: function() {
    },
});

})();