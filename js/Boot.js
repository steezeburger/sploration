// Namespace
var Sploration = Sploration || {};

Sploration.Boot = function(){};

Sploration.Boot.prototype = {
  
  // Load assets for Preload
  preload: function() {
    this.load.image('logo', 'assets/images/steezeburger.png');
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  
  // 
  create: function() {
    this.game.stage.backgroundColor = '#333';
    
    // Scaling configuration
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 240;
    this.scale.minHeight = 170;
    this.scale.maxWidth = 2880;
    this.scale.maxHeight = 1920;
    this.scale.pageAlignHorizontally = true;
    this.scale.setScreenSize(true);
    
    // Physics engine
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // On to the next one
    this.game.state.start('Preload');
  }
};