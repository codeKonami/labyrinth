game.Floor = me.Sprite.extend({
    init: function (x,y) {
        var image = me.loader.getImage("floor");
        this._super(me.Sprite, "init", [x,y, { image: image }]);
        //this.chooseFloorImage();
    },
    chooseFloorImage: function () {
        var frame = ~~(Math.random() * 4);
        this.renderable.addAnimation("idle", [frame], 1);
        this.renderable.setCurrentAnimation("idle");
    }
});
