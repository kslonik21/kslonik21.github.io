
(function (window) {
    'use strict';

    function extend(a,b) {
        for (var key in b) {
            if(b.hasOwnProperty( key ) ) {
                a[key]=b[key];
                }
            }
            return a;
        }

    function shuffle(arr) {
        for(var j, temp, i=arr.length; i; j=parseInt(Math.random()*i),temp=arr[--i],arr[i]=arr[j],arr[j]=temp);
        return arr;
    }

    function Board(options) {
        this.options= extend( {}, options);
        extend( this.options, options );
        this._init();
        console.log(this.options);
    }


    Board.prototype.options = {

        wrapperID : "match-match-game",
        cards : [
          {
            id : 1,
            img: "images/monsters-01.png"
          },
          {
            id : 2,
            img: "images/monsters-02.png"
          },
          {
            id : 3,
            img: "images/monsters-03.png"
          },
          {
            id : 4,
            img: "images/monsters-04.png"
          },
          {
            id : 5,
            img: "images/monsters-05.png"
          },
          {
            id : 6,
            img: "images/monsters-06.png"
          },
          {
            id : 7,
            img: "images/monsters-07.png"
          },
          {
            id : 8,
            img: "images/monsters-08.png"
          },
          {
            id : 9,
            img: "images/monsters-09.png"
          }
      ],
       onGameStart : function() { return false; },
       onGameEnd : function() { return false; }
   };


    Board.prototype._init = function() {

     this.game = document.createElement("div");
     this.game.id = "match-match";
     this.game.className = "match-match";
     document.getElementById(this.options.wrapperID).appendChild(this.game);

     this.gameMeta = document.createElement("div");
     this.gameMeta.className = "clear";

     this.gameStartScreen = document.createElement("div");
     this.gameStartScreen.id = "start-screen";
     this.gameStartScreen.className = "start-screen";

     this.gameWrapper = document.createElement("div");
     this.gameWrapper.id = "wrapper-game";
     this.gameWrapper.className = "wrapper-game";
     this.gameContents = document.createElement("div");
     this.gameContents.id = "contents-game";
     this.gameWrapper.appendChild(this.gameContents);

      this.gameMessages = document.createElement("div");
      this.gameMessages.id = "win-message";
      this.gameMessages.className = "win-message";

     this._setupGame();
   };


   Board.prototype._setupGame = function() {
    var self=this;
    this.gameState = 1;
   this.cards = shuffle(this.options.cards);
   this.card1 = "";
   this.card2 = "";
   this.card1id = "";
   this.card2id = "";
   this.card1flipped = false;
   this.card2flipped = false;
   this.flippedTiles = 0;
   this.chosenLevel = "";
   this.numMoves = 0;

     this.gameMetaHTML = '<div class="counter">\
       <span class="counter-level">Level: \
       <span id="counter-level">' + this.chosenLevel + '</span>\
       </span>\
       <span class="moves">Moves: \
       <span id="moves">' + this.numMoves + '</span>\
       </span>\
       </div>\
       <div class="restart-game">\
       <button id="button-restart" class="turn-button">Try again</button>\
       </div>';
     this.gameMeta.innerHTML = this.gameMetaHTML;
     this.game.appendChild(this.gameMeta);

     this.gameStartScreenHTML = '<h2 class="start-screen-heading">Its my match-match game</h2>\
       <p class="game-rules">Flip the tiles and try to match them up in pairs. Pair up all the tiles to win. Try to complete the game in as few moves as possible!</p>\
       <h3 class="sub-heading">Select Level</h3>\
       <ul class="level-select">\
       <li><span data-level="1">Level 1 </span></li>\
       <li><span data-level="2">Level 2</span></li>\
       </ul>';
     this.gameStartScreen.innerHTML = this.gameStartScreenHTML;
     this.game.appendChild(this.gameStartScreen);

     document.getElementById("button-restart").addEventListener( "click", function(e) {
       self.resetGame();
     });

     this._startScreenEvents();
   }

    Board.prototype._startScreenEvents= function () {

        var levelsNodes=this.gameStartScreen.querySelectorAll("ul.level-select span");
            for(var i=0, len=levelsNodes.length; i < len; i++) {
                var levelNode=levelsNodes[i];
                     this._startScreenEventsHandler(levelNode);
                   }

            }

    Board.prototype._startScreenEventsHandler= function(levelNode) {
        var self=this;
        levelNode.addEventListener("click",function(e){
            if(self.gameState===1) {
                self._setupGameWrapper(this);
            }
        })

    }
    Board.prototype._setupGameWrapper= function(levelNode) {

        this.level= levelNode.getAttribute("data-level");
        this.gameStartScreen.parentNode.removeChild(this.gameStartScreen);
        this.gameContents.className= "contents-game level-"+this.level;
        this.game.appendChild(this.gameWrapper);

        this.chosenLevel=this.level;
        document.getElementById("counter-level").innerHTML=this.chosenLevel;

        this._renderTiles();

    };

    Board.prototype._renderTiles=function() {

        this.gridX = this.level * 2 + 2;
        this.gridY = this.gridX / 2;
        this.numTiles = this.gridX * this.gridY;
        this.halfNumTiles = this.numTiles/2;
        this.newCards = [];
        for(var i= 0;i<this.halfNumTiles;i++) {
            this.newCards.push(this.cards[i],this.cards[i]);
            console.log(this.newCards);
        }
        this.newCards=shuffle(this.newCards);
        this.tilesHTML='';

        for(var i =0;i<this.numTiles;i++) {
            var n=i+1;
            this.tilesHTML += '<div class="tile tile-' + n + '">\
              <div class="tile-inner" data-id="' + this.newCards[i]["id"] + '">\
              <span class="tile-outside"></span>\
              <span class="tile-inside"><img src="' + this.newCards[i]["img"] + '"></span>\
              </div>\
              </div>';
          }
          this.gameContents.innerHTML = this.tilesHTML;
          this.gameState = 2;
          this.options.onGameStart();
          this._gamePlay();
        }

        Board.prototype._gamePlay=function() {
            var tiles=document.querySelectorAll(".tile-inner");
            for( var i =0, len=tiles.length;i<len;i++) {
                var tile=tiles[i];
                console.log(tile);
                this._gamePlayEvents(tile);
            }
        }


          Board.prototype._gamePlayEvents = function(tile) {
             var self = this;
             tile.addEventListener( "click", function(e) {
               console.log(this);
               if (!this.classList.contains("flipped")) {
               if (self.card1flipped === false && self.card2flipped === false) {
                   this.classList.add("flipped");
                  self.card1 = this;
                   self.card1id = this.getAttribute("data-id");
                   self.card1flipped = true;
                } else if( self.card1flipped === true && self.card2flipped === false ) {
                   this.classList.add("flipped");
                  self.card2 = this;
                  console.log(self.card2);
                  self.card2id = this.getAttribute("data-id");
                  self.card2flipped = true;
                 if ( self.card1id == self.card2id ) {
                     self._gameCardsMatch();
                   } else {
                     self._gameCardsMismatch();
                 }
                 }
               }
           });
          }
          Board.prototype._gameCardsMatch = function() {
            // cache this
            var self = this;
            window.setTimeout( function(){
              self.card1.classList.add("correct");
              self.card2.classList.add("correct");
            }, 300 );
            window.setTimeout( function(){
              self.card1.classList.remove("correct");
              self.card2.classList.remove("correct");
              self._gameResetVars();
              self.flippedTiles = self.flippedTiles + 2;
              if (self.flippedTiles == self.numTiles) {
                self._winGame();
              }
            }, 1500 );
            this._gameCounterPlusOne();
          };

          Board.prototype._gameCardsMismatch = function() {

            var self = this;
            window.setTimeout( function(){
              self.card1.classList.remove("flipped");
              self.card2.classList.remove("flipped");
              self._gameResetVars();
            }, 900 );
            this._gameCounterPlusOne();
          };
          Board.prototype._gameResetVars = function() {
            this.card1 = "";
            this.card2 = "";
            this.card1id = "";
            this.card2id = "";
            this.card1flipped = false;
            this.card2flipped = false;
          }
          Board.prototype._gameCounterPlusOne = function() {
            this.numMoves = this.numMoves + 1;
            this.moveCounterUpdate = document.getElementById("moves").innerHTML = this.numMoves;
          };
          Board.prototype._clearGame = function() {
            if (this.gameMeta.parentNode !== null) this.game.removeChild(this.gameMeta);
            if (this.gameStartScreen.parentNode !== null) this.game.removeChild(this.gameStartScreen);
            if (this.gameWrapper.parentNode !== null) this.game.removeChild(this.gameWrapper);
            if (this.gameMessages.parentNode !== null) this.game.removeChild(this.gameMessages);
          }

          Board.prototype._winGame = function() {
            var self = this;
            if (this.options.onGameEnd() === false) {
              this._clearGame();
              this.gameMessages.innerHTML = '<h2 class="message-heading">Congratulate!</h2>\
                <p class="message">You won the round in ' + this.numMoves + ' moves. Go you.</p>\
                <button id="message-restart" class="turn-button">Play again?</button>';
              this.game.appendChild(this.gameMessages);
              document.getElementById("message-restart").addEventListener( "click", function(e) {
                self.resetGame();
              });
            } else {
              this.options.onGameEnd();
            }
          }
          Board.prototype.resetGame = function() {
            this._clearGame();
            this._setupGame();
          };

     window.Board = Board;
 })(window);

/*


## Про делегирование событий

        У тебя на каждую катрочку навешен обработчик:

                for( var i =0, len=tiles.length;i<len;i++) {
                    var tile=tiles[i];
                    this._gamePlayEvents(tile);
                }

        Почитай тут как стоит делать это правильно https://learn.javascript.ru/event-delegation
        Это очень нужная практика и очень часто используется.
        В данном случае ее использование так и напрашивается.



## Про безопасность
        Посмотри файл Cheet.jpg
        Я вижу, где какая картинка лежит и могу с первого раза все угадать (подсмотреть в испекторе data-id="X").
        Это довольно редкая ошибка. Обычно абсолютно не важно, что находится в консоли, но при геймдеве - это важно.
        Важно, чтобы картинка под рубашкой аппендилась в DOM только после нажатия на карточку, чтобы не было возможности ее подсмотреть заранее.
        Важно, чтобы массив карточек в объекте игры был приватным полем (в твоем случае, такого массива нет вообще, ты работаешь через DOM,
        что в общем-то и позволяет читить).

        https://learn.javascript.ru/internal-external-interface

        Так же это может пригодиться, когда надо скрыть какую-либо инфу от пользователя или хакера.
        Например пароли, логины, коммерческую информацию заказчика и т.д.

        Обрати на это внимание!



## Про innerHTML
        Это очень трудозатратная и небезопасная операция. Поищи сам про это информацию.
        Пользуйся appendChild в большинстве случаев.
*/

/*
    Работа не плохая.
    Все требования выполнены.
    Верстка в норме. Код не очень красиво офомлен, но исплользованы хорошия практики для JS кодинга, такие как
    закрытый скоуп всего кода через самовызывающуюся функцию, инициализация параметрами по умолчанию и т.д.
    Ставлю оценку 90.
*/
