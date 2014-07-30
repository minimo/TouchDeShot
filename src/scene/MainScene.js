/*
 *  MainScene.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */
(function() {

tm.define("tds.MainScene", {
    superClass: tm.app.Scene,

    //マルチタッチ補助クラス
    touches: null,
    touchID: -1,

    //タッチ情報
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    beforeX: 0,
    beforeY: 0,

    //経過時間
    time: 0,
    absTime: 0,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);

        //レイヤー作成
        this.layers = [];
        for (var i = 0; i < LAYER_SYSTEM+1; i++) {
            this.layers[i] = tm.app.Object2D().addChildTo(this);
        }

        //バックグラウンド
        this.bg = tm.display.Sprite("mask", SC_W, SC_H).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);

        //プレイヤー
        this.player = tds.Player().addChildTo(this);
        this.player.setPosition(SC_W/2, SC_H/2);
        this.player.setScale(2.0);
        this.player.parentScene = this;
    },
    
    update: function() {
    },

    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        if (this.touchID > 0)return;
        this.touchID = e.ID;

        var sx = this.startX = e.pointing.x;
        var sy = this.startY = e.pointing.y;
        this.moveX = 0;
        this.moveY = 0;

        this.beforeX = sx;
        this.beforeY = sy;
    },

    //タッチorクリック移動処理
    ontouchesmove: function(e) {
        if (this.touchID != e.ID) return;

        var sx = e.pointing.x;
        var sy = e.pointing.y;
        var moveX = Math.abs(sx - this.beforeX);
        var moveY = Math.abs(sx - this.beforeY);

        if (this.time % 10 == 0) {
            this.beforeX = sx;
            this.beforeY = sy;
        }
    },

    //タッチorクリック終了処理
    ontouchesend: function(e) {
        if (this.touchID != e.ID) return;
        this.touchID = -1;

        var sx = e.pointing.x;
        var sy = e.pointing.y;
    },

    //addChildオーバーライド
    addChild: function(child) {
        if (this.layer === undefined) {
            return this.superClass.prototype.addChild.apply(this, arguments);
        }
        return this.layers[child.layer].addChild(child);
    },
});

})();

/*
LAYER_SYSTEM = 10;           //システム表示
LAYER_FOREGROUND = 9;       //フォアグラウンド
LAYER_EFFECT_UPPER = 8;     //エフェクト上位
LAYER_PLAYER = 8;           //プレイヤー
LAYER_OBJECT_UPPER = 6;     //オブジェクト上位
LAYER_BULLET = 5;           //弾
LAYER_SHOT = 4;             //ショット
LAYER_OBJECT = 3;           //オブジェクト中間
LAYER_OBJECT_LOWER = 2;     //オブジェクト下位
LAYER_EFFECT_LOWER = 1;     //エフェクト下位
LAYER_BACKGROUND = 0;       //バックグラウンド
*/