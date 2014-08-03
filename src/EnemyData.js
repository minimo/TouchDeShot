/*
 *  EnemyData.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tds.EnemySpec['zako1'] = {
    width: 32,
    height: 32,
    colx: -16,  //当たり判定始点
    coly: -16,
    colw: 32,   //当たり判定サイズ
    colh: 32,
    def: 30,    //耐久力
    point: 300, //ポイント
    burn: 0,    //爆発パターン
    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ

    setup: function() {
        var sh = tm.display.Shape().addChildTo(this);
    },
    algorithm: function() {
    },
    attack: function() {
    },
    dead: function() {
    },
    remove: function() {
    },
};


})();
