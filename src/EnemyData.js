/*
 *  EnemyData.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {
tds.enemyData = [];

tds.enemyData['zako1'] = {
    bulletPattern: "DANMAKU0",  //使用弾幕パターン

    width: 16,  //当り判定サイズ
    height: 16,

    def: 30,    //耐久力
    point: 300, //ポイント
    burn: 0,    //爆発パターン

    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ

    setup: function() {
        var sh = tm.display.Shape(32, 32).addChildTo(this);
        sh.renderRectangle();
        var that = this;
        this.tweener.moveBy(0, 300, 1000).wait(2000).moveBy(0, -300, 1000).call(function(){that.remove();});
    },
    algorithm: function() {
        this.rotation -= 5;
    },
    dead: function() {
    },
};


})();
