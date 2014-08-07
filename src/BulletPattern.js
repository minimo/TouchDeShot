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

// ’eŽí
var BS = function(action) { return $.bullet(action, {color:200}); };
var RS = function(action) { return $.bullet(action, {color:300}); };

// ’e‘¬
var $spd = function(v) { v = v===undefined?1:v; return $.speed("$rank*0.1*"+v+"+v" ); };

/** Ž©‹@‘_‚¢’e */
var $fire0 = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, BS) };
var $fire1 = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, RS) };

//Ž©‹@‘_‚¢’e
tds.bulletPattern["AIM_1"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $.fire($.speed(10), $.bullet()),
            $.wait("$rand * 60"),
        ]),
    ]),
});

//Ž©‹@‘_‚¢’e
tds.bulletPattern["AIM_2"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fire0(5),
            $.wait("$rand * 60"),
            $fire1(5),
            $.wait("$rand * 60"),
        ]),
    ]),
});



})();
