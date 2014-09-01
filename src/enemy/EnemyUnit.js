/*
 *  EnemyData.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//敵小隊単位定義
tds.enemyUnit = {

"cube1-left": [
    { "name": "cube1", "x":SC_W*0.1, "y":-150 },
    { "name": "cube1", "x":SC_W*0.2, "y":-120 },
    { "name": "cube1", "x":SC_W*0.3, "y":-130 },
    { "name": "cube1", "x":SC_W*0.4, "y":-120 },
],

"cube1-right": [
    { "name": "cube1", "x":SC_W*0.6, "y":-110 },
    { "name": "cube1", "x":SC_W*0.7, "y":-120 },
    { "name": "cube1", "x":SC_W*0.8, "y":-100 },
    { "name": "cube1", "x":SC_W*0.9, "y":-150 },
],

"cube1-center": [
    { "name": "cube1", "x":SC_W*0.25, "y":-160 },
    { "name": "cube1", "x":SC_W*0.35, "y":-120 },
    { "name": "cube1", "x":SC_W*0.40, "y":-100 },
    { "name": "cube1", "x":SC_W*0.50, "y":-110 },
    { "name": "cube1", "x":SC_W*0.70, "y":-130 },
    { "name": "cube1", "x":SC_W*0.85, "y":-120 },
],

"cube2-left": [
    { "name": "cube2", "x":SC_W*0.1, "y":-100 },
    { "name": "cube2", "x":SC_W*0.2, "y":-120 },
    { "name": "cube2", "x":SC_W*0.3, "y":-130 },
    { "name": "cube2", "x":SC_W*0.4, "y":-120 },
],

"cube2-right": [
    { "name": "cube2", "x":SC_W*0.6, "y":-100 },
    { "name": "cube2", "x":SC_W*0.7, "y":-120 },
    { "name": "cube2", "x":SC_W*0.8, "y":-130 },
    { "name": "cube2", "x":SC_W*0.9, "y":-120 },
],

"square1-left": [
    { "name": "square1", "x":SC_W*0.2, "y":-100 },
],

"square1-right": [
    { "name": "square1", "x":SC_W*0.8, "y":-100 },
],

"triangle1-left": [
    { "name": "triangle1", "x":SC_W*0.1, "y":-SC_H*0.10, "param":"a" },
    { "name": "triangle1", "x":SC_W*0.2, "y":-SC_H*0.15, "param":"a" },
    { "name": "triangle1", "x":SC_W*0.3, "y":-SC_H*0.20, "param":"a" },
    { "name": "triangle1", "x":SC_W*0.4, "y":-SC_H*0.25, "param":"a" },
],

"triangle1-right": [
    { "name": "triangle1", "x":SC_W*0.9, "y":-SC_H*0.10, "param":"b" },
    { "name": "triangle1", "x":SC_W*0.8, "y":-SC_H*0.15, "param":"b" },
    { "name": "triangle1", "x":SC_W*0.7, "y":-SC_H*0.20, "param":"b" },
    { "name": "triangle1", "x":SC_W*0.6, "y":-SC_H*0.25, "param":"b" },
],

"triangle1-center": [
    { "name": "triangle1", "x":SC_W*0.3, "y":-SC_H*0.1, "param":"a" },
    { "name": "triangle1", "x":SC_W*0.4, "y":-SC_H*0.2, "param":"a" },
    { "name": "triangle1", "x":SC_W*0.6, "y":-SC_H*0.2, "param":"b" },
    { "name": "triangle1", "x":SC_W*0.7, "y":-SC_H*0.1, "param":"b" },
],

"triangle2-left": [
    { "name": "triangle2", "x":SC_W*0.2, "y":SC_H*-0.3 },
],

"triangle2-right": [
    { "name": "triangle2", "x":SC_W*0.8, "y":SC_H*-0.3 },
],

"mboss1": [
    { "name": "", "x":SC_W*0.5, "y":-100 },
],

//ステージ１ボス「四畳半」
"boss1": [
    { "name": "yojouhan-a", "x":SC_W*0.5, "y":-SC_H*0.2 },
],

}

})();
