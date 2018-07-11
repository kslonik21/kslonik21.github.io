let bootState = {
	preload: function() {
		game.load.image('preloadBar', 'assets/preload.png');
		// game.load.audio('space','assets/backsound.mp3');
	},
	create: function() {
		menuText = { font: "bold 50px Helvetica", fill: "#4EC57F", align: "center" };
		game.add.sprite(0, 0, 'preloadBar');
		this.add.button(0, 0, 'preloadBar', this.startGame, this);
		game.add.text(550,300, "INVADERS MUST DIE!!!",  menuText);
		game.add.text(430, 550, "TAP TO PLAY PRESS SPACE AND KILL",  menuText);
		game.sound.stopAll();
		// game.state.start('level');
	},
	startGame: function() {
		game.state.start('level');
		}
	}
