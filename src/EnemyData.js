/*
 *  EnemyData.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {
tds.enemyData = [];

tds.enemyData['cube1'] = {
    bulletPattern: "DANMAKU0",  //使用弾幕パターン

    width:  32,  //当り判定サイズ
    height: 32,

    def: 10,    //耐久力
    point: 300, //ポイント
    burn: 0,    //爆発パターン

    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ

    setup: function() {
        var param = {
            strokeStyle:"hsla(100, 50%, 70%, 1.0)",
            fillStyle:  "hsla(100, 50%, 50%, 0.3)",
            lineWidth: 1,
        };
        var sh = tm.display.Shape(32, 32).addChildTo(this).renderRectangle(param);

        this.tweener.moveBy(0, 300, 1000, "easeOutQuart").wait(2000).moveBy(0, -300, 1000).call(function(){this.remove();}.bind(this));
    },

    algorithm: function() {
        //自機の方向を向く
        var ax = this.x - this.player.x;
        var ay = this.y - this.player.y;
        var rad = Math.atan2(ay, ax);
        var deg = ~~(rad * toDeg);
        this.rotation = deg + 90;
    },
};


})();
