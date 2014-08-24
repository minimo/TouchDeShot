/*
 *  TouchDeShot
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//namespace ASURA
tds = {
    core: null,
};

tds.TouchShooter = tm.createClass({
    superClass: tm.app.CanvasApp,

    score: 0,
    highScore: 0,       //ハイスコア
    highScoreStage: 0,  //ハイスコア時ステージ
    difficulty: 0,      //難易度(0-3)

    mainScene: null,

    highScore: 0,
    score: 0,
    extendNumber: 0,
    extendScore: null,

    bgm: null,
    bgmIsPlay: false,
    volumeBGM: 1.0,
    volumeSE: 1.0,

    init: function(id) {
        this.superInit(id);

        this.extendScore = [];
        this.extendScore.push(1000000);
        this.extendScore.push(2000000);
        this.extendScore.push(2500000);

        tds.core = this;
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = 60;
        this.background = "rgba(0, 0, 0, 1.0)";

        this.keyboard = tm.input.Keyboard(window);

        var loadingScene = tm.ui.LoadingScene({
            assets: tds.assets,
            width: SC_W,
            height: SC_H,
            bgColor: "black",
            nextScene: function() {
                this._onLoadAssets();
                return tds.WaitScene();
            }.bind(this),
        });
        this.replaceScene(loadingScene);
    },

    _onLoadAssets: function() {
    },

    exitApp: function() {
        this.stop();
        tm.social.Nineleap.postRanking(this.highScore, "");
    },

    playBGM: function(asset, loop) {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.stop();
                this.bgmIsPlay = false;
            }
        }
        this.bgm = tm.asset.AssetManager.get(asset).clone();
        if (this.bgm) {
            this.bgm.loop = loop;
            this.bgm.volume = this.volumeBGM*0.34;
            this.bgm.play();
            this.bgmIsPlay = true;
        }
        return this.bgm;
    },

    stopBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.stop();
                this.bgmIsPlay = false;
            }
            this.bgm = null;
        }
    },

    pauseBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.pause();
                this.bgmIsPlay = false;
            }
        }
    },

    resumeBGM: function() {
        if (this.bgm) {
            if (!this.bgmIsPlay) {
                this.bgm.resume();
                this.bgm.volume = this.volumeBGM*0.34;
                this.bgmIsPlay = true;
            }
        }
    },

    playSE: function(asset) {
        var se = tm.asset.AssetManager.get(asset).clone();
        if (se) {
            se.loop = false;
            se.volume = this.volumeSE*0.34;
            se.play();
        }
        return se;
    },
});

})();