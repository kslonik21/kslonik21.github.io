let game = new Phaser.Game(1500,1000,Phaser.AUTO,'gameA');
game.state.add('preload',bootState);
game.state.add('level', Main);
game.state.add('next', secLevel);
game.state.start('preload');
