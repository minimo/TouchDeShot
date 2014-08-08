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

// �e��
var RS = function(action) { return $.bullet(action, {pattern: "normal", color:320}); };
var BS = function(action) { return $.bullet(action, {pattern: "normal", color:240}); };

//���ˊԊu
var $interval = function(v) { return $.wait(v) };

// �e��
var $spd = function(v) { v = v===undefined?1:v; return $.speed("$rank*0.1*"+v+"+v" ); };

/** ���@�_���e */
var $fireBS = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, BS) };
var $fireRS = function(spd) { return $.fire($.direction(0), $.speed(spd) || $spd, RS) };

//�Ȃɂ����Ȃ�
tds.bulletPattern["nop"] = new bulletml.Root({top: $.action([$.wait(10000)])});

//���@�_���e
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

//cube�i��ʏ��،^�j
tds.bulletPattern["cube1"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(6),
            $.wait("$rand * 60"),
        ]),
    ]),
});

//cube�i�ˌ��^�j
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
