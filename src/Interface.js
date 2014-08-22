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

    max: 1000,
    value: 1000,
    beforeValue: 1000,

    init: function() {
        this.superInit();

        this.bar = tm.display.Shape(SC_W*0.9, 32).addChildTo(this).setPosition(SC_W*0.5, 0);
        this.bar.renderRectangle({fillStyle: "rgba(64,256,64,1.0)", strokeStyle: "rgba(255,255,255,1.0)"});
    },

    update: function() {
        this.beforeValue = this.value;
    },

    draw: function(canvas) {
        canvas.lineWidth = 2;
        canvas.globalCompositeOperation = "lighter";

        var color1 = "hsla({0}, 60%, 50%, 0.5)".format(100);
        var color2 = "hsla({0}, 60%, 50%, 1.0)".format(280);

        canvas.strokeStyle = "white";
        canvas.strokeRect(0, 0, SC_W, 64);
        canvas.fillStyle = "red";
        canvas.fillRect(0, 0, SC_W, 64);
        canvas.fillStyle = "green";
        canvas.fillRect(0, 0, SC_W, 64);
    },

    setTarget: function(target) {
        this.target = target;
        this.max = this.value = target.def;
    },
});

})();
