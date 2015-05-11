// Namespace
var Sploration = Sploration || {};

Sploration.Preload = function(){};

Sploration.Preload.prototype = {
  
  preload: function() {
    // Preload logo and preload bar
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);
    
    // Load game assets
  	this.load.image('space', 'assets/images/space.png');
  	this.load.image('enemy', 'assets/images/rock.png');
    this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
    this.load.image('playership', 'assets/images/player_green.png', 12, 12);
  	this.load.image('playerParticle', 'assets/images/player-particle.png');
    this.load.audio('collect', 'assets/sound/collect.ogg');
    this.load.audio('explosion', 'assets/sound/explosion.ogg');
  },
  
  // On to next one
  create: function() {
  	this.game.state.start('StartMenu');
  }
};