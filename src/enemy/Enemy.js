/*
 *  Enemy.js
 *  2014/08/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tds.Enemy", {
    superClass: "tm.display.CanvasElement",
    layer: LAYER_OBJECT,    //所属レイヤー
    parentScene: null,      //親シーン
    player: null,           //プレイヤー参照用

    parentEnemy: null,      //親となる敵キャラ

    //各種フラグ
    isCollision: true,  //当り判定
    isDead: false,      //死亡
    isMuteki: false,    //無敵
    isBoss: false,      //ボス
    isOnScreen: false,  //画面内に入った
    isGround: false,    //地上フラグ

    //キャラクタ情報
    name: null,
    def: 0,
    defMax: 0,
    bulletPattern: null,
    nowBulletPattern: null,
    id: -1,
    boss: false,

    data: null,

    beforeX: 0,
    beforeY: 0,

    init: function(name, x, y, id, param) {
        this.superInit();
        this.setPosition(x, y);
        this.id = id || -1;

        this.name = name;
        var d = this.data = tds.enemyData[name];
        if (!d) return false;

        this.def = d.def;
        this.defMax = d.def;

        this.width = d.width || 32;
        this.height = d.height || 32;
        this.layer = d.layer || LAYER_OBJECT;
        this.point = d.point || 0;

        if (d.setup) this.setup = d.setup;
        if (d.algorithm) this.algorithm = d.algorithm;
        if (d.dead) this.dead = d.dead;

        this.bulletPattern = d.bulletPattern;
        if (this.bulletPattern instanceof Array) {
            this.nowBulletPattern = this.bulletPattern[0];
        } else {
            this.nowBulletPattern = this.bulletPattern;
        }

        this.parentScene = app.currentScene;
        this.player = app.player;
        this.setup(param);

        var bulletMLparams = {
            target: this.player,
            createNewBullet: function(runner, attr) {
                tds.Bullet(runner, attr, this.id).addChildTo(this.parentScene);
            }.bind(this)
        };
        this.startDanmaku(tds.bulletPattern[this.nowBulletPattern], bulletMLparams);

        //当り判定設定
        this.boundingType = "rect";

        this.time = 0;
    },

    setup: function(name) {
        var param = {
            strokeStyle:"hsla(0, 100%, 100%, 1.0)",
            fillStyle:  "hsla(0, 100%, 100%, 1.0)",
            lineWidth: 2,
        };
        var sh = tm.display.Shape(32, 32).addChildTo(this).renderRectangle(param);
    },

    update: function() {
        if (this.isDead) return;
        this.algorithm();
        if (this.isOnScreen) {
            if (this.x < -100 || this.x > SC_W+100 || this.y < -100 || this.y > SC_H+100) {
                this.remove();
                this.isCollision = false;
            }
        } else {
            if (0 < this.x && this.x < SC_W && 0 < this.y && this.y < SC_H) this.isOnScreen = true;
        }

        //自機との当り判定チェック
        this.player.radius = 2;
        if (this.isCollision && this.player.isCollision && this.isHitElement(this.player)) {
            this.player.damage();
        }

        //親機が破壊された場合、自分も破壊
        if (this.parentEnemy) {
            if (this.parentEnemy.isDead) this.dead();
        }

        this.beforeX = this.x;
        this.beforeY = this.y;
        this.time++;
    },

    algorithm: function() {
    },

    damage: function(power) {
        if (this.isMuteki || this.isDead) return;
        this.def -= power;
        if (this.def < 1) {
            if (this.boss) {
                this.parentScene.stageClear = true;
                this.deadBoss();
            } else {
                this.dead();
            }

            var pow = Math.clamp(this.player.level, 1, 10);
            app.score += this.data.point*pow;

            var sc = tm.display.OutlineLabel(this.data.point+"x"+pow, 30).addChildTo(this.parentScene).setPosition(this.x, this.y);
            sc.fontFamily = "'UbuntuMono'"; sc.align = "center"; sc.baseline  = "middle"; sc.fontWeight = 300; sc.outlineWidth = 2;
            sc.tweener.to({x: this.x, y: this.y-50, alpha:0}, 1000).call(function(){this.remove()}.bind(sc));

            if (this.data.type == ENEMY_MIDDLE) {
                this.parentScene.eraseBullet(this);
            } else if (this.data.type == ENEMY_LARGE) {
                this.parentScene.eraseBullet();
            }
        }
    },

    dead: function() {
        this.isCollision = false;
        this.isDead = true;
        this.tweener.clear();
        this.stopDanmaku();

        this.on("enterframe", function() {
            this.alpha *= 0.9;
            if (this.alpha < 0.02) this.remove();
        }.bind(this));
        var area = this.width*this.height;
        if (area < 1025) {
            tds.burnParticleSmall().addChildTo(this.parentScene).setPosition(this.x, this.y);
            app.playSE("explodeSmall");
        } else {
            tds.burnParticleLarge().addChildTo(this.parentScene).setPosition(this.x, this.y);
            app.playSE("explodeLarge");
        }
    },

    //ボス破壊パターン
    deadBoss: function() {
        this.isCollision = false;
        this.isDead = true;
        this.tweener.clear();
        this.stopDanmaku();

        this.on("enterframe", function() {
            if (this.time % 30 == 0) {
                tds.burnParticleSmall().addChildTo(this.parentScene).setPosition(this.x, this.y);
                app.playSE("explodeSmall");
            }

            this.alpha *= 0.99;
            if (this.alpha < 0.05) {
                tds.burnParticleLarge().addChildTo(this.parentScene).setPosition(this.x, this.y);
                app.playSE("explodeLarge");
                this.remove();
            }
            this.y += 0.1;
        }.bind(this));
    },

    //指定ターゲットの方向を向く
    lookAt: function(target) {
        target = target || this.player;

        //ターゲットの方向を向く
        var ax = this.x - target.x;
        var ay = this.y - target.y;
        var rad = Math.atan2(ay, ax);
        var deg = ~~(rad * toDeg);
        this.rotation = deg + 90;
    },

    //指定ターゲットの方向に進む
    moveTo: function(target, speed, look) {
        target = target || this.player;
        speed = speed || 5;

        //ターゲットの方向を計算
        var ax = this.x - target.x;
        var ay = this.y - target.y;
        var rad = Math.atan2(ay, ax);
        var deg = ~~(rad * toDeg);

        if (look || look === undefined) this.rotation = deg + 90;

        this.vx = Math.cos(rad+Math.PI)*speed;
        this.vy = Math.sin(rad+Math.PI)*speed;
        this.x += this.vx;
        this.y += this.vy;
    },
});

})();
