/*
 *  BulletPattern.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tds.bulletPattern = [];
var $ = bulletml.dsl;

$rank = 1;

// 弾種
var RS = function(action) { return $.bullet(action, {pattern: "normal", color:320}); };
var BS = function(action) { return $.bullet(action, {pattern: "normal", color:240}); };

//発射間隔
var $interval = function(v) { return $.wait(v) };

// 弾速
var $spd = function(v) { v = v===undefined?1:v; return $.speed("$rank*0.1*"+v+"+v" ); };

/** 自機狙い弾 */
var $fireBS = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, BS) };
var $fireRS = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, RS) };

//なにもしない
tds.bulletPattern["nop"] = new bulletml.Root({top: $.action([$.wait(10000)])});

//自機狙い弾
tds.bulletPattern["basic-aim1"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});

tds.bulletPattern["basic-aim2"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});

//cube（画面上停滞型）
tds.bulletPattern["cube1"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});

//cube（突撃型）
tds.bulletPattern["cube2"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(3, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});



})();
