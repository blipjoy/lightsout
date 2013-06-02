game.TitleScreen = me.ScreenObject.extend({
    "onResetEvent" : function () {
        me.state.change(me.state.PLAY);
    }
});
