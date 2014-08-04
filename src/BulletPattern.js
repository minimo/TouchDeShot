/*
 *  BulletPattern.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//Ž©‹@‘_‚¢’e
var DANMAKU0 = new bulletml.Root({
    top: action([
        repeat(999, [
            fire(speed(2.1), bullet()),
            wait("$rand * 20"),
        ]),
    ]),
});

})();
