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
        app.background = "rgba(0, 0, 0, 0.5)";

        this.mask = tm.display.Shape(SC_W*0.7, SC_H*0.5).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.renderRectangle({fillStyle: "rgba(0,0,0,0.7)", strokeStyle: "rgba(0,0,0,0.7)"});

        //ゲームオーバー表示
        var sc = tm.display.OutlineLabel("GAME OVER", 50).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.4);
        sc.fontFamily = "'Orbitron'"; sc.align = "center"; sc.baseline  = "middle"; sc.fontWeight = 500; sc.outlineWidth = 2;

        var sc = tm.display.OutlineLabel("SCORE: "+app.score, 30).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        sc.fontFamily = "'Orbitron'"; sc.align = "center"; sc.baseline  = "middle"; sc.fontWeight = 500; sc.outlineWidth = 2;

        var sc = tm.display.OutlineLabel("Please Touch or Click", 25).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.60);
        sc.fontFamily = "'Orbitron'"; sc.align = "center"; sc.baseline  = "middle"; sc.fontWeight = 500; sc.outlineWidth = 2;

        //ハイスコア更新
        if (app.highScore<app.score) app.highScore = app.score;

        //１０秒経つと自動でタイトルへ
        this.timer = tm.app.Object2D().addChildTo(this).tweener.wait(10000).call(function(){this.exit()}.bind(this));
    },

    update: function() {
    },

    ontouchstart: function(e) {
        this.exit();
    },

    exit: function() {
        //ナインリープの場合はスコア登録画面へ
        var result = "SCORE:"+app.score;
        tm.social.Nineleap.postRanking(app.score, result);

        app.replaceScene(tds.TitleScene());
    },
});

