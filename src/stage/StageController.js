/*
 *  StageController.js
 *  2014/08/06
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//ステージ制御
tm.define("tds.StageController", {
    superClass: "tm.app.Object2D",

    parentScene: null,
    player: null,
    time: 0,

    seq: null,
    index: 0,

    init: function() {
        this.superInit();

        this.seq = [];
        this.on("enterframe", this.tick);
    },

    addEnemyUnit: function(time, name, boss) {
        this.index += time;
        this.seq[this.index] = {
        };
    },

    addEvent: function(time, name, boss) {
    },

    clear: function() {
        this.seq = [];
        this.frame = 0;
    },

    tick: function() {
    },
});

})();
