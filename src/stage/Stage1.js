/*
 *  StageData.js
 *  2014/08/06
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//ステージ１
tm.define("tds.Stage1", {
    superClass: "tds.StageController",

    init: function(parent, player) {
        this.superInit(parent, player);

        //Stage data
        this.add( 10, "cube1-left");
        this.add( 20, "cube1-right");
    },
});

})();
