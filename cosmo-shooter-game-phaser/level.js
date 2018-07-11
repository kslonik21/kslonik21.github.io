let ship;
let spaceground;
let enemies;
let enemyShoot;
let fireTime=0;
let fireTimer=0;
let fireClick;
let shipShoot;
let cursor;
let liveEnemy=[];
let lives;
let crashEffect;
let score = 0;
let scoreText;
let scoreString='';
let textGameOver;
let blastSound;
let explosionSound;
    let Main = {
            preload: function() {
                game.load.image('spaceground', 'assets/space.png');
                game.load.image('spaceship', 'assets/ship.png');
                game.load.image('lifes', 'assets/star.png');
                game.load.image('fireeffect', 'assets/fire.png');
                game.load.spritesheet('shipEnemy', 'assets/alien.png', 40, 40);
                game.load.spritesheet('crash', 'assets/bambam.png', 160, 160);
                game.load.image('enemyShoot', 'assets/lasers.png');
                game.load.audio('space','assets/backsound.mp3');
                game.load.audio('blast', 'assets/blaster.wav');
                game.load.audio('crashSound', 'assets/explosion.wav');
            },

            create: function() {
                game.physics.startSystem(Phaser.Physics.ARCADE);
                spaceground = game.add.tileSprite(0, 0, 1500, 1000, 'spaceground');
                ship = game.add.sprite(700,700, 'spaceship');
                ship.anchor.setTo(0.5, 0.5);
                game.physics.enable(ship, Phaser.Physics.ARCADE);
                blastSound = game.add.audio('blast')
                enemies = game.add.group();
                enemies.enableBody = true;
                enemies.physicsBodyType = Phaser.Physics.ARCADE;
                this.createEnemies();

                shipShoot = game.add.group();
                shipShoot.enableBody = true;
                shipShoot.physicsBodyType = Phaser.Physics.ARCADE;
                shipShoot.createMultiple(200, 'fireeffect');
                shipShoot.setAll('anchor.x', 0.5);
                shipShoot.setAll('anchor.y', 1);
                shipShoot.setAll('outOfBoundsKill', true);
                shipShoot.setAll('checkWorldBounds', true);

                enemyShoots = game.add.group();
                enemyShoots.enableBody = true;
                enemyShoots.physicsBodyType = Phaser.Physics.ARCADE;
                enemyShoots.createMultiple(200, 'enemyShoot');
                enemyShoots.setAll('anchor.x', 0.5);
                enemyShoots.setAll('anchor.y', 1);
                lives = game.add.group();

                textGameOver = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
                textGameOver.anchor.setTo(0.5, 0.5);
                textGameOver.visible = false;

                game.music = game.add.audio('space');
                game.music.play();
                explosionSound = game.add.audio('crashSound');

                for (let i = 0; i < 3; i++)
                {
                    let shipLives = lives.create(game.world.width - 100 + (30 * i), 60, 'lifes');
                }
                crashEffect = game.add.group();
                crashEffect.createMultiple(30, 'crash');
                crashEffect.forEach(this.setEnemies);


                cursor = game.input.keyboard.createCursorKeys();
                fireClick = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });
            },
            createEnemies: function() {
                for (let y = 0; y < 4; y++)
                {
                   for (let x = 0; x < 5; x++)
                   {
                       let enemy = enemies.create(x * 170, y * 80, 'shipEnemy');
                       enemy.anchor.setTo(0.5, 0.5);
                       enemy.body.moves = false;
                   }
                }
                enemies.x = 100;
                enemies.y = 50;
                let tween = game.add.tween(enemies).to( { x: 400 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
                tween.onLoop.add(this.descend);
            },
            setEnemies: function(shipEnemy) {
               shipEnemy.anchor.x = 0.5;
               shipEnemy.anchor.y = 0.5;
               shipEnemy.animations.add('crash');
            },
            descend: function() {
                enemies.y+=10;
            },
            update: function() {
                spaceground.tilePosition.y += 2;
                ship.angle += 1;
                if(ship.alive)
                {
                    ship.body.velocity.setTo(0,0);
                    if (cursor.left.isDown)
                    {
                        ship.body.velocity.x = -200;
                    }
                    else if (cursor.right.isDown)
                    {
                        ship.body.velocity.x = 200;
                    }
                    if (fireClick.isDown)
                    {
                        this.fireOnEnemies();
                    }
                    if (game.time.now > fireTimer)
                    {
                        this.enemyAttacked();
                    }
                    game.physics.arcade.overlap(shipShoot, enemies, this.collisionHandler, null, this);
                    game.physics.arcade.overlap(enemyShoots  , ship, this.enemyHits, null, this);
                }
            },
            collisionHandler: function(fireeffect, enemy) {
                fireeffect.kill();
                explosionSound.play();
                enemy.kill();
                score +=20;
                scoreText.text = scoreString + score;
                let explosion = crashEffect.getFirstExists(false);
                explosion.reset(enemy.body.x, enemy.body.y);
                explosion.play('crash', 30, false, true);

                if (enemies.countLiving() == 0)
                {
                    enemyShoots.callAll('kill', this);
                    textGameOver.text = "TAP TO CONTINUE";
                    textGameOver.visible = true;
                    game.input.onTap.addOnce(this.restartGame);
                }
            },
            enemyHits: function(ship,fireeffect) {
                fireeffect.kill();
                live = lives.getFirstAlive();
                if (live)
                {
                    live.kill();
                    explosionSound.play();
                }
                let explosion = crashEffect.getFirstExists(false);
                explosion.reset(ship.body.x, ship.body.y);
                explosion.play('crash', 30, false, true);
                if (lives.countLiving() < 1)
                {
                    ship.kill();
                    enemyShoots.callAll('kill');
                    score=0;
                    game.state.start('preload');
                }
            },
            enemyAttacked: function() {
                enemyShoot = enemyShoots.getFirstExists(false);
                liveEnemy.length = 0;
                enemies.forEachAlive(function(enemy){
                    liveEnemy.push(enemy);
                   });
                if(enemyShoot && liveEnemy.length>0)
                {
                    let random=game.rnd.integerInRange(0,liveEnemy.length-1);
                    let shooter=liveEnemy[random];
                    enemyShoot.reset(shooter.body.x, shooter.body.y);
                    game.physics.arcade.moveToObject(enemyShoot, ship, 120);
                    fireTimer = game.time.now + 2000;
                }
            },
            fireOnEnemies: function() {
                if (game.time.now > fireTime)
                {
                    fireeffect = shipShoot.getFirstExists(false);
                    if (fireeffect)
                    {
                        fireeffect.reset(ship.x, ship.y + 8);
                        fireeffect.body.velocity.y = -400;
                        fireTime = game.time.now + 200;
                        blastSound.play();
                    }
                }
            },
            resetBullet: function(fireeffect) {
                fireeffect.kill();
            },
            restartGame: function() {
                game.state.start('next');
                game.music.destroy();
                }
            };
