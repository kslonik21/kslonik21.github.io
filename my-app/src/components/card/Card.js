import React from 'react'
import ReactCardsFlip from "react-card-flip"
import arr from './cards'
import image01 from './cards'
import './card.css'
let storageCards = {
  card1: null,
  card2: null,
  card2id: null,
  card1id: null,
  card1flipped: false,
  card2flipped: false,
  flippedTiles: 0,
  numMoves: 0,
  reset: function () {
    this.card1 = null;
    this.card2 = null;
    this.card2id = null;
    this.card1id = null;
    this.card1flipped = false;
    this.card2flipped = false;
    this.flippedTiles = 0;
    }
};

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cards: arr
    }
    this.gameCardsMissMatch = this.gameCardsMissMatch.bind(this);
    this.gameCardsMatch = this.gameCardsMatch.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }
  shuffle(arr) {
    for(let j, temp, i=arr.length; i; j=parseInt(Math.random()*i),temp=arr[--i],arr[i]=arr[j],arr[j]=temp);
        return arr;
  }
  gameCardsMatch() {
    setTimeout(function() {
      storageCards.card1.classList.add('correct');
      storageCards.card2.classList.add('correct');
    },300);
    setTimeout(function() {
      storageCards.card1.classList.remove('correct');
      storageCards.card2.classList.remove('correct');
      storageCards.card1.classList.add('correct');
      storageCards.card2.classList.add('hide');
      storageCards.reset();
    },1500)
  }
  gameCardsMissMatch() {
    setTimeout(function() {
      storageCards.card1.classList.remove('flipped');
      storageCards.card2.classList.remove('flipped');
      storageCards.reset();
    }, 900);
  }
  handleClick(e) {
    e.preventDefault();
    const targetTile = e.target.closest('.tile');
    if(!targetTile.classList.contains('flipped')) {
      if(storageCards.card1flipped===false && storageCards.card2flipped === false) {
        targetTile.classList.add('flipped');
        storageCards.card1flipped = true;
        storageCards.card1 = targetTile;
        storageCards.card1id = targetTile.id;
      } else if(storageCards.card1flipped===true && storageCards.card2flipped === false) {
        targetTile.classList.add('flipped');
        storageCards.card2 = targetTile;
        storageCards.card2id = targetTile.id;
        storageCards.card2flipped = true;
        if(storageCards.card1id === storageCards.card2id) {
          this.gameCardsMatch();
        } else {
          this.gameCardsMissMatch();
        }
      }
    }

  }

  render() {

    let cardsCopy = this.state.cards.slice();
    let doubleCards = [];
    let classes = ['backskirt'];
    let flippedClass = ['tile'];

    cardsCopy.forEach((item,i) =>
        doubleCards.push(item,item)
    );
    // let shuffleCards = this.shuffle(doubleCards);
    if(this.state.addClass) {
      classes.push("flipped");
    }
  return (
    <div className='container'>
    <div className="contents-game" >
        {doubleCards.map((card,index) =>
          <div key={index} className={flippedClass.join(" ")} id={card.id} onClick={this.handleClick}>
            <div className={classes.join(' ')}></div>
            <img src={card.img}/>
          </div>
          )
        }
    </div>
    </div>
    )
  }
}
export default Card
