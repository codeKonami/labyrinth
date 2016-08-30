game.Man = me.Entity.extend({
    init: function () {
        this._super(me.Entity, "init", [32, 32, {
            image: "man",
            width: 32,
            height: 32
        }]);

        this.velx = 450;
        this.vely = 450;
        this.maxX = me.game.viewport.width - this.width;
        this.maxY = me.game.viewport.height - this.height;
        //this.body.addShape(new me.Rect(0, 0, 32, 32));
        this.body.setVelocity(0, 0);
        //this.body.collisionType = me.collision.types.MAN_OBJECT;
        this.name = 'man';
        this.cursorX = 1;
        this.cursorY = 1;
    },
    onCollision: function (res, other) {

        if (other.name === "wall") {
          //Hit a wall
          return true;
        } else if(other.name === "exit"){
          //We pass to the next level
          game.playScreen.pass();
          return false;
        }
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);

        this.body.update();
        me.collision.check(this);

        if (me.input.isKeyPressed("left")) {
          left = this.velx * time / 1000;
          this.pos.x -= left;

          this.body.update();
          me.collision.check(this);
        }

        if (me.input.isKeyPressed("right")) {
          right = this.velx * time / 1000;
          this.pos.x += right
          this.body.update();

          me.collision.check(this);

        }

        if (me.input.isKeyPressed("up")) {
          up = this.vely * time / 1000;
          this.pos.y -= up;
          this.body.update();
          me.collision.check(this);
        }

        if (me.input.isKeyPressed("down")) {
          down = this.vely * time / 1000;
          this.pos.y += down;
          this.body.update();
          me.collision.check(this);

        }



        if(this.pos.x > (160*this.cursorX) - (32/2) && me.game.viewport.screenX == (this.cursorX-1)*160){
          me.game.viewport.move(160, 0);
          this.pos.x += 8;
          this.cursorX++;
        }

        if(this.pos.x < (160*(this.cursorX-1)) - (32/2) && me.game.viewport.screenX == (this.cursorX-1)*160){
          me.game.viewport.move(-160, 0);
          this.pos.x -= 8;
          this.cursorX--;
        }


        if(this.pos.y > (160*this.cursorY) - (32/2) && me.game.viewport.screenY == (this.cursorY-1)*160){
          me.game.viewport.move(0, 160);
          this.pos.y += 8;
          this.cursorY++;
        }


        if(this.pos.y < (160*(this.cursorY-1)) - (32/2) && me.game.viewport.screenY == (this.cursorY-1)*160){
          me.game.viewport.move(0, -160);
          this.pos.y -= 8;
          this.cursorY--;
        }


        if (me.input.isKeyPressed("levelup")) {
          game.playScreen.pass();
        }

        /*
        if (me.input.isKeyPressed("shoot")) {
            me.game.world.addChild(me.pool.pull("laser", this.pos.x + (this.width / 2 - game.Laser.width / 2), this.pos.y - game.Laser.height))
        }
        */

        //this.pos.x = this.pos.x.clamp(0, this.maxX);
        //this.pos.y = this.pos.y.clamp(0, this.maxY);

        return true;
    }
});
