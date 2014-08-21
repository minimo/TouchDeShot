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

    //ステージ制御
    stage: null,    //ステージコントローラー
    enemyID: 0,     //敵投入ＩＤ
    timeVinish: 0,  //敵弾強制消去

    //プレイヤー情報
    life: 2,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 1.0)";

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);

        this.mask = tm.display.Shape(SC_W, SC_H).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.renderRectangle({fillStyle: "rgba(0,0,0,1.0)", strokeStyle: "rgba(0,0,0,1.0)"});

        //レイヤー作成
        this.layers = [];
        for (var i = 0; i < LAYER_SYSTEM+1; i++) {
            this.layers[i] = tm.app.Object2D().addChildTo(this);
        }

        //プレイヤー
        this.player = tds.Player().addChildTo(this);
        this.player.stageStartup();
        app.player = this.player;

        //ステージ制御
        this.stage = tds.Stage1(this, this.player);

        //スコア表示ラベル
        app.score = 0;
        var sc = this.scoreLabel = tm.display.OutlineLabel("SCORE:0", 30).addChildTo(this);
        sc.fontFamily = "'Orbitron'"; sc.align = "left"; sc.baseline  = "top"; sc.fontWeight = 700; sc.outlineWidth = 2;
        sc.update = function() {
            this.text = "SCORE:"+app.score;
        };

        //残機表示
        this.dispLife = tm.app.Object2D().addChildTo(this);
        this.dispLife.player = [];
        this.dispLife.life = 0;
        this.dispLife.inc = function() {
            this.life++;
            this.player[this.life] = tds.PlayerDisp().addChildTo(this).setPosition(this.life*50-20, 64);
        }
        this.dispLife.dec = function() {
            if (this.life == 0) return;
            this.player[this.life].remove();
            this.life--;
        }
        for (var i = 0; i < this.life; i++) this.dispLife.inc();

        this.time = 0;
    },

    update: function() {
        //ステージ進行
        var event = this.stage.get(this.time);
        if (event) {
            if (typeof(event.value) === 'function') {
                event.value.call(this);
            } else {
                this.enterEnemyUnit(event.value);
            }
        }

        //敵弾強制消去
        if (this.timeVanish > 0 && this.time % 6 == 0) {
            this.eraseBullet();
        }

        //エクステンド検知
        if (app.extendNumber < app.extendScore.length) {
            if (app.score > app.extendScore[app.extendNumber]) {
                app.extendNumber++;
                this.dispLife.inc();
            }
        }

        //ゲームオーバー検知
        if (this.life == -1) {
            this.life = -99;
            var tmp = tm.app.Object2D().addChildTo(this);
            tmp.tweener.clear().wait(3000).call(function(){app.replaceScene(tds.GameoverScene())});
        }
        this.time++;
        this.timeVanish--; 
    },

    //敵ユニット単位の投入
    enterEnemyUnit: function(name) {
        var unit = tds.enemyUnit[name];
        if (unit === undefined)return;

        var len = unit.length;
        for (var i = 0; i < len; i++) {
            var e = unit[i];
            tds.Enemy(e.name,e.x, e.y, this.enemyID, e.param).addChildTo(this);
            this.enemyID++;
        }
    },

    //弾の消去
    eraseBullet: function(target) {
        if (target) {
            //個別弾消し
            this.layers[LAYER_BULLET].children.each(function(a) {
                if (target.id == a.id) a.isVanish = true;
            });
        } else {
            //全消し
            this.layers[LAYER_BULLET].children.each(function(a) {
                a.isVanish = true;
            });
        }
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
        if (child.layer === undefined) {
            return this.superClass.prototype.addChild.apply(this, arguments);
        }
        child.parentScene = this;
        child.player = this.player;
        return this.layers[child.layer].addChild(child);
    },
});

})();
