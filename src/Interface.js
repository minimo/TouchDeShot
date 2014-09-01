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

    init: function(stageNumber, bonus, enemyCount, enemyKill) {
        this.superInit();
        this.setPosition(SC_W*0.1, SC_H*0.1);
        this.originX = this.originY = 0;

        var mask = tm.display.Shape(SC_W*0.8, SC_H*0.8).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        mask.renderRectangle({fillStyle: "rgba(0,0,128,0.5)", strokeStyle: "rgba(128,128,128,0.5)"});
        mask.alpha = 1;
        mask.tweener.fadeIn(1000);

        this.msg = [];
        if (stageNumber != 0) {
            var m1 = this.msg[0] = tm.display.OutlineLabel("STAGE "+stageNumber+" CLEAR!", 30).addChildTo(this).setPosition(SC_W*0.4, SC_H*0.1);
            m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
            m1.alpha = 0;
        } else {
            var m1 = this.msg[0] = tm.display.OutlineLabel("ALL CLEAR!", 30).addChildTo(this).setPosition(SC_W*0.4, SC_H*0.1);
            m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
            m1.alpha = 0;
        }

        m1 = this.msg[1] = tm.display.OutlineLabel("Clear Bonus: "+bonus, 25).addChildTo(this).setPosition(SC_W*0.4, SC_H*0.2);
        m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
        m1.alpha = 0;

        m1 = this.msg[2] = tm.display.OutlineLabel("Enemy kill: "+enemyKill, 25).addChildTo(this).setPosition(SC_W*0.4, SC_H*0.3);
        m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
        m1.alpha = 0;

        var killRatio = ~~(enemyKill/enemyCount*1000)/10;
        m1 = this.msg[3] = tm.display.OutlineLabel("Kill ratio: "+killRatio+"%", 25).addChildTo(this).setPosition(SC_W*0.4, SC_H*0.4);
        m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;
        m1.alpha = 0;

        this.time = 1;
    },

    update: function() {
        if (this.time % 120 == 0 && this.phase < this.msg.length) {
            this.msg[this.phase].tweener.fadeIn(500);
            this.phase++;
            if (this.phase == this.msg.length) this.finish = true;
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
