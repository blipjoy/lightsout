game.Moves = me.HUD_Item.extend({
    "init" : function (x, y, value) {
        this.font = new me.Font("Courier New", 50, "#ddd", "center");
        this.font.textBaseline = "middle";
        this.parent(x, y, value);
    },

    "draw" : function (context) {
        this.font.draw(context, this.value, this.pos.x, this.pos.y);
    }
});

game.Restart = me.Renderable.extend({
    "init" : function (x, y) {
        this.parent(new me.Vector2d(x, y), 128, 64);

        this.font = new me.Font("Courier New", 25, "#ddd", "center");
        this.font.textBaseline = "middle";

        me.input.registerPointerEvent("mousedown", this, function (e) {
            game.playscreen.loadPuzzle(game.playscreen.puzzle, true);
        });
    },

    "destroy" : function () {
        me.input.releasePointerEvent("mousedown", this);
    },

    "update" : function () {
        return true;
    },

    "draw" : function (context) {
        context.fillStyle = "#444";
        context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.font.draw(
            context,
            "Restart",
            this.pos.x + this.width / 2,
            this.pos.y + this.height / 2
        );
    }
});

game.PlayScreen = me.ScreenObject.extend({
    "onResetEvent" : function () {
        me.game.addHUD(320, 0, 160, C.HEIGHT);
        me.game.HUD.addItem("moves", new game.Moves(80, C.HEIGHT / 2, 0));
        me.game.add(new me.ColorLayer("background", "#333", 1));
        me.game.add(new game.Restart(320 + 16, 320 - 96), 2);

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

    "onDestroyEvent" : function () {
        me.game.disableHUD();
    },

    "nextPuzzle" : function () {
        this.puzzle++;
        if (this.puzzle >= this.puzzles.length) {
            me.state.change(
                me.state.GAMEOVER,
                me.game.HUD.getItemValue("moves")
            );
        }
        else {
            this.loadPuzzle(this.puzzle);
        }
    },

    "loadPuzzle" : function (puzzle, restart) {
        var lights = this.puzzles[puzzle];
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
                game.lights[y][x].setState(
                    lights[y][x],
                    Math.floor(puzzle / 18) + 2
                );
            }
        }

        if (!restart)
            me.game.HUD.updateItemValue(
                "moves",
                (Math.floor(puzzle / 3) % 6) + 3
            );
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
        ],

        /* Seven moves */
        [
            [ 0, 0, 0, 0, 0 ],
            [ 1, 1, 0, 0, 0 ],
            [ 0, 1, 1, 1, 0 ],
            [ 0, 0, 0, 1, 1 ],
            [ 0, 0, 1, 1, 1 ]
        ],
        [
            [ 0, 0, 1, 1, 0 ],
            [ 0, 0, 0, 1, 1 ],
            [ 1, 0, 0, 1, 1 ],
            [ 1, 1, 1, 1, 1 ],
            [ 0, 1, 1, 1, 0 ]
        ],
        [
            [ 0, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 1, 0, 0, 1 ],
            [ 1, 0, 0, 0, 0 ],
            [ 1, 0, 1, 0, 0 ]
        ],

        /* Eight moves */
        [
            [ 1, 0, 0, 0, 0 ],
            [ 1, 1, 0, 0, 0 ],
            [ 1, 1, 0, 1, 0 ],
            [ 1, 0, 1, 0, 1 ],
            [ 1, 1, 0, 0, 0 ]
        ],
        [
            [ 0, 0, 1, 1, 1 ],
            [ 0, 1, 0, 0, 1 ],
            [ 1, 0, 1, 0, 0 ],
            [ 0, 1, 0, 0, 1 ],
            [ 0, 0, 0, 1, 0 ]
        ],
        [
            [ 1, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0 ],
            [ 1, 1, 0, 1, 1 ],
            [ 0, 1, 0, 1, 0 ],
            [ 1, 1, 1, 1, 0 ]
        ],

        /* Three moves, tri-state */
        [
            [ 0, 1, 0, 0, 0 ],
            [ 1, 1, 1, 0, 0 ],
            [ 0, 1, 0, 2, 0 ],
            [ 0, 0, 2, 2, 2 ],
            [ 0, 0, 0, 2, 0 ]
        ],
        [
            [ 0, 0, 0, 0, 0 ],
            [ 0, 2, 1, 0, 0 ],
            [ 2, 0, 0, 1, 0 ],
            [ 0, 2, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0 ]
        ],
        [
            [ 0, 0, 0, 0, 0 ],
            [ 0, 2, 2, 0, 0 ],
            [ 2, 1, 1, 1, 0 ],
            [ 0, 2, 1, 2, 2 ],
            [ 0, 0, 0, 2, 0 ]
        ],

        /* Four moves, tri-state */
        [
            [ 1, 1, 2, 1, 0 ],
            [ 1, 2, 1, 2, 2 ],
            [ 2, 0, 0, 2, 0 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ]
        ],
        [
            [ 0, 2, 0, 0, 0 ],
            [ 2, 2, 2, 0, 0 ],
            [ 0, 1, 0, 0, 0 ],
            [ 0, 2, 2, 0, 0 ],
            [ 1, 0, 0, 0, 0 ]
        ],
        [
            [ 0, 0, 2, 0, 0 ],
            [ 0, 1, 2, 1, 0 ],
            [ 2, 2, 0, 2, 2 ],
            [ 0, 2, 2, 2, 0 ],
            [ 0, 2, 2, 2, 0 ]
        ]
    ]
});
