/*
 *  BulletPattern.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tds.bulletPattern = [];
var $ = bulletml.dsl;

//Ž©‹@‘_‚¢’e
tds.bulletPattern["DANMAKU0"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $.fire($.speed(5), $.bullet()),
            $.wait("$rand * 30"),
        ]),
    ]),
});



})();
