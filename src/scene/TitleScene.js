/*
 *  TitleScene.js
 *  2014/08/11
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
//タイトルシーン
tm.define("tds.TitleScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
        app.background = "rgba(0, 0, 0, 1.0)";

        //レイヤー作成
        this.layers = [];
        for (var i = 0; i < LAYER_SYSTEM+1; i++) {
            this.layers[i] = tm.app.Object2D().addChildTo(this);
        }
        this.player = tds.Player().addChildTo(this);
        this.player.setPosition(SC_W*0.5, SC_H*0.8);
        this.player.isDemo = true;
        app.player = this.player;

        this.mask = tm.display.Shape(SC_W, SC_H).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.renderRectangle({fillStyle: "rgba(0,0,0,0.5)", strokeStyle: "rgba(0,0,0,0.1)"});

        //デモ用ステージデータ
        this.stage = tds.Stage0();

        var t1 = this.title1 = tm.display.OutlineLabel("BulletSimulator", 30).addChildTo(this);
        t1.x = SC_W*0.5; t1.y = SC_H*0.4;
        t1.fontFamily = "'UbuntuMono'"; t1.align = "center"; t1.baseline  = "middle"; t1.fontWeight = 300; t1.outlineWidth = 2;

        var t2 = this.title2 = tm.display.OutlineLabel("Touch de SHOT!!", 60).addChildTo(this);
        t2.x = SC_W*0.5; t2.y = SC_H*0.5;
        t2.fontFamily = "'Orbitron'"; t2.align = "center"; t2.baseline  = "middle"; t2.fontWeight = 800; t2.outlineWidth = 2;
        t2.fillStyle = tm.graphics.LinearGradient(-SC_W*0.5, 0, SC_W*0.5, 64)
            .addColorStopList([
                { offset: 0.1, color: "hsla(230, 90%, 50%, 0.5)"},
                { offset: 0.5, color: "hsla(230, 80%, 90%, 0.9)"},
                { offset: 0.9, color: "hsla(230, 90%, 50%, 0.5)"},
            ]).toStyle();
        t2.shadowColor = "blue";
        t2.shadowBlur = 10;
        var ct = this.clickortouch = tm.display.OutlineLabel("Click or Touch", 30).addChildTo(this);
        ct.x = SC_W*0.5; ct.y = SC_H*0.8;
        ct.fontFamily = "'UbuntuMono'"; ct.align = "center"; ct.baseline  = "middle"; ct.fontWeight = 500; ct.outlineWidth = 2;

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
        this.time++;
    },

    //敵ユニット単位の投入
    enterEnemyUnit: function(name) {
        var unit = tds.enemyUnit[name];
        if (unit === undefined)return;

        var len = unit.length;
        for (var i = 0; i < len; i++) {
            var e = unit[i];
            tds.Enemy(e.name,e.x, e.y).addChildTo(this);
        }
    },

    ontouchend: function() {
        app.background = "rgba(0, 0, 0, 0.8)";
        app.replaceScene(tds.MainScene());
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

