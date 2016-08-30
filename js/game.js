/*!
 *
 *   melonJS
 *   http://www.melonjs.org
 *
 *   Step by step game creation tutorial
 *
 **/

var game = {

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(160, 160, {wrapper : "screen", scale : 'auto'})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);

        me.level = 0;
    },



    // Run on game resources loaded.
    "loaded" : function () {
        // set the "Play/Ingame" Screen Object
        this.playScreen = new game.PlayScreen();
        me.state.set(me.state.PLAY, this.playScreen);

        // add our player entity in the entity pool
        me.pool.register("wall", game.Wall);
        me.pool.register("exit", game.Exit);
        me.pool.register("man", game.Man);
        me.pool.register("floor", game.Floor);
        me.pool.register("level", game.Level);

        // start the game
        me.state.change(me.state.PLAY);
    }
};
