/*
 *  StageData.js
 *  2014/08/06
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//ステージ１
tm.define("tds.Stage0", {
    superClass: "tds.StageController",

    init: function(parent, player) {
        this.superInit(parent, player);

        //Stage data
        this.add(  60, "cube1-left");
        this.add(  20, "cube1-right");
        this.add( 120, "cube1-center");

        this.add( 120, "square1-left");
//        this.add( 120, "triangle1-center");
    },
});

})();
