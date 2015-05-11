// Namespace
var Sploration = Sploration || {};

Sploration.Game = function(){};

Sploration.Game.prototype = {
  
  create: function() {
    // World dimensions and background
    this.game.world.setBounds(0, 0, this.game.world.width * 2, this.game.world.height * 2);
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
    
    // Player generation
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
    this.player.scale.setTo(2);
    this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
    this.player.animations.play('play');
    // Follow player with camera
    this.game.camera.follow(this.player);
    
    // Collectibles generation
    this.generateCollectibles();
    
    // Enemy generation
    this.generateEnemies();
    
    // Inital score
    this.playerScore = 0;
    
    // Player physics
    this.game.physics.arcade.enable(this.player);
    this.playerSpeed = 120;
    this.player.body.collideWorldBounds = true;
    
    // Sound
    this.explosionSound = this.game.add.audio('explosion');
    this.collectSound = this.game.add.audio('collect');
    
    // Scoreboard
    this.showScoreboard();
  },
  
  update: function() {
    // Camera follow
    if(this.game.input.activePointer.justPressed()) {
      // Move towards direction of input
      this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    }
    // Collision for player/enemy
    this.game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
    // Overlap for player/collectible
    this.game.physics.arcade.overlap(this.player, this.collectibles, this.collect, null, this);
  },
  
  generateEnemies: function() {
    // Add group
    this.enemies = this.game.add.group();
    
    // Enemy physics
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    
    // Random number of enemies, at random location, with random size and speedS
    var numEnemies = this.game.rnd.integerInRange(40, 60);
    var enemy;
    
    for (var i = 0; i < numEnemies; i++) {
      // Add sprite
      enemy = this.enemies.create(this.game.world.randomX, this.game.world.randomY, 'enemy');
      enemy.scale.setTo(this.game.rnd.integerInRange(5, 20)/10);
      // Add physics
      enemy.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      enemy.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
      enemy.body.immovable = true;
      enemy.body.collideWorldBounds = true;
      }    
  },
  
  hitEnemy: function() {
    // BOOOM HEADSHOT
    this.explosionSound.play();
    
    // Player explosion
    var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
    emitter.makeParticles('playerParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    emitter.start(true, 1000, null, 100);
    this.player.kill();
    
    // GAME OVER
    this.game.time.events.add(800, this.gameOver, this);
  },
  
  generateCollectibles: function() {
    // Add group
    this.collectibles = this.game.add.group();
    
    // Collectibles physics
    this.collectibles.enableBody = true;
    this.collectibles.physicsBodyType = Phaser.Physics.ARCADE;
    
    // Random number of collectibles
    var numCollectibles = this.game.rnd.integerInRange(100,150);
    var collectible;
    
    for (var i = 0; i < numCollectibles; i++) {
      // Add sprites
      collectible = this.collectibles.create(this.game.world.randomX, this.game.world.randomY, 'power');
      collectible.animations.add('fly', [0, 1, 2, 3], 5, true);
      collectible.animations.play('fly');
    }    
  },
  
  collect: function(player, collectible) {
    console.log('player', player);
    console.log('collectible', collectible);
    // Play sound
    this.collectSound.play();
    
    // Update score and scoreboard
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;
    
    // Remove sprite
    collectible.kill();
  },
  
  showScoreboard: function() {
    // Score text
    var text = "0";
    var style = { font: "20px Arial", fill: "#fff", align: "center" };
    this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height - 50, text, style);
    this.scoreLabel.fixedToCamera = true;
  },
  
  gameOver: function() {
    this.game.state.start('StartMenu', true, false, this.playerScore);
  }
  
};