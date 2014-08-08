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

// íeéÌ
var RS = function(action) { return $.bullet(action, {pattern: "normal", color:320}); };
var BS = function(action) { return $.bullet(action, {pattern: "normal", color:240}); };

//î≠éÀä‘äu
var $interval = function(v) { return $.wait(v) };

// íeë¨
var $spd = function(v) { v = v===undefined?1:v; return $.speed("$rank*0.1*"+v+"+v" ); };

/** é©ã@ë_Ç¢íe */
var $fireBS = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, BS) };
var $fireRS = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, RS) };

//Ç»Ç…Ç‡ÇµÇ»Ç¢
tds.bulletPattern["nop"] = new bulletml.Root({top: $.action([$.wait(10000)])});

//é©ã@ë_Ç¢íe
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

//cubeÅiâÊñ è„í‚ëÿå^Åj
tds.bulletPattern["cube1"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});

//cubeÅiìÀåÇå^Åj
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
