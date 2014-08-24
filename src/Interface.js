/*
 *  Interface.js
 *  2014/08/11
 *  @auther minimo  
 *  This Program is MIT license.
 */

(function() {

//ステージリザルト表示
tm.define("tds.StageResult", {
    superClass: "tm.display.CanvasElement",

    layer: LAYER_FOREGROUND,    //所属レイヤー
    parentScene: null,          //親シーン
    player: null,               //プレイヤー参照用

    init: function() {
        this.superInit();
        this.mask = tm.display.Shape(SC_W*0.9, SC_H*0.9).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.renderRectangle({fillStyle: "rgba(64,64,256,0.5)", strokeStyle: "rgba(128,128,128,0.5)"});
    },

    update: function() {
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
