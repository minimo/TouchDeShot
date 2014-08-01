/*
 *  Enemy.js
 *  2014/08/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tds.Enemy", {
    superClass: "tm.app.Object2D",
    layer: LAYER_OBJECT,

    parentScene: null,

    init: function() {
        this.superInit();

        this.setupBody();

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        this.on("enterframe", function() {this.time++;});

        this.time = 0;
    },
    setupBody: function() {

        //コア
        var core = tm.display.Shape(16, 16).addChildTo(this);
        core.canvas.setFillStyle(
            tm.graphics.RadialGradient(8, 8, 0, 8, 8, 8)
                .addColorStopList([
                    {offset:0.0, color: "hsla({0}, 60%, 50%, 1.0)".format(100)},
                    {offset:0.5, color: "hsla({0}, 60%, 50%, 1.0)".format(140)},
                    {offset:1.0, color: "hsla({0}, 60%, 50%, 0.0)".format(140)},
                ]).toStyle()
            ).fillRect(0, 0, 16, 16);
        core.tweener.clear();
        core.tweener.scale(1.5, 100, "easeInOutQuad").scale(1.0, 200, "easeInOutQuad").setLoop(true);
    },
});

})();