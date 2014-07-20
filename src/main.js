/*
 *  main.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */

//乱数発生器
var mt = new MersenneTwister(0);

//定数
//デバッグ
var DEBUG = false;

//スクリーンサイズ
SC_W = 640;
SC_H = 640;

SC_W_L = -64;
SC_W_R = 704;
SC_H_U = -64;
SC_H_L = 704;

//難易度
DIFF_EASY   = 0;
DIFF_NORMAL = 1;
DIFF_HARD   = 2;
DIFF_HELL   = 3;

//レイヤー区分
LAYER_SYSTEM = 9;           //システム表示
LAYER_FOREGROUND = 8;       //フォアグラウンド
LAYER_EFFECT_UPPER = 7;     //エフェクト上位
LAYER_PLAYER = 6;           //プレイヤー
LAYER_OBJECT_UPPER = 5;     //オブジェクト上位
LAYER_BULLET = 4;           //弾
LAYER_OBJECT = 3;           //オブジェクト中間
LAYER_OBJECT_LOWER = 2;     //オブジェクト下位
LAYER_EFFECT_LOWER = 1;     //エフェクト下位
LAYER_BACKGROUND = 0;       //バックグラウンド

//敵タイプ定数
ENEMY_ITEM = 0;
ENEMY_NORMAL_SKY = 1;
ENEMY_NORMAL_GROUND = 2;
ENEMY_MBOSS_SKY = 3;
ENEMY_MBOSS_GROUND = 4;
ENEMY_SBOSS_SKY = 5;
ENEMY_SBOSS_GROUND = 6;

var toRad = 3.14159/180;    //弧度法toラジアン変換
var toDeg = 180/3.14159;    //ラジアンto弧度法変換
var sec = function(s) { return ~~(60 * s) };               //秒からフレーム数へ変換
var rand = function(min, max) { return mt.nextInt(min, max); };    //乱数発生
//var rand = function(max) {return ~~(Math.random() * max);}

//インスタンス
app = {};

//アプリケーションメイン
tm.main(function() {
    app = tds.TouchShooter("#world");
//    app.enableStats();
    app.run();
});
