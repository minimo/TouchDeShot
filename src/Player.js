/*
 *  player.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */

tm.define("tds.Player", {
    superClass: "tm.display.Sprite",

    control: true,  //操作可能フラグ
    shotON: true,   //ショットフラグ
    mouseON: false, //マウス操作中フラグ

    speed: 7,       //移動速度
    rollcount: 50,  //機体ロール具合
    type: 0,        //自機タイプ

    power: 0,       //パワーチャージ
    powerMax: 180,  //パワーチャージ最大
    level: 0,       //ショットレベル
    levelMax: 10,   //ショットレベル
    limit: 0,       //ショットレベル上限

    init: function() {
        this.superInit("gunship1", 32, 32);
        this.setFrameIndex(4);

        this.time = 0;
        return this;
    },
    update: function() {
        //操作系
        if (this.control) {
            var p = app.pointing;
            var dx = p.position.x - p.prevPosition.x;
            var dy = p.position.y - p.prevPosition.y;
            if (p.getPointing()) {
                this.x += dx;
                this.y += dy;
                this.mouseON = true;
            }else{
                this.mouseON = false;
            }

            if (this.mouseON) {
                //ショット
                if (this.shotON) {
                }
            }
        }

        if (this.bx > this.x) {
            this.rollcount-=3;
            if (this.rollcount < 0) this.rollcount = 0;
        }
        if (this.bx < this.x) {
            this.rollcount+=3;
            if (this.rollcount > 80) this.rollcount = 80;
        }
        if (this.bx == this.x) {
            if (this.rollcount < 50) this.rollcount+=3;
            else this.rollcount-=3;
            if (this.rollcount < 0) this.rollcount = 0;
            if (this.rollcount > 80) this.rollcount = 80;
        }

        //移動範囲の制限
        this.x = Math.clamp(this.x, 16, SC_W-16);
        this.y = Math.clamp(this.y, 16, SC_H-16);

        //オーラ処理
        if (this.mouseON && this.time % 3 == 0) {
            this.alpha = 1;
            for (var i = 0; i < this.level+1; i++) {
                var rad = rand(0, 628) / 100;
                var dis = rand(50, 100);
                var x = Math.cos(rad)*dis;
                var y = Math.sin(rad)*dis;
                var s = rand(30, 100);
                var p = tds.Effect.Aura(this, s, 1, 0.99).addChildTo(this.parent);
                p.setPosition(x+this.x, y+this.y);
                p.vx = -x / 50;
                p.vy = -y / 50;
                this.power++;
                if (this.power > this.powerMax) {
                    this.level++;
                    this.power = 0;
                    if (this.level > this.levelMax) {
                        this.level = this.levelMax;
                        this.power = this.powerMax;
                    }
                }
            }
        }
        if (!this.mouseON) {
            this.power = 0;
            this.level = 0;
            this.alpha = 0.5;
        }
        
        //機体ロール
        if (this.time % 2 == 0) {
            var i = ~~(this.rollcount/10);
            if (i < 0) i = 0;
            if (i > 8) i = 8;
            this.setFrameIndex(i,32,32);
        }

        this.bx = this.x;
        this.by = this.y;
        this.time++;
    },

    //プレイヤー投入時演出
    startup: function() {
        var that = this;
        this.x = SC_W/2;
        this.y = SC_H+32;
        this.tweener.
        to({x:SC_W/2,y:SC_H-64}, 1000, "easeOutQuint").
        call(function(){
            that.shotON = true;
            that.control = true;
        });
        this.shotON = false;
        this.control = false;
    },

    //ステージ開始時演出
    stageStartup: function() {
        var that = this;
        this.x = SC_W/2;
        this.y = SC_H+32;
        this.tweener.
        to({x:SC_W/2,y:SC_H/2+32}, 1000, "easeOutQuint").
        to({x:SC_W/2,y:SC_H-64},1000).
        call(function(){
            that.shotON = true;
            that.control = true;
        });
        this.shotON = false;
        this.control = false;
    },
});

tm.define("tds.Effect.Aura", {
    superClass: "tds.Effect.Particle",

    init: function(target, size, initialAlpha, alphaDecayRate) {
        this.superInit(size, initialAlpha, alphaDecayRate, tds.AuraPaticleImage);
        this.target = target;
        this.vanish = false;
    },

    update: function() {
        this.alpha *= this.alphaDecayRate;
        if (this.alpha < 0.01) {
            this.remove();
        } else if (1.0 < this.alpha) {
            this.alpha = 1.0;
        }
        if (this.target.mouseON && !this.vanish) {
             this.x += this.vx;
             this.y += this.vy;
//              this.x += (this.target.x-this.x)*0.05;
//              this.y += (this.target.y-this.y)*0.05;
        } else {
             this.vanish = true;
             this.x -= this.vx*3;
             this.y -= this.vy*3;
        }
    },
});

tds.AuraPaticleImage = tm.graphics.Canvas()
    .resize(50, 50)
    .setFillStyle(
        tm.graphics.RadialGradient(25, 25, 0, 25, 25, 25)
            .addColorStopList([
                {offset:0, color: "rgba(255,255,255,0.1)"},
                {offset:1, color: "rgba(  0,  0,  0,0.0)"},
            ]).toStyle()
    )
    .fillRect(0, 0, 50, 50)
    .element;
