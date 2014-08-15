/*
 *  EnemyData.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {
tds.enemyData = [];

tds.enemyData['cube1'] = {
    bulletPattern: "cube1",  //使用弾幕パターン

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

        this.tweener.moveBy(0, 300, 1000, "easeOutQuart").wait(1000).moveBy(0, -300, 3000).call(function(){this.remove();}.bind(this));
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
    bulletPattern: "cube2",  //使用弾幕パターン

    width:  32,  //当り判定サイズ
    height: 32,

    def: 3,     //耐久力
    point: 300, //ポイント

    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ

    isNear: false,

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
        this.moveTo(this.player, 5, true);
    },

    algorithm: function() {
        this.x += this.vx;
        this.y += this.vy;
    },
};

tds.enemyData['square1'] = {
    bulletPattern: "basic-aim1",  //使用弾幕パターン

    width:  64,  //当り判定サイズ
    height: 64,

    def: 100,   //耐久力
    point: 500, //ポイント

    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ

    setup: function() {
        var param = {
            strokeStyle:"hsla(180, 50%, 70%, 1.0)",
            fillStyle:  "hsla(180, 50%, 50%, 0.5)",
            lineWidth: 1,
        };
        tm.display.Shape(64, 64).addChildTo(this).renderRectangle(param);

        var c = tm.display.Shape(64, 64).addChildTo(this).renderRectangle(param).setPosition(-32,-32);
        c.tweener.wait(1000).moveBy(-8, -8, 1000);
        var c = tm.display.Shape(64, 64).addChildTo(this).renderRectangle(param).setPosition( 32,-32);
        c.tweener.wait(1000).moveBy(8, -8, 1000);
        var c = tm.display.Shape(64, 64).addChildTo(this).renderRectangle(param).setPosition(-32, 32);
        c.tweener.wait(1000).moveBy(-8, 8, 1000);
        var c = tm.display.Shape(64, 64).addChildTo(this).renderRectangle(param).setPosition( 32, 32);
        c.tweener.wait(1000).moveBy(8, 8, 1000);

        this.tweener.moveBy(0, 300, 3000, "easeOutQuart")
            .call(function(){
                if (this.x < SC_W*0.5) {
                    this.tweener.clear().moveBy(SC_W*0.5, 0, 3000, "easeInOutQuart").moveBy(-SC_W*0.5, 0, 3000, "easeInOutQuart").setLoop(true);
                } else {
                    this.tweener.clear().moveBy(-SC_W*0.5, 0, 3000, "easeInOutQuart").moveBy(SC_W*0.5, 0, 3000, "easeInOutQuart").setLoop(true);
                }
            }.bind(this));
    },

    algorithm: function() {
    },
};

tds.enemyData['boss1'] = {
    bulletPattern: "basic-aim1",  //使用弾幕パターン

    width:  256,  //当り判定サイズ
    height: 110,

    def: 500,      //耐久力
    point: 100000, //ポイント

    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ

    setup: function() {
        var param = {
            strokeStyle:"hsla(250, 50%, 50%, 1.0)",
            fillStyle:  "hsla(250, 50%, 50%, 0.3)",
            lineWidth: 2,
        };
        tm.display.Shape(200, 100).addChildTo(this).renderRectangle(param);
        tm.display.Shape(240,  80).addChildTo(this).renderRectangle(param);

        var r1 = tm.display.Shape(64, 128).addChildTo(this).setPosition( 138, 0).renderRectangle(param);
        var r2 = tm.display.Shape(54, 118).addChildTo(this).setPosition( 138, 0).renderRectangle(param);

        var l1 = tm.display.Shape(64, 128).addChildTo(this).setPosition(-138, 0).renderRectangle(param);
        var l2 = tm.display.Shape(54, 118).addChildTo(this).setPosition(-138, 0).renderRectangle(param);

        //ローター
        tm.display.Shape(16, 16).addChildTo(r1).renderRectangle(param);
        var sh = tm.display.Shape(110, 20).addChildTo(r1);
        sh.renderRectangle(param);
        sh.update = function() {
            this.rotation += 10;
        }
        var sh = tm.display.Shape(110, 20).addChildTo(r1);
        sh.renderRectangle(param);
        sh.rotation = 90;
        sh.update = function() {
            this.rotation += 10;
        }

        tm.display.Shape(16, 16).addChildTo(l1).renderRectangle(param);
        var sh = tm.display.Shape(110, 20).addChildTo(l1);
        sh.renderRectangle(param);
        sh.update = function() {
            this.rotation -= 10;
        }
        var sh = tm.display.Shape(110, 20).addChildTo(l1);
        sh.renderRectangle(param);
        sh.rotation = 90;
        sh.update = function() {
            this.rotation -= 10;
        }

        this.phase = 0;
        this.tweener.moveBy(0, 300, 3000).wait(2000).call(function(){this.phase++}.bind(this));
    },

    algorithm: function() {
        if (this.phase == 1) {
            this.x += Math.sin(this.time*toRad);
        }
    },
};


})();