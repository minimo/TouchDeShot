/*
 *  GameoverScene.js
 *  2014/08/11
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
//タイトルシーン
tm.define("tds.GameoverScene", {
    superClass: tm.app.Scene,

    result1: "",
    result2: "",

    init: function(stageNumber, boss) {
        this.superInit();
        app.background = "rgba(0, 0, 0, 0.5)";

        this.mask = tm.display.Shape(SC_W*0.7, SC_H*0.5).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.renderRectangle({fillStyle: "rgba(0,0,0,0.7)", strokeStyle: "rgba(0,0,0,0.7)"});

        //リザルト表示
        this.result1 = "SCORE: "+app.score;
        this.result2 = "Stage:"+stageNumber+(boss?" boss":"");

        //ゲームオーバー表示
        var sc = tm.display.OutlineLabel("GAME OVER", 50).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.4);
        sc.fontFamily = "'Orbitron'"; sc.align = "center"; sc.baseline  = "middle"; sc.fontWeight = 500; sc.outlineWidth = 2;

        var sc = tm.display.OutlineLabel(this.result1, 30).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
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
        tm.social.Nineleap.postRanking(app.score, this.result1+"("+this.result2+")");

        app.replaceScene(tds.TitleScene());
    },
});

