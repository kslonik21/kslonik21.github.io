let enemiesNextLevel;
let enemyShootNextLevel;
let fireTimeNextLevel=0;
let fireTimerNextLevel=0;
let fireClickNextLevel;
let shipShootNextLevel;
let cursorNextLevel;
let liveEnemyNextLevel=[];
let livesNextLevel;
let crashEffectNextLevel;
let scoreNextLevel = 0;
let scoreTextNextLevel;
let scoreStringNextLevel='';
let textGameOverTwoNextLevel;
let blastSoundNextLevel;
let explosionSoundNextLevel;

let secLevel = {
        preload: function() {
            game.load.image('spaceground', 'assets/cosmos.png');
            game.load.image('spaceship', 'assets/ship.png');
            game.load.image('lifes', 'assets/star.png');
            game.load.image('fireeffect', 'assets/fire1.png');
            game.load.spritesheet('shipEnemy', 'assets/enemy2.png', 40, 40);
            game.load.spritesheet('crash', 'assets/bambam.png', 160, 160);
            game.load.image('enemyShootNextLevel', 'assets/shoot.png');
            game.load.audio('spaceTwo','assets/space2.mp3');
            game.load.audio('blast', 'assets/blaster.wav');
            game.load.audio('crashSound', 'assets/explosion.wav');
        },
        create: function() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            spaceground = game.add.tileSprite(0, 0, 1500, 1000, 'spaceground');
            ship = game.add.sprite(700,700, 'spaceship');
            ship.anchor.setTo(0.5, 0.5);
            game.physics.enable(ship, Phaser.Physics.ARCADE);

            enemiesNextLevel = game.add.group();
            enemiesNextLevel.enableBody = true;
            enemiesNextLevel.physicsBodyType = Phaser.Physics.ARCADE;
            this.createEnemies();

            shipShootNextLevel = game.add.group();
            shipShootNextLevel.enableBody = true;
            shipShootNextLevel.physicsBodyType = Phaser.Physics.ARCADE;
            shipShootNextLevel.createMultiple(30, 'fireeffect');
            shipShootNextLevel.setAll('anchor.x', 0.5);
            shipShootNextLevel.setAll('anchor.y', 1);
            shipShootNextLevel.setAll('outOfBoundsKill', true);
            shipShootNextLevel.setAll('checkWorldBounds', true);

            enemyShoots = game.add.group();
            enemyShoots.enableBody = true;
            enemyShoots.physicsBodyType = Phaser.Physics.ARCADE;
            enemyShoots.createMultiple(20, 'enemyShootNextLevel');
            enemyShoots.setAll('anchor.x', 0.5);
            enemyShoots.setAll('anchor.y', 1);
            enemyShoots.setAll('outOfBoundsKill', true);
            enemyShoots.setAll('checkWorldBounds', true);
            livesNextLevel = game.add.group();
            textGameOverTwoNextLevel = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
            textGameOverTwoNextLevel.anchor.setTo(0.5, 0.5);
            textGameOverTwoNextLevel.visible = false;

            game.music = game.add.audio('spaceTwo');
            game.music.play();

            blastSoundNextLevel = game.add.audio('blast');
            explosionSoundNextLevel = game.add.audio('crashSound');

            for (let i = 0; i < 3; i++)
            {
                let shipLives = livesNextLevel.create(game.world.width - 100 + (30 * i), 60, 'lifes');
            }
            crashEffectNextLevel = game.add.group();
            crashEffectNextLevel.createMultiple(30, 'crash');
            crashEffectNextLevel.forEach(this.setEnemies);

            cursorNextLevel = game.input.keyboard.createCursorKeys();
            fireClickNextLevel = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            scoreTextNextLevel = game.add.text(10, 10, scoreStringNextLevel + scoreNextLevel, { font: '34px Arial', fill: '#fff' });
        },
        createEnemies: function() {
            for (let y = 0; y < 4; y++)
            {
                for (let x = 0; x < 10; x++)
                {
                   let enemy = enemiesNextLevel.create(x * 100, y * 120, 'shipEnemy');
                   enemy.anchor.setTo(0.5, 0.5);
                   enemy.body.moves = false;
                }
            }
            enemiesNextLevel.x = 100;
            enemiesNextLevel.y = 50;
            let tween = game.add.tween(enemiesNextLevel).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            tween.onLoop.add(this.descend);
        },
        setEnemies: function(shipEnemy) {
            shipEnemy.anchor.x = 0.5;
            shipEnemy.anchor.y = 0.5;
            shipEnemy.animations.add('crash');
        },
        descend: function() {
            enemiesNextLevel.y+=10;
        },
        update: function() {
            spaceground.tilePosition.y += 2;
            ship.angle += 1;
            if (ship.alive)
            {
                ship.body.velocity.setTo(0,0);
                if (cursor.left.isDown) {
                    ship.body.velocity.x = -200;
                }
                else if (cursor.right.isDown)
                {
                    ship.body.velocity.x = 200;
                }
                if (fireClickNextLevel.isDown)
                {
                    this.fireOnEnemies();
                }
                if (game.time.now > fireTimerNextLevel)
                {
                    this.enemyAttacked();
                }
            game.physics.arcade.overlap(shipShootNextLevel,enemiesNextLevel, this.collisionHandler, null, this);
            game.physics.arcade.overlap(enemyShoots , ship, this.enemyHits, null, this);
            }
        },
        collisionHandler: function(fireeffect, enemy) {
            fireeffect.kill();
            explosionSoundNextLevel.play();
            enemy.kill();
            scoreNextLevel +=20;
            scoreTextNextLevel.text = scoreStringNextLevel + scoreNextLevel;
            let explosion = crashEffectNextLevel.getFirstExists(false);
            explosion.reset(enemy.body.x, enemy.body.y);
            explosion.play('crash', 30, false, true);
            if (enemiesNextLevel.countLiving() == 0)
            {
                enemyShoots.callAll('kill', this);
                game.input.onTap.addOnce(this.restartGame);
                scoreNextLevel=0;
                textGameOverTwoNextLevel.text = "TAP TO START AGAIN";
                textGameOverTwoNextLevel.visible = true;
            }
        },
        enemyHits: function(ship,fireeffect) {
            fireeffect.kill();
            live = livesNextLevel.getFirstAlive();
            if (live)
            {
                live.kill();
                explosionSoundNextLevel.play();

            }
            let explosion = crashEffectNextLevel.getFirstExists(false);
            explosion.reset(ship.body.x, ship.body.y);
            explosion.play('crash', 30, false, true);
            if (lives.countLiving() < 1)
            {
                game.state.start('preload');
            }
        },
        enemyAttacked: function() {
            enemyShootNextLevel = enemyShoots.getFirstExists(false);
            liveEnemyNextLevel.length=0;
            enemiesNextLevel.forEachAlive(function(enemy) {
                liveEnemyNextLevel.push(enemy);
               });
            if (enemyShootNextLevel && liveEnemyNextLevel.length > 0)
            {
                let random=game.rnd.integerInRange(0,liveEnemyNextLevel.length-1);
                let shooter=liveEnemyNextLevel[random];
                enemyShootNextLevel.reset(shooter.body.x, shooter.body.y);
                game.physics.arcade.moveToObject(enemyShootNextLevel, ship, 120);
                fireTimerNextLevel = game.time.now + 2000;
            }
        },
        fireOnEnemies: function() {
            if (game.time.now > fireTimeNextLevel)
            {
                fireeffect = shipShootNextLevel.getFirstExists(false);
                if (fireeffect)
                {
                    fireeffect.reset(ship.x, ship.y + 8);
                    fireeffect.body.velocity.y = -400;
                    fireTimeNextLevel = game.time.now + 200;
                    blastSoundNextLevel.play();
                }
            }
        },
        resetBullet: function(fireeffect) {
            fireeffect.kill();
        },
        restartGame: function() {
            game.music.destroy();
            game.state.start('level');
            }
        }
