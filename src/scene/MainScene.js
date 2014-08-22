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
    nowStage: 1,    //現在ステージ番号
    maxStage: 2,    //最大ステージ番号
    stage: null,    //ステージコントローラー
    enemyID: 0,     //敵投入ＩＤ
    timeVinish: 0,  //敵弾強制消去
    boss: false,    //ボス戦中フラグ
    stageClear: false,  //ステージクリアフラグ

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

        //システム表示ベース
        this.systemBase = tm.app.Object2D().addChildTo(this).setPosition(0, 0);

        //スコア表示ラベル
        app.score = 0;
        var sc = this.scoreLabel = tm.display.OutlineLabel("SCORE:0", 30).addChildTo(this.systemBase);
        sc.fontFamily = "'Orbitron'"; sc.align = "left"; sc.baseline  = "top"; sc.fontWeight = 700; sc.outlineWidth = 2;
        sc.update = function() {
            this.text = "SCORE:"+app.score;
        };

        //残機表示
        this.dispLife = tm.app.Object2D().addChildTo(this.systemBase);
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

        //ボス耐久力ゲージ
        this.bossGauge = tds.BossGauge().addChildTo(this.systemBase).setPosition(0, -66);

        //ステージ制御
        this.initStage();
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

        //ステージクリア検知
        if (this.stageClear) {
            this.stageClear = false;
            //１０秒後にステージクリアメッセージ投入
            tm.app.Object2D().addChildTo(this).tweener.wait(10000).call(function(){this.enterStageClear()}.bind(this));
            //ボス耐久ゲージ隠し
            this.systemBase.tweener.clear().moveBy(0, -64, 1000);
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
            tmp.tweener.clear().wait(3000).call(function(){app.replaceScene(tds.GameoverScene(this.nowStage, this.boss))}.bind(this));
        }
        this.time++;
        this.absTime++;
        this.timeVanish--; 
    },

    //敵ユニット単位の投入
    enterEnemyUnit: function(name) {
        var unit = tds.enemyUnit[name];
        if (unit === undefined)return;

        var len = unit.length;
        for (var i = 0; i < len; i++) {
            var e = unit[i];
            var en = tds.Enemy(e.name,e.x, e.y, this.enemyID, e.param).addChildTo(this);
            if (en.data.type == ENEMY_BOSS) {
                this.bossGauge.setTarget(en);
                this.systemBase.tweener.clear().moveBy(0, 64, 1000);
            }
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

    //WARNING表示投入
    enterWarning: function() {
        this.boss = true;
        app.playBGM("warning");
        var wg = tm.display.OutlineLabel("WARNING!!", 60).addChildTo(this);
        wg.x = -SC_W; wg.y = SC_H*0.5;
        wg.fontFamily = "'Orbitron'"; wg.align = "center"; wg.baseline  = "middle"; wg.fontWeight = 800; wg.outlineWidth = 2;
        wg.fillStyle = tm.graphics.LinearGradient(-SC_W*0.5, 0, SC_W*0.5, 64)
            .addColorStopList([
                { offset: 0.1, color: "hsla(230, 90%, 50%, 0.5)"},
                { offset: 0.5, color: "hsla(230, 80%, 90%, 0.9)"},
                { offset: 0.9, color: "hsla(230, 90%, 50%, 0.5)"},
            ]).toStyle();
        wg.shadowColor = "red";
        wg.shadowBlur = 10;
        wg.tweener
            .moveBy(SC_W*1.5, 0, 1000, "easeInOutCubic")
            .fadeOut(700).fadeIn(1).wait(1000)
            .fadeOut(700).fadeIn(1).wait(1000)
            .fadeOut(700).fadeIn(1).wait(1000)
            .moveBy(SC_W*1.5, 0, 1000, "easeInOutCubic");
    },

    //ステージ初期化    
    initStage: function() {
        switch (this.nowStage) {
            case 1:
                this.stage = tds.Stage1(this, this.player);
                break;
            case 2:
                this.stage = tds.Stage1(this, this.player);
                break;
            case 2:
                this.stage = tds.Stage1(this, this.player);
                break;
        }
        this.time = 0;
        this.timeVanish = 0;
    },

    //ステージクリア情報表示
    enterStageClear: function() {
        var mask = tm.display.Shape(SC_W*0.8, SC_H*0.8).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        mask.renderRectangle({fillStyle: "rgba(0,0,128,0.5)", strokeStyle: "rgba(128,128,128,0.5)"});
        mask.alpha = 0;

        var m1 = tm.display.OutlineLabel("STAGE "+this.nowStage+" CLEAR!", 50).addChildTo(mask);
        m1.x = 0; m1.y = 0;
        m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;

        //次ステージへ移行
        mask.tweener.fadeIn(1000).wait(5000).fadeOut(2000)
            .call(function(){
                this.nowStage++;
                this.initStage();
            }.bind(this));
    },

    //全ステージクリア情報表示
    enterAllStageClear: function() {
        var mask = tm.display.Shape(SC_W*0.8, SC_H*0.8).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        mask.renderRectangle({fillStyle: "rgba(0,0,128,0.5)", strokeStyle: "rgba(128,128,128,0.5)"});
        mask.alpha = 0;

        var m1 = tm.display.OutlineLabel("STAGE ALL CLEAR!", 50).addChildTo(mask);
        m1.x = 0; m1.y = 0;
        m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;

        //ゲームオーバー表示へ移行
        mask.tweener.fadeIn(1000).wait(5000).fadeOut(2000)
            .call(function(){
                app.replaceScene(tds.GameoverScene(this.nowStage, this.boss, true))
            }.bind(this));
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
