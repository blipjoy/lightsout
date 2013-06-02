game.GameOverScreen = me.ScreenObject.extend({
    "init" : function () {
        this.parent(true);

        this.font = new me.Font("Courier New", 40, "#ddd", "center");
        this.font.textBaseline = "middle";
    },

    "onResetEvent" : function (score) {
        this.score = score;
        me.input.registerPointerEvent("mousedown", me.game.viewport,
            function (e) {
                me.state.change(me.state.PLAY);
            }
        );
    },

    "onDestroyEvent" : function () {
        me.input.releasePointerEvent("mousedown", me.game.viewport);
    },

    "update" : function () {
        return true;
    },

    "draw" : function (context) {
        me.video.clearSurface(context, "#222");
        this.font.draw(
            context,
            "Final Score: " + this.score,
            C.WIDTH / 2,
            C.HEIGHT / 2
        );
    }
});
