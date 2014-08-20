/*
 *  GameoverScene.js
 *  2014/08/11
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
//タイトルシーン
tm.define("tds.GameoverScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
        app.background = "rgba(0, 0, 0, 1.0)";

        this.mask = tm.display.Shape(SC_W*0.7, SC_H*0.5).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.renderRectangle({fillStyle: "rgba(0,0,0,0.7)", strokeStyle: "rgba(0,0,0,0.7)"});

        //ゲームオーバー表示
        var sc = tm.display.OutlineLabel("GAME OVER", 30).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        sc.fontFamily = "'Orbitron'"; sc.align = "center"; sc.baseline  = "middle"; sc.fontWeight = 500; sc.outlineWidth = 2;
    },

    update: function() {
    },

    ontouchstart: function(e) {
        app.replaceScene(tds.TitleScene());
    },
});

