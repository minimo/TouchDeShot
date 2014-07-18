/*
 *  player.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */

tm.define("ts.Player", {
    superClass: "tm.display.Sprite",

    control: true,  //操作可能フラグ
    shotON: true,   //ショットフラグ
    mouseON: false, //マウス操作中フラグ

    speed: 7,       //移動速度
    rollcount: 50,  //機体ロール具合
    type: 0,        //自機タイプ

    power: 0,   //ショット威力 0-18000
    charge: 0,  //パワーチャージ係数
    level: 0,   //ショットレベル
    limit: 0,   //ショットレベル上限

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
