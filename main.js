// Define namespace
var Sploration = Sploration || {};

// AUTO - defaults to openGL w/ canvas as fallback
Sploration.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

// Register states
Sploration.game.state.add('Boot', Sploration.Boot);
Sploration.game.state.add('Preload', Sploration.Preload);
Sploration.game.state.add('StartMenu', Sploration.StartMenu);
Sploration.game.state.add('Game', Sploration.Game);

// Launch from 'Boot' state
Sploration.game.state.start('Boot');