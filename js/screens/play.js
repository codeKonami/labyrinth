game.PlayScreen = me.ScreenObject.extend({
    checkIfLoss: function (y) {
        if (y >= this.player.pos.y) {
            this.reset();
        }
    },
    pass: function(){
      me.level++;
      this.reset();
    },
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));

        me.game.world.addChild(new (me.Renderable.extend ({
          // constructor
          init : function() {
            this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
            this.font = new me.Font("Arial", 15, "white", "center");

          },
          draw : function (renderer) {
            this.font.draw(renderer, "DAY "+(parseInt(me.level)+1), me.game.viewport.width/2, me.game.viewport.height/2);
          }
        })), 20);

        this.man = me.pool.pull("man");
        me.game.world.addChild(this.man, 3);

        this.wallManager = new game.WallManager(me.level);
        this.wallManager.createWalls(me.level);
        me.game.world.addChild(this.wallManager, 1);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        //me.input.bindKey(me.input.KEY.T, "levelup");

    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
        //me.input.unbindKey(me.input.KEY.T);
    }
});
