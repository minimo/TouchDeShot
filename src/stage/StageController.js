/*
 *  StageController.js
 *  2014/08/06
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//ステージ制御
tm.define("tds.StageController", {

    parentScene: null,
    player: null,
    time: 0,

    seq: null,
    index: 0,

    init: function(parent, player) {
        this.parentScene = parent;
        this.player = player;

        this.seq = [];
    },

    addEnemyUnit: function(time, name, boss) {
        this.index += time;
        this.seq[this.index] = {
            type: "enemyunit",
            value: name,
            flag: flag,
        };
    },

    addEvent: function(time, name, boss) {
    },

    get: function(time) {
        var data = this.seq[time];
        if (this.boss || data === undefined) return null;
        return data;
    },

    clear: function() {
        this.seq = [];
        this.index = 0;
    },
});

})();
