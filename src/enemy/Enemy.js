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

    //各種フラグ
    isCollision: true,  //当り判定
    isDead: false,      //死亡
    isMuteki: false,    //無敵
    isBoss: false,      //ボス
    isOnscreen: false,  //画面内に入った

    //キャラクタ情報
    name: null,
    def: 0,
    defMax: 0,
    bulletPattern: null,
    nowBulletPattern: null,

    data: null,

    beforeX: 0,
    beforeY: 0,

    init: function(name, x, y) {
        this.superInit();
        this.setPosition(x, y);

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
        this.setup();

        var params = {
            target: this.player,
            createNewBullet: function(runner, attr) {
                tds.Bullet(runner, attr).addChildTo(this.parentScene);
            }.bind(this)
        };
        this.startDanmaku(tds.bulletPattern[this.nowBulletPattern], params);

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
        if (this.x < -200 || this.x > SC_W+200 || this.y < -200 || this.y > SC_H+200) {
            this.remove();
            this.isCollision = false;
        }

        //自機との当り判定チェック
        if (this.isCollision && this.isHitElement(this.player)) {
            this.player.damage();
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
            this.dead();
            app.score += this.data.point;
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
            app.playSE("smallExplode");
        } else {
            tds.burnParticleLarge().addChildTo(this.parentScene).setPosition(this.x, this.y);
            app.playSE("largeExplode");
        }
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
