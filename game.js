window.onload = function () {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload,  
                                                           create: create, 
                                                           update: update});

    function preload () {

        game.load.image('logo', '/sprites/Filthy.png');
        game.load.spritesheet('hero', 'sprites/hero2.png', 16, 32);
        game.load.audio('intro', 'music/intro.mp3');
        game.load.audio('mellow', 'music/mellow.mp3');
        game.load.audio('waves', 'music/waves.mp3')
    }

    var intro;
    var mellow;
    var waves;
    var introPlaying = true;
    var cursors;
    var jumpButton;
    var hero;

    function create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#4488AA";
        game.time.desiredFps = 30;

        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        game.physics.arcade.gravity.y = 250;
        hero = game.add.sprite(400, 300, 'hero');
        game.physics.enable(hero, Phaser.Physics.ARCADE);

        hero.body.collideWorldBounds = true;
        //hero.body.velocity.setTo(200, 200);
        hero.animations.add('test', [0, 1]);
        hero.animations.play('test', 6, true);

        //hero.body.gravity.set(800);
        hero.body.bounce.y = 0.2;

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        //Music:
        intro = game.add.audio('intro');
        mellow = game.add.audio('mellow');
        waves = game.add.audio('waves');
        intro.play();
        game.input.onDown.add(nextSong, this);
        logo.anchor.setTo(0.5, 0.5);
    }
    
    function update() {
        hero.body.velocity.x = 0;

        if (cursors.left.isDown){
            hero.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            hero.body.velocity.x = 150;
        } else {
            //Stand still
        }
        if (jumpButton.isDown && hero.body.onFloor()) {
            hero.body.velocity.y = -350;
        }
    }
  

    function nextSong() {
        if (introPlaying) {
            intro.stop();
            waves.play();
            introPlaying = false;
        } else {
            waves.stop();
            intro.play();
            introPlaying = true;
        }
    }
};

