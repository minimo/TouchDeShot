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

        this.add( 240, "triangle2-left");

        //Stage data
        this.add( 180, "cube1-left");
        this.add(  20, "cube1-right");
        this.add( 120, "cube1-center");

        this.add( 240, "triangle1-left");
        this.add( 240, "triangle1-right");
        this.add( 240, "triangle1-center");

        this.add( 180, "cube2-left");
        this.add(  20, "cube2-right");
        this.add( 120, "cube2-center");

        this.add( 360, "square1-left");
    },
});

})();
