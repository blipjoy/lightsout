game.Moves = me.HUD_Item.extend({
    "init" : function (x, y, value) {
        this.font = new me.Font("courier new", 50, "#ddd", "center");
        this.font.textBaseline = "middle";
        this.parent(x, y, value);
    },

    "draw" : function (context) {
        this.font.draw(context, this.value, this.pos.x, this.pos.y);
    }
});

game.PlayScreen = me.ScreenObject.extend({
    "onResetEvent" : function () {
        me.game.addHUD(320, 0, 160, C.HEIGHT);
        me.game.HUD.addItem("moves", new game.Moves(80, C.HEIGHT / 2, 0));
        me.game.add(new me.ColorLayer("background", "#333", 1));

        game.lights = [];

        for (var y = 0; y < 5; y++) {
            game.lights[y] = [];
            for (var x = 0; x < 5; x++) {
                var light = new game.Light(x, y);
                game.lights[y][x] = light;
                me.game.add(light, 2);
            }
        }
        me.game.sort();

        this.puzzle = 0;
        this.loadPuzzle(this.puzzle);
    },

    "nextPuzzle" : function () {
        this.puzzle++;
        if (this.puzzle >= this.puzzles.length) {
            me.state.change(
                me.state.GAMEOVER,
                me.game.HUD.getItemValue("moves")
            );
            me.game.disableHUD();
        }
        else {
            this.loadPuzzle(this.puzzle);
        }
    },

    "loadPuzzle" : function (puzzle) {
        var lights = this.puzzles[puzzle];
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
                game.lights[y][x].setState(lights[y][x]);
            }
        }

        me.game.HUD.updateItemValue("moves", Math.floor(puzzle / 3) + 3);
    },

    "puzzles" : [
        /* Three moves */
        [
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ],
            [ 1, 0, 1, 0, 1 ],
            [ 1, 0, 1, 0, 1 ]
        ],
        [
            [ 0, 0, 1, 1, 0 ],
            [ 0, 0, 0, 0, 1 ],
            [ 1, 1, 0, 1, 0 ],
            [ 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ]
        ],
        [
            [ 0, 1, 0, 0, 0 ],
            [ 1, 1, 1, 1, 0 ],
            [ 1, 1, 1, 1, 1 ],
            [ 1, 1, 0, 1, 0 ],
            [ 1, 0, 0, 0, 0 ]
        ],

        /* Four moves */
        [
            [ 1, 1, 0, 1, 1 ],
            [ 1, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 1 ],
            [ 1, 1, 0, 1, 1 ]
        ],
        [
            [ 0, 1, 1, 1, 0 ],
            [ 1, 0, 1, 0, 1 ],
            [ 1, 1, 0, 1, 1 ],
            [ 1, 0, 1, 0, 1 ],
            [ 0, 1, 1, 1, 0 ]
        ],
        [
            [ 0, 0, 1, 0, 0 ],
            [ 0, 0, 1, 0, 0 ],
            [ 1, 1, 0, 1, 1 ],
            [ 0, 0, 1, 0, 0 ],
            [ 0, 0, 1, 0, 0 ]
        ],

        /* Five moves */
        [
            [ 0, 1, 0, 1, 0 ],
            [ 0, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 0 ],
            [ 0, 1, 0, 1, 0 ]
        ],
        [
            [ 1, 1, 1, 0, 0 ],
            [ 0, 1, 1, 1, 0 ],
            [ 0, 1, 0, 0, 1 ],
            [ 0, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0 ]
        ],
        [
            [ 0, 1, 1, 1, 0 ],
            [ 1, 0, 0, 0, 1 ],
            [ 1, 0, 1, 0, 1 ],
            [ 1, 0, 0, 0, 1 ],
            [ 0, 1, 1, 1, 0 ]
        ],

        /* Six moves */
        [
            [ 0, 1, 0, 0, 0 ],
            [ 0, 0, 1, 1, 1 ],
            [ 0, 1, 0, 1, 0 ],
            [ 1, 1, 1, 0, 0 ],
            [ 0, 0, 0, 1, 0 ]
        ],
        [
            [ 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0 ],
            [ 1, 1, 1, 0, 0 ],
            [ 1, 0, 0, 1, 0 ],
            [ 0, 0, 0, 0, 1 ]
        ],
        [
            [ 0, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0 ],
            [ 1, 1, 0, 1, 1 ],
            [ 1, 0, 1, 0, 1 ],
            [ 0, 0, 0, 0, 0 ]
        ]
    ]
});
