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

        var t1 = this.title1 = tm.display.OutlineLabel("BulletSimulator", 30).addChildTo(this);
        t1.x = SC_W*0.5; t1.y = SC_H*0.2;
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
        this.time++;
    },

    ontouchend: function() {
        app.background = "rgba(0, 0, 0, 0.8)";
        app.replaceScene(tds.MainScene());
    },
});

