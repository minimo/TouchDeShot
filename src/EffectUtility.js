/*
 *  EffectUtility.js
 *  2014/08/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

(function() {

tds.burnParticle = function(x, y, num, color, life) {
    num = num || 10;
    color = color || 300;
    life = life || 1000;

    var base = tm.app.Object2D().setPosition(x, y);
    base.isLayer = LAYER_EFFECT_UPPER;
    for (var i = 0; i < num; i++ ) {
        var p = tds.Effect.Particle(64, 1, 0.95, color).addChildTo(base);
        var r = rand(0, 618) / 100;
        var d = rand(20, 50);
        var x = Math.cos(r)*d;
        var y = Math.sin(r)*d;
        p.tweener.moveBy(x, y, life, "easeOutCubic");
    }
    base.tweener.clear().wait(life).call(function(){this.remove()}.bind(base));
    return base;
}

})();