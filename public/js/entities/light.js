game.Light = me.SpriteObject.extend({
    "init" : function (x, y) {
        this.x = x;
        this.y = y;

        this.regions = [
            game.texture.getRegion("off.png"),
            game.texture.getRegion("on.png"),
            game.texture.getRegion("on2.png")
        ];

        this.parent(x * 64, y * 64, game.texture.getTexture(), 64, 64);
        this.setState(0, 2);

        me.input.registerPointerEvent("mousedown", this, (function (e) {
            // Decrease moves counter
            me.game.HUD.updateItemValue("moves", -1);

            // Toggle all lights
            this.toggle();
            if (this.x > 0) game.lights[this.y][this.x - 1].toggle();
            if (this.x < 4) game.lights[this.y][this.x + 1].toggle();
            if (this.y > 0) game.lights[this.y - 1][this.x].toggle();
            if (this.y < 4) game.lights[this.y + 1][this.x].toggle();

            // Check win state
            if (game.lights.every(function (ly) {
                return ly.every(function (lx) {
                    return !lx.state;
                });
            })) game.playscreen.nextPuzzle();
        }).bind(this));
    },

    "destroy" : function () {
        me.input.releasePointerEvent("mousedown", this);
    },

    "setState" : function (state, states) {
        this.state = state;
        this.states = states;
        this.setRegion();
    },

    "toggle" : function () {
        this.state = (this.state + 1) % this.states;
        this.setRegion();
    },

    "setRegion" : function () {
        var region = this.regions[this.state];
        this.set(
            new me.Vector2d(
                this.x * 64 + (64 - region.width) / 2,
                this.y * 64 + (64 - region.height) / 2
            ),
            region.width,
            region.height
        );
        this.offset.setV(region.offset);
        this._sourceAngle = region.angle;
    },

    "update" : function () {
        return true;
    }
});
