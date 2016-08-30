game.Exit = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "exit",
            width: 32,
            height: 32
        }]);

        //this.body.addShape(new me.Rect(0, 0, 32, 32));
        this.body.setVelocity(0, 0);
        //this.body.collisionType = me.collision.types.WALL_OBJECT;
        this.name = 'exit';

    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);

        this.body.update();

        return true;
    }
});
