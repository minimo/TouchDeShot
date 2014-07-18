/*
 *  TouchShooter
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */

//namespace ASURA
ts = {
    core: null,
};

ts.TouchShooter = tm.createClass({
    superClass: tm.app.CanvasApp,

    score: 0,
    highScore: 0,       //ハイスコア
    highScoreStage: 0,  //ハイスコア時ステージ
    difficulty: 0,      //難易度(0-3)

    mainScene: null,

    init: function(id) {
        this.superInit(id);

        ts.core = this;
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = 60;
        this.background = "rgba(0, 0, 0, 0)";

        this.keyboard = tm.input.Keyboard(window);

        var loadingScene = tm.ui.LoadingScene({
            assets: ts.assets,
            width: SC_W,
            height: SC_H,
            bgColor: "black",
            nextScene: function() {
                this._onLoadAssets();
                return ts.MainScene();
            }.bind(this),
        });
        this.replaceScene(loadingScene);
    },

    _onLoadAssets: function() {
    },

    exitApp: function() {
        this.stop();
        tm.social.Nineleap.postRanking(this.highScore, "");
    }
});