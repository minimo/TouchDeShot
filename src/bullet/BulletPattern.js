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

//弾種
//小弾（赤）
var RS = function(action) { return $.bullet(action, {type: "RS"}); };
//小弾（青）
var BS = function(action) { return $.bullet(action, {type: "BS"}); };
//大弾（赤）
var RL = function(action) { return $.bullet(action, {type: "RL"}); };
//大弾（青）
var BL = function(action) { return $.bullet(action, {type: "BL"}); };
//楕円弾（赤）(RedEllipsean)
var RE = function(action) { return $.bullet(action, {type: "RE"}); };
//楕円弾（青）(BlueEllipsean)
var BE = function(action) { return $.bullet(action, {type: "BE"}); };


var $interval = function(v) { return $.wait(v) };

//速度
var $spd = function(v) {
    v = v===undefined?1:v;
    return $.speed($rank*0.1*v+v); };

var $fireBS = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, BS) };
var $fireRS = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, RS) };

//no operation
tds.bulletPattern["nop"] = new bulletml.Root({top: $.action([$.wait(10000)])});

//Basic aim bullet
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

/** 自機狙いn-way弾 */
var $nway = function(way, rangeFrom, rangeTo, speed, bullet, offsetX, offsetY, autonomy) {
    return $.action([
        $.fire($.direction(rangeFrom), speed, bullet || RS, offsetX, offsetY, autonomy),
        $.bindVar("way", "Math.max(2, " + way + ")"),
        $.repeat("$way-1", [
            $.fire($.direction("((" + rangeTo + ")-(" + rangeFrom + "))/($way-1)", "sequence"), speed, bullet || RS, offsetX, offsetY, autonomy),
        ]),
    ]);
};
var $nwayVs = function(way, rangeFrom, rangeTo, bullet, offsetX, offsetY, autonomy) {
    return function(spd) {
        return $nway(way, rangeFrom, rangeTo, spd, bullet, offsetX, offsetY, autonomy);
    };
};

/** 絶対n-way弾 */
var $absoluteNway = function(way, rangeFrom, rangeTo, speed, bullet, offsetX, offsetY) {
    return $.action([
        $.fire($.direction(rangeFrom, "absolute"), speed, bullet || RS, offsetX, offsetY),
        $.bindVar("way", "Math.max(2, " + way + ")"),
        $.repeat("$way-1", [
            $.fire($.direction("((" + rangeTo + ")-(" + rangeFrom + "))/($way-1)", "sequence"), speed, bullet || RNS, offsetX, offsetY),
        ]),
    ]);
};
var $absoluteNwayVs = function(way, rangeFrom, rangeTo, bullet, offsetX, offsetY) {
    return function(spd) {
        return $absoluteNway(way, rangeFrom, rangeTo, spd, bullet, offsetX, offsetY);
    };
};

/**
 * ウィップ
 * @param {bulletml.Speed} baseSpeed 初回のスピード
 * @param {number} delta 2回目以降のスピード増分
 * @param {number} count 回数
 * @param {function(bulletml.Speed):bulletml.Action} スピードを受け取りActionを返す関数
 */
var $whip = function(baseSpeed, delta, count, actionFunc) {
    return $.action([
        actionFunc(baseSpeed),
        $.repeat(count + "-1", [
            actionFunc($.speed(delta, "sequence")),
        ]),
    ]);
};

//cube1
tds.bulletPattern["cube1"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});

//cube2
tds.bulletPattern["cube2"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(3, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});

//square
tds.bulletPattern["square1"] = new bulletml.Root({
    top1: $.action([
        $.wait(180),
        $.fire($.direction(  0), $spd(3), RL),
        $.repeat(999, [
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $interval(60),
        ]),
    ]),
    top2: $.action([
        $.wait(180),
        $.fire($.direction(120), $spd(3), RL),
        $.repeat(999, [
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $interval(60),
        ]),
    ]),
    top3: $.action([
        $.wait(180),
        $.fire($.direction(240), $spd(3), RL),
        $.repeat(999, [
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $.fire($.direction( 10, "sequence"), $spd(3), RL),
            $interval(60),
        ]),
    ]),
});

//小型空中砲台
tds.bulletPattern["triangle1-a"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.fire($.direction(180), $spd(4), BE),
        $.repeat(999, [
            $.fire($.direction(37, "sequence"), $spd(3), BE),
            $interval(10),
        ]),
    ]),
});
tds.bulletPattern["triangle1-b"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.fire($.direction(180), $spd(4), BE),
        $.repeat(999, [
            $.fire($.direction(-37, "sequence"), $spd(3), BE),
            $interval(10),
        ]),
    ]),
});

//大型機
tds.bulletPattern["triangle2"] = new bulletml.Root({
    top0: $.action([
        $.wait(60),
        $.repeat(999, [
            $.repeat(3, [
                $nway(3, -30, 30, $spd(4), RL, 0, 0),
                $interval(10),
            ]),
            $interval(120),
            $.repeat(3, [
                $nway(4, -30, 30, $spd(5), BL, 0, 0),
                $interval(10),
            ]),
            $interval(120),
        ]),
    ]),
    top1: $.action([
        $.wait(60),
        $.repeat(999, [
            $.repeat(6, [
                $.fire($.direction(180 ,"absolute"), $spd(3), RL, $.offsetX(-64)),
                $.fire($.direction(180 ,"absolute"), $spd(3), RL, $.offsetX( 64)),
                $interval(10),
            ]),
            $interval(90),
        ]),
    ]),
});

//square1-child
tds.bulletPattern["square1-child"] = new bulletml.Root({
    top: $.action([
        $.wait(300),
        $.repeat(3, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});

//四畳半第一段階
tds.bulletPattern["yojouhan-a-1"] = new bulletml.Root({
    top1: $.action([
        $.wait(180),
        $.fire($.direction(0), $spd(3), RL),
        $.repeat(999, [
            $.repeat(4, [
                $.repeat(12, [
                    $.fire($.direction( 10, "sequence"), $spd(3), RL),
                    $interval(5),
                ]),
                $interval(30),
            ]),
            $interval(120),
        ]),
    ]),
    top2: $.action([
        $.wait(180),
        $.fire($.direction(180), $spd(3), RL),
        $.repeat(999, [
            $.repeat(4, [
                $.repeat(12, [
                    $.fire($.direction( 10, "sequence"), $spd(3), RL),
                    $interval(5),
                ]),
                $interval(30),
            ]),
            $interval(120),
        ]),
    ]),
    top3: $.action([
        $.wait(180),
        $.repeat(999, [
            $whip($spd(4), 0.1, 5, $nwayVs(7, -60, 60, BL)),
            $interval(60*3),
            $whip($spd(4), 0.1, 5, $nwayVs(6, -60, 60, RL)),
            $interval(60*4),
        ]),
    ]),
});

//四畳半第二段階
tds.bulletPattern["yojouhan-a-2"] = new bulletml.Root({
    top1: $.action([
        $.wait(180),
        $.fire($.direction(0), $spd(3), RL),
        $.repeat(999, [
            $.repeat(20, [
                $.fire($.direction( 5, "sequence"), $spd(3), RL),
                $interval(5),
            ]),
            $interval(60),
        ]),
    ]),
    top1: $.action([
        $.wait(180),
        $.fire($.direction(180), $spd(3), RL),
        $.repeat(999, [
            $.repeat(20, [
                $.fire($.direction( 5, "sequence"), $spd(3), RL),
                $interval(5),
            ]),
            $interval(60),
        ]),
    ]),
});

//四畳半子機第一段階
tds.bulletPattern["yojouhan-b-1"] = new bulletml.Root({
    top: $.action([
        $.wait(300),
        $.repeat(3, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});

})();
