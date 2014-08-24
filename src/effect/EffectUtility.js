/*
 *  EffectUtility.js
 *  2014/08/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

(function() {

//爆発パーティクル（小）
tds.burnParticleSmall = function(x, y, color) {
    color = color || 0;

    var num = 20;
    var life = 1000;
    var base = tm.app.Object2D().setPosition(x, y);
    base.isLayer = LAYER_EFFECT_UPPER;
    for (var i = 0; i < num; i++ ) {
        var p = tds.Effect.Particle(64, 1, 0.96, color).addChildTo(base).setPosition(rand(-32,32), rand(-32,32));
        var r = rand(0, 618) / 100;
        var d = rand(40, 80);
        var x = Math.cos(r)*d;
        var y = Math.sin(r)*d;
        var w = rand(0, 300);
        p.tweener.moveBy(x, y, life, "easeOutCubic");
    }
    base.tweener.clear().wait(life).call(function(){this.remove()}.bind(base));
    return base;
}

//爆発パーティクル（大）
tds.burnParticleLarge = function(x, y, color) {
    color = color || 310;

    var num = 60;
    var life = 2000;
    var base = tm.app.Object2D().setPosition(x, y);
    base.isLayer = LAYER_EFFECT_UPPER;
    for (var i = 0; i < num; i++ ) {
        var p = tds.Effect.Particle(96, 1, 0.96, color).addChildTo(base);
        var r = rand(0, 618) / 100;
        var d = rand(80, 120);
        var x = Math.cos(r)*d;
        var y = Math.sin(r)*d;
        var w = rand(0, 300);
        p.tweener.moveBy(x+rand(-20,20), y+rand(-20,20), life, "easeOutCubic");
    }
    base.tweener.clear().wait(life).call(function(){this.remove()}.bind(base));
    return base;
}

//自機爆発パーティクル
tds.burnParticlePlayer = function(x, y) {
    color = 200;

    var num = 60;
    var life = 2000;
    var base = tm.app.Object2D().setPosition(x, y);
    base.isLayer = LAYER_EFFECT_UPPER;
    for (var i = 0; i < num; i++ ) {
        var p = tds.Effect.Particle(96, 1, 0.96, color).addChildTo(base);
        var r = rand(0, 618) / 100;
        var d = rand(80, 120);
        var x = Math.cos(r)*d;
        var y = Math.sin(r)*d;
        var w = rand(0, 300);
        p.tweener.moveBy(x+rand(-20,20), y+rand(-20,20), life, "easeOutCubic");
    }
    base.tweener.clear().wait(life).call(function(){this.remove()}.bind(base));
    return base;
}

//衝撃波
tds.ShockWave = function(size, x, y) {
}

})();
