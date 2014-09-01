/*
 *  EnemyData.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {
tds.enemyData = [];

//攻撃ヘリタイプ（通常）
tds.enemyData['cube1'] = {
    //使用弾幕パターン
    bulletPattern: "cube1",

    //当り判定サイズ
    width:  16,
    height: 16,

    //耐久力
    def: 3,

    //得点
    point: 300,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_SMALL,

    setup: function() {
        var colorparam = {
            strokeStyle:"hsla(100, 50%, 70%, 1.0)",
            fillStyle:  "hsla(100, 50%, 50%, 0.3)",
            lineWidth: 1,
        };
        tm.display.Shape(16, 40).addChildTo(this).renderRectangle(colorparam);

        var sh = tm.display.Shape(60, 10).addChildTo(this);
        sh.renderRectangle(colorparam);
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

//攻撃ヘリタイプ（突撃）
tds.enemyData['cube2'] = {
    //使用弾幕パターン
    bulletPattern: "cube2",

    //当り判定サイズ
    width:  16,
    height: 16,

    //耐久力
    def: 3,

    //得点
    point: 300,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_SMALL,

    isNear: false,

    setup: function() {
        var colorparam = {
            strokeStyle:"hsla(100, 50%, 70%, 1.0)",
            fillStyle:  "hsla(100, 50%, 50%, 0.3)",
            lineWidth: 1,
        };
        tm.display.Shape(16, 40).addChildTo(this).renderRectangle(colorparam);

        var sh = tm.display.Shape(60, 10).addChildTo(this);
        sh.renderRectangle(colorparam);
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

//中型機
tds.enemyData['square1'] = {
    //使用弾幕パターン
    bulletPattern: "square1",

    //当り判定サイズ
    width:  64,
    height: 64,

    //耐久力
    def: 150,

    //得点
    point: 5000,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_LARGE,

    setup: function() {
        this.phase = 0;
        this.rotation = 45;

        var colorparam = {
            strokeStyle:"hsla(180, 50%, 70%, 1.0)",
            fillStyle:  "hsla(180, 50%, 50%, 0.5)",
            lineWidth: 1,
        };
        tm.display.Shape(64, 64).addChildTo(this).renderRectangle(colorparam);

        var that = this;
        this.c1 = tm.display.Shape(64, 64).addChildTo(this).renderRectangle(colorparam).setPosition(-32,-32);
        this.c1.update = function() {if (that.phase ==1) this.rotation = -that.rotation+45;}
        this.c2 = tm.display.Shape(64, 64).addChildTo(this).renderRectangle(colorparam).setPosition( 32,-32);
        this.c2.update = function() {if (that.phase ==1) this.rotation = -that.rotation+45;}
        this.c3 = tm.display.Shape(64, 64).addChildTo(this).renderRectangle(colorparam).setPosition(-32, 32);
        this.c3.update = function() {if (that.phase ==1) this.rotation = -that.rotation+45;}
        this.c4 = tm.display.Shape(64, 64).addChildTo(this).renderRectangle(colorparam).setPosition( 32, 32);
        this.c4.update = function() {if (that.phase ==1) this.rotation = -that.rotation+45;}

        this.tweener.moveBy(0, 300, 4000, "easeOutQuart")
            .call(function(){
                if (this.x < SC_W*0.5) {
                    this.tweener.clear().moveBy(SC_W*0.5, 10, 3000, "easeInOutCubic").moveBy(-SC_W*0.5, 10, 3000, "easeInOutCubic").setLoop(true);
                } else {
                    this.tweener.clear().moveBy(-SC_W*0.5, 10, 3000, "easeInOutCubic").moveBy(SC_W*0.5, 10, 3000, "easeInOutCubic").setLoop(true);
                }
                this.phase++;
            }.bind(this));
    },

    algorithm: function() {
        if (this.phase == 1) this.rotation-=2;
    },
};

//小型空中砲台
tds.enemyData['triangle1'] = {
    //使用弾幕パターン
    bulletPattern: "triangle1-a",

    //当り判定サイズ
    width:  8,
    height: 8,

    //耐久力
    def: 10,

    //得点
    point: 500,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_MIDDLE,

    setup: function() {

        this.phase = 0;
        this.rotation = 0;

        var colorparam = {
            strokeStyle:"hsla(200, 50%, 70%, 1.0)",
            fillStyle:  "hsla(200, 50%, 50%, 0.5)",
            lineWidth: 1,
        };
        tm.display.Shape(32, 32).addChildTo(this).renderTriangle(colorparam);

        if (this.x > SC_W*0.5)this.bulletPattern = "triangle1-b";
    },

    algorithm: function() {
        this.rotation += 10;
        this.y++;
    },
};

//大型機
tds.enemyData['triangle2'] = {
    //使用弾幕パターン
    bulletPattern: "triangle2",

    //当り判定サイズ
    width:  128,
    height: 64,

    //耐久力
    def: 50,

    //得点
    point: 2000,

    //レイヤー
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_SMALL,

    setup: function() {
        this.rotation = 180;

        var colorparam = {
            strokeStyle:"hsla(200, 50%, 70%, 1.0)",
            fillStyle:  "hsla(200, 50%, 50%, 0.5)",
            lineWidth: 1,
        };
        var s = tm.display.Shape(64, 64).addChildTo(this).renderTriangle(colorparam);
        s.scaleX = 2;
        
    },

    algorithm: function() {
        this.y++;
    },
};

//ステージ１中ボス（未定）
tds.enemyData['mboss1'] = {
    //使用弾幕パターン
    bulletPattern: "basic-aim1",

    //当り判定サイズ
    width:  256,
    height: 110,

    //耐久力
    def: 500,

    //得点
    point: 100000,

    //レイヤー
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_BOSS,

    setup: function() {
        var colorparam = {
            strokeStyle:"hsla(250, 50%, 50%, 1.0)",
            fillStyle:  "hsla(250, 50%, 50%, 0.3)",
            lineWidth: 2,
        };
        tm.display.Shape(200, 100).addChildTo(this).renderRectangle(colorparam);
        tm.display.Shape(240,  80).addChildTo(this).renderRectangle(colorparam);

        var r1 = tm.display.Shape(64, 128).addChildTo(this).setPosition( 138, 0).renderRectangle(colorparam);
        var r2 = tm.display.Shape(54, 118).addChildTo(this).setPosition( 138, 0).renderRectangle(colorparam);

        var l1 = tm.display.Shape(64, 128).addChildTo(this).setPosition(-138, 0).renderRectangle(colorparam);
        var l2 = tm.display.Shape(54, 118).addChildTo(this).setPosition(-138, 0).renderRectangle(colorparam);

        //ローター
        tm.display.Shape(16, 16).addChildTo(r1).renderRectangle(colorparam);
        var sh = tm.display.Shape(110, 20).addChildTo(r1);
        sh.renderRectangle(colorparam);
        sh.update = function() {
            this.rotation += 10;
        }
        var sh = tm.display.Shape(110, 20).addChildTo(r1);
        sh.renderRectangle(colorparam);
        sh.rotation = 90;
        sh.update = function() {
            this.rotation += 10;
        }

        tm.display.Shape(16, 16).addChildTo(l1).renderRectangle(colorparam);
        var sh = tm.display.Shape(110, 20).addChildTo(l1);
        sh.renderRectangle(colorparam);
        sh.update = function() {
            this.rotation -= 10;
        }
        var sh = tm.display.Shape(110, 20).addChildTo(l1);
        sh.renderRectangle(colorparam);
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

//ステージ１ボス（四畳半）コア
tds.enemyData['yojouhan-a'] = {
    //使用弾幕パターン
    bulletPattern: ["yojouhan-a-1", "yojouhan-a-2"],

    //当り判定サイズ
    width:  64,
    height: 64,

    //耐久力
    def: 300,

    //得点
    point: 50000,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_BOSS,

    setup: function() {
        this.phase = 0;

        var colorparam = {
            strokeStyle:"hsla(180, 50%, 70%, 1.0)",
            fillStyle:  "hsla(180, 50%, 50%, 0.5)",
            lineWidth: 1,
        };
        tm.display.Shape(64, 64).addChildTo(this).renderRectangle(colorparam);

        this.tweener
            .moveBy(0, SC_H*0.5, 3000, "easeOutQuart")
            .call(function(){this.phase++}.bind(this))
            .wait(1000)
            .moveBy(SC_W*0.3, 0, 3000, "easeInOutCubic")
            .call(function(){
                this.tweener.clear()
                .moveBy(-SC_W*0.6, 0, 6000, "easeInOutCubic")
                .moveBy( SC_W*0.6, 0, 6000, "easeInOutCubic").setLoop(true);
            }.bind(this));

        //子機の投入（右上から時計回り）
        var sc = this.parentScene;
        sc.enterEnemy("yojouhan-b", this.x+64, this.y-32, {num:1, rotation:  0}).setParentEnemy(this);
        sc.enterEnemy("yojouhan-b", this.x+32, this.y+64, {num:2, rotation: 90}).setParentEnemy(this);
        sc.enterEnemy("yojouhan-b", this.x-64, this.y+32, {num:3, rotation:180}).setParentEnemy(this);
        sc.enterEnemy("yojouhan-b", this.x-32, this.y-64, {num:4, rotation:270}).setParentEnemy(this);
    },

    algorithm: function() {
        if (this.phase > 0) this.rotation += 5;
    },
};

//ステージ１ボス（四畳半）子機
tds.enemyData['yojouhan-b'] = {
    bulletPattern: "yojouhan-b-1",  //使用弾幕パターン

    //当り判定サイズ
    width:  64,
    height: 64,

    //耐久力
    def: 100,

    //得点
    point: 10000,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_MIDDLE,

    setup: function(param) {
        this.phase = 0;
        this.originY = 0.25;
        this.num = param.num;

        this.rotation = param.rotation;

        var colorparam = {
            strokeStyle:"hsla(180, 50%, 70%, 1.0)",
            fillStyle:  "hsla(180, 50%, 50%, 0.5)",
            lineWidth: 1,
        };
        tm.display.Shape(64, 128).addChildTo(this).renderRectangle(colorparam);

        var x = 0, y = 0;
        if (param.num == 1) {x = SC_W*0.4; y = SC_H*0.2}
        if (param.num == 2) {x = SC_W*0.6; y = SC_H*0.2}
        if (param.num == 3) {x = SC_W*0.3; y = SC_H*0.3}
        if (param.num == 4) {x = SC_W*0.7; y = SC_H*0.3}
        this.relativeX = x-SC_W*0.5;
        this.relativeY = y-SC_W*0.3;
        this.tweener
            .moveBy(0, SC_H*0.5, 3000, "easeOutQuart")
            .call(function(){this.phase++}.bind(this))
            .wait(500)
            .to({rotation:0, x:x, y:y},1000,"easeInOutCubic")
            .call(function(){this.phase++}.bind(this));
    },

    algorithm: function() {
        if (this.phase == 1) {
            //初期位置の記録
            this.startX = this.x;
            this.startY = this.y;
            this.startR = this.rotation;
            this.phase++;
        }
        if (this.phase == 3) {
            this.x = this.parentEnemy.x+this.relativeX;
            this.y = this.parentEnemy.y+this.relativeY;
            this.lookAt();
        }

        if (this.phase == 11) {
            var x = rand(SC_W*0.1, SC_W*0.9);
            var y = rand(SC_H*0.1, SC_H*0.4);
            this.tweener.clear()
                .to({rotation:0, x:x, y:y},1000,"easeInOutCubic")
                .call(function(){this.phase++}.bind(this));
            this.phase++;
        }
        if (this.phase > 12) this.lookAt();
        if (this.phase == 13) {
            this.tweener.clear()
                .to({x:rand(SC_W*0.1, SC_W*0.9), y:rand(SC_H*0.1, SC_H*0.4)},1000,"easeInOutCubic")
                .wait(1000)
                .call(function(){this.phase = 3}.bind(this));
            this.phase++;
        }

        if (this.phase == 10) {
            this.tweener.clear()
                .to({rotation:0, x:this.startX, y:this.startY},1000,"easeInOutCubic");
        } 
    },
};


})();
