// Namespace
var Sploration = Sploration || {};

Sploration.StartMenu = function(){};

Sploration.StartMenu.prototype = {
  
  create: function() {
    // Scrolling background
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
    this.background.autoScroll(-20, 0);
    
    // Game text
    var text = "Tap to begin";
    var style = { font: "30px Arial", fill: "#FFF", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);
    
    // High score
    text = "High score: " + this.highestScore;
    style = { font: "15px Arial", fill: "#fff", align: "center" };
    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    h.anchor.set(0.5);
  },
  
  update: function() {
    // Start game on click
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};