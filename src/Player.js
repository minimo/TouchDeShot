/*
 *  player.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tds.Player", {
    superClass: "tm.app.Object2D",
    layer: LAYER_OBJECT,

    control: true,  //操作可能フラグ
    shotON: true,   //ショットフラグ
    mouseON: false, //マウス操作中フラグ

    speed: 7,       //移動速度
    type: 0,        //自機タイプ

    power: 0,       //パワーチャージ
    powerMax: 180,  //パワーチャージ最大
    level: 0,       //ショットレベル
    levelMax: 10,   //ショットレベル
    shotLimit: 0,   //ショットレベル上限
    shotInterval: 10,//ショット間隔

    rollcount: 0,
    rollmax: 9,
    pitchcount: 0,
    pitchmax: 6,

    parentScene: null,

    init: function() {
        this.superInit();

        this.setupBody();

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;
        
        this.time = 0;
        return this;
    },
    setupBody: function() {

        //機体
        this.body = tm.display.Shape(64, 64).addChildTo(this);
        this.body.y = -7;
        var c = this.body.canvas;
        c.setColorStyle("hsla(200, 50%, 50%, 1.0)", "hsla(200, 50%, 50%, 0.0)");
        c.setLineStyle(3);
        var path = [
            [32,0], [22,48], [32,64], [42,48],
//            [32,0], [22,48], [32,64], [42,48],
        ];
        c.beginPath();
        c.moveTo(path[0][0], path[0][1]);
        for (var i = 1; i < path.length; i++) {
            c.lineTo(path[i][0], path[i][1]);
        }
        c.lineTo(path[0][0], path[0][1]);
        c.stroke().fill().closePath();

        //翼
        this.wing = tm.display.Shape(96, 32).addChildTo(this);
        this.wing.y = 0;
        var c = this.wing.canvas;
        c.setColorStyle("hsla(200, 50%, 50%, 1.0)", "hsla(200, 50%, 50%, 0.5)");
        c.setLineStyle(3);
        var path = [
            [32,10], [32,32], [0,12], [26,20],    
//            [16,5], [16,16], [0,6], [13,10],    
        ];
        c.beginPath();
        c.moveTo(path[0][0], path[0][1]);
        for (var i = 1; i < path.length; i++) {
            c.lineTo(path[i][0], path[i][1]);
        }
        c.lineTo(path[0][0], path[0][1]);
        c.moveTo(96-path[0][0], path[0][1]);
        for (var i = 1; i < path.length; i++) {
            c.lineTo(96-path[i][0], path[i][1]);
        }
        c.lineTo(96-path[0][0], path[0][1]);

        c.stroke().fill().closePath();

        //ビット
        this.bits = [];
        this.bits.status = 0; //0:close 1:open1 2:open2 3:rollingStanby 4:rollingReady
        this.bits.roll = 0;
        this.bits[0] = tds.PlayerBit().addChildTo(this);
        this.bits[1] = tds.PlayerBit().addChildTo(this);
        this.bits[2] = tds.PlayerBit().addChildTo(this);
        this.bits[3] = tds.PlayerBit().addChildTo(this);

        //コア
        var core = tm.display.Shape(32, 32).addChildTo(this);
        core.canvas.setFillStyle(
            tm.graphics.RadialGradient(16, 16, 0, 16, 16, 16)
                .addColorStopList([
                    {offset:0.0, color: "hsla(200, 60%, 50%, 1.0)"},
                    {offset:0.5, color: "hsla(240, 60%, 50%, 1.0)"},
                    {offset:1.0, color: "hsla(240, 60%, 50%, 0.0)"},
                ]).toStyle()
            ).fillRect(0, 0, 32, 32);
        core.tweener.clear();
        core.tweener.scale(1.0, 100, "easeInOutQuad").scale(0.5, 200, "easeInOutQuad").setLoop(true);

        //パワーゲージ
        tds.PowerGauge().addChildTo(this);
    },

    update: function() {
        //操作系
        if (this.control) {
            var p = app.pointing;
            var dx = p.position.x - p.prevPosition.x;
            var dy = p.position.y - p.prevPosition.y;
            if (p.getPointing()) {
                this.x += Math.clamp(dx*1.3, -40, 40);
                this.y += Math.clamp(dy*1.3, -40, 40);
                this.mouseON = true;
            }else{
                this.mouseON = false;
            }
        }

        //パーツ遅延追従
        if (this.bx > this.x) this.rollcount--;
        if (this.bx < this.x) this.rollcount++;
        if (this.bx == this.x) {
            if (this.rollcount < 0) this.rollcount++; else this.rollcount--;
        }
        if (this.by > this.y) this.pitchcount--;
        if (this.by < this.y) this.pitchcount++;
        if (this.by == this.y) {
            if (this.pitchcount < 0) this.pitchcount++;
            else this.pitchcount--;
        }
        this.rollcount = Math.clamp(this.rollcount, -this.rollmax, this.rollmax);
        this.pitchcount = Math.clamp(this.pitchcount, -this.pitchmax, this.pitchmax);
        this.wing.x = -~~(this.rollcount*0.75);
        this.wing.y = -~~(this.pitchcount*0.75);

        //移動範囲の制限
        this.x = Math.clamp(this.x, 16, SC_W-16);
        this.y = Math.clamp(this.y, 16, SC_H-16);

        //タッチorクリック中
        if (this.mouseON) {
            //ショット
            if (this.shotON && this.time % this.shotInterval == 0) {
                this.enterShot();
            }

            //オーラ処理
            if (this.time % 3 == 0) {
                for (var i = 0; i < this.level+1; i++) {
                    var rad = rand(0, 628) / 100;
                    var dis = rand(10, 150);
                    var x = Math.cos(rad)*dis;
                    var y = Math.sin(rad)*dis;
                    var s = rand(50, 150);
                    var p = tds.Effect.Aura(this, s, 0.99).addChildTo(this.parent);
                    p.setPosition(x+this.x, y+this.y);
                    p.vx = -x / 50;
                    p.vy = -y / 50;
                }
            }

            //パワーチャージ
            this.power++;
            if (this.power > this.powerMax) {
                this.level++;
                this.levelUp();
                this.power = 0;
                if (this.level > this.levelMax) {
                    this.level = this.levelMax;
                    this.power = this.powerMax;
                }
            }

            //初回検出
            if (!this.beforeMouseON) {
                this.closeBit();
            }
            this.radius = 2;
        } else {
            //タッチされてないのでパワーとレベルを初期状態にする
            this.power = 0;
            this.level = 0;
            this.shotInterval = 10;
            this.radius = 48;
            this.rollingBit();
        }

        this.bx = this.x;
        this.by = this.y;
        this.beforeMouseON = this.mouseON;
        this.time++;
    },

    damage: function() {
    },

    levelUp: function() {
        switch (this.level) {
            case 1:
                this.openBit1();
                break;
            case 2:
                this.openBit2();
                this.shotInterval = 8;
                break;
            case 3:
                this.shotInterval = 6;
                break;
            case 4:
                this.shotInterval = 4;
                break;
        }
    },

    enterShot: function() {
        var shotPower = this.level+1;
        tds.ShotBullet(0, shotPower).addChildTo(this.parentScene).setPosition(this.x, this.y-16);
        if (this.level > 0 || this.power > 90) {
            tds.ShotBullet( 5, shotPower).addChildTo(this.parentScene).setPosition(this.x+16, this.y-16);
            tds.ShotBullet(-5, shotPower).addChildTo(this.parentScene).setPosition(this.x-16, this.y-16);
        }
        if (this.level > 0) {
            var x = this.x + this.bits[0].x;
            var y = this.y + this.bits[0].y;
            tds.ShotBullet( 10, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);
            var x = this.x + this.bits[1].x;
            var y = this.y + this.bits[1].y;
            tds.ShotBullet(-10, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);
        }
        if (this.level > 1) {
            var x = this.x + this.bits[2].x;
            var y = this.y + this.bits[2].y;
            tds.ShotBullet( 10, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);
            var x = this.x + this.bits[3].x;
            var y = this.y + this.bits[3].y;
            tds.ShotBullet(-10, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);
        }
    },

    //ビット展開１段階目
    openBit1: function() {
        this.bits.status = 1;
        this.bits[0].tweener.clear().to({ x: 48, y: 16, alpha:1}, 300);
        this.bits[1].tweener.clear().to({ x:-48, y: 16, alpha:1}, 300);
    },

    //ビット展開２段階目
    openBit2: function() {
        this.bits.status = 2;
        this.bits[2].tweener.clear().to({ x: 80, y: 32, alpha:1}, 300);
        this.bits[3].tweener.clear().to({ x:-80, y: 32, alpha:1}, 300);
    },

    closeBit: function() {
        if (this.bits.status == 0) return;
        this.bits.status = 0;
        this.bits[0].tweener.clear().to({ x:0, y: 0, alpha:0}, 300);
        this.bits[1].tweener.clear().to({ x:0, y: 0, alpha:0}, 300);
        this.bits[2].tweener.clear().to({ x:0, y: 0, alpha:0}, 300);
        this.bits[3].tweener.clear().to({ x:0, y: 0, alpha:0}, 300);
    },

    rollingBit: function() {
        if (this.bits.status < 3) {
            this.bits[0].tweener.clear().to({ x:  0, y: -48, alpha:1}, 200).call(function(){this.bits.status = 5}.bind(this));
            this.bits[1].tweener.clear().to({ x: 48, y:   0, alpha:1}, 200);
            this.bits[2].tweener.clear().to({ x:  0, y:  48, alpha:1}, 200);
            this.bits[3].tweener.clear().to({ x:-48, y:   0, alpha:1}, 200);
            this.bits.status = 4;
        }
        if (this.bits.status == 5) {
            this.bits.roll+=10;
            var rad = this.bits.roll*toRad;
            this.bits[0].x = Math.cos(rad)*48;
            this.bits[0].y = Math.sin(rad)*48;
            this.bits[1].x = Math.cos(rad+1.57)*48;
            this.bits[1].y = Math.sin(rad+1.57)*48;
            this.bits[2].x = Math.cos(rad+3.14)*48;
            this.bits[2].y = Math.sin(rad+3.14)*48;
            this.bits[3].x = Math.cos(rad+4.71)*48;
            this.bits[3].y = Math.sin(rad+4.71)*48;
        }
    },

    //プレイヤー投入時演出
    startup: function() {
        this.x = SC_W/2;
        this.y = SC_H+32;
        this.tweener.
            to({x: SC_W/2, y: SC_H-64}, 1000, "easeOutQuint").
            call(function(){
                this.shotON = true;
                this.control = true;
            }.bind(this));
        this.shotON = false;
        this.control = false;
    },

    //ステージ開始時演出
    stageStartup: function() {
        this.x = SC_W/2;
        this.y = SC_H+32;
        this.tweener.
            to({x: SC_W/2, y: SC_H/2+32}, 1000, "easeOutQuint").
            to({x: SC_W/2, y: SC_H-64  }, 1000).
            call(function(){
                this.shotON = true;
                this.control = true;
            }.bind(this));
        this.shotON = false;
        this.control = false;
    },
});

//ビット
tm.define("tds.PlayerBit", {
    superClass: "tm.app.Shape",

    active: false,

    init: function() {
        this.superInit(16, 16);
        this.parentScene = app.currentScene;

        this.alpha = 1;

        var param = {
            strokeStyle:"hsla(200, 50%, 50%, 1.0)",
            fillStyle: "hsla(200, 50%, 50%, 0.3)",
            lineWidth: 3,
        };
        this.renderRectangle(param);

        this.time = 0;
    },
    update: function() {
        this.rotation+=10;
        if (this.active) {
            tds.Effect.Aura(this, 10, 0.99).addChildTo(this.parentScene);
        }
        this.time++;
    },
});

})();