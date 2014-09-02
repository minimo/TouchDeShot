/*
 *  Interface.js
 *  2014/08/11
 *  @auther minimo  
 *  This Program is MIT license.
 */

(function() {

//ステージリザルト表示
tm.define("tds.Result", {
    superClass: "tm.app.Object2D",

    layer: LAYER_FOREGROUND,    //所属レイヤー
    parentScene: null,          //親シーン
    player: null,               //プレイヤー参照用

    phase: 1,       //表示フェーズ
    finish: false,  //表示終了フラグ

    clearBonus: 0,
    ratioBonus: 0,

    init: function(stageNumber, enemyCount, enemyKill, clearBonus, nomiss) {
        this.superInit();
        this.originX = this.originY = 0;

        var mask = tm.display.Shape(SC_W*0.8, SC_H*0.6).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        mask.renderRectangle({fillStyle: "rgba(0,0,128,0.5)", strokeStyle: "rgba(128,128,128,0.5)"});
        mask.alpha = 1;
        mask.tweener.fadeIn(1000);

        this.msg = [];
        if (stageNumber != 0) {
            var m1 = this.msg[0] = tm.display.OutlineLabel("STAGE "+stageNumber+" CLEAR!", 30).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.3);
            m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
        } else {
            var m1 = this.msg[0] = tm.display.OutlineLabel("ALL CLEAR!", 30).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.3);
            m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
        }

        this.clearBonus = clearBonus;
        m1 = this.msg[1] = tm.display.OutlineLabel("CLEAR BONUS: "+clearBonus, 25).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.4);
        m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
        m1.alpha = 0;

        var killRatio = ~~(enemyKill/enemyCount*1000)/10;
        m1 = this.msg[2] = tm.display.OutlineLabel("KILL RATIO: "+killRatio+"%", 25).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
        m1.alpha = 0;

        this.ratioBonus = 0;
        if (killRatio == 100) {
            this.ratioBonus = 100000;
        } else if (killRatio >= 90) {
            this.ratioBonus = 50000;
        } else if (killRatio >= 80) {
            this.ratioBonus = 30000;
        }
        if (this.ratioBonus > 0) {
            m1 = this.msg[3] = tm.display.OutlineLabel("RATIO BONUS: "+this.ratioBonus, 25).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.6);
            m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
            m1.alpha = 0;
        }

        this.time = 1;
    },

    update: function() {
        if (this.time % 30 == 0 && this.phase < this.msg.length) {
            this.msg[this.phase].tweener.fadeIn(100);
            this.phase++;
            if (this.phase == this.msg.length) this.finish = true;
            if (this.phase == 1) {
                this.parentScene.score+=this.clearBonus;
            }
            if (this.phase == 3) {
                this.parentScene.score+=this.ratioBonus;
            }
        }
        this.time++;
    },
});

//ボス耐久力表示
tm.define("tds.BossGauge", {
    superClass: "tm.display.CanvasElement",

    layer: LAYER_FOREGROUND,    //所属レイヤー
    parentScene: null,          //親シーン
    player: null,               //プレイヤー参照用
    target: null,

    init: function(x, y, width) {
        this.superInit();

        this.blendMode = "lighter";
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || SC_W-32;
        this.height = 16;
    },

    setTarget: function(target) {
        this.target = target;
    },

    update: function() {
    },

    draw: function(canvas) {
        //勢力図作成
        if (this.target) {
            canvas.lineWidth = 16;
            canvas.globalCompositeOperation = "source-over";
            canvas.fillStyle = "rgba(64, 64, 64, 0.8)";
            canvas.fillRect(0, 0, this.width, this.height);

            var value = this.width/this.target.defMax*this.target.def;

            var bl = this.width-20;
            canvas.fillStyle = "rgba(255, 64, 64, 0.8)";
            canvas.fillRect(16, 0, SC_W-32, 16);
            canvas.fillStyle = "rgba(64, 255, 64, 1.0)";
            canvas.fillRect(16, 0, value, 16);
        }
    }
});


})();
