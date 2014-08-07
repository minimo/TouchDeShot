/*
 *  EnemyData.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {
tds.enemyData = [];

tds.enemyData['cube1'] = {
    bulletPattern: "AIM_1",  //使用弾幕パターン

    width:  32,  //当り判定サイズ
    height: 32,

    def: 3,     //耐久力
    point: 300, //ポイント

    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ

    setup: function() {
        var param = {
            strokeStyle:"hsla(100, 50%, 70%, 1.0)",
            fillStyle:  "hsla(100, 50%, 50%, 0.3)",
            lineWidth: 1,
        };
        tm.display.Shape(16, 40).addChildTo(this).renderRectangle(param);

        var sh = tm.display.Shape(60, 10).addChildTo(this);
        sh.renderRectangle(param);
        sh.update = function() {
            this.rotation += 30;
        }

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

tds.enemyData['cube2'] = {
    bulletPattern: "AIM_1",  //使用弾幕パターン

    width:  32,  //当り判定サイズ
    height: 32,

    def: 3,     //耐久力
    point: 300, //ポイント

    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ

    setup: function() {
        var param = {
            strokeStyle:"hsla(100, 50%, 70%, 1.0)",
            fillStyle:  "hsla(100, 50%, 50%, 0.3)",
            lineWidth: 1,
        };
        tm.display.Shape(16, 40).addChildTo(this).renderRectangle(param);

        var sh = tm.display.Shape(60, 10).addChildTo(this);
        sh.renderRectangle(param);
        sh.update = function() {
            this.rotation += 30;
        }
    },

    algorithm: function() {
        this.moveTo(this.player, 5, true);
    },
};


tds.enemyData['boss1'] = {
    bulletPattern: "AIM_1",  //使用弾幕パターン

    width:  256,  //当り判定サイズ
    height: 128,

    def: 500,      //耐久力
    point: 100000, //ポイント

    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ

    setup: function() {
        var param = {
            strokeStyle:"hsla(250, 50%, 50%, 1.0)",
            fillStyle:  "hsla(250, 50%, 50%, 0.3)",
            lineWidth: 1,
        };
        tm.display.Shape(256, 128).addChildTo(this).renderRectangle(param);

        tm.display.Shape(64, 128).addChildTo(this).setPosition( 128+40, 0).renderRectangle(param);
        tm.display.Shape(64, 128).addChildTo(this).setPosition(-128-40, 0).renderRectangle(param);

        var sh = tm.display.Shape(60, 10).addChildTo(this);
        sh.renderRectangle(param);
        sh.update = function() {
            this.rotation += 30;
        }

        this.tweener.moveBy(0, 300, 3000).wait(2000);
    },

    algorithm: function() {
    },
};


})();
