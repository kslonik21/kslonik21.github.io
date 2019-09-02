import React from 'react'
import arr from './cards'
import image01 from './cards'
import './card.css'

class Card1 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shuffleArr: this.shuffle(arr),
      storageCards: {
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
      },
      cards: ""
    }
    // this.gameCardsMissMatch = this.gameCardsMissMatch.bind(this);
    this.gameCardsMatch = this.gameCardsMatch.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }
  shuffle(kek) {
    for(let j, temp, i=kek.length; i; j=parseInt(Math.random()*i),temp=kek[--i],kek[i]=kek[j],kek[j]=temp);
        return kek;
        this.setState({cards: kek})
  }
  gameCardsMatch() {
    const storage1 = this.state.storageCards;
    setTimeout(function() {
      storage1.card1 = storage1.card1.classList.add('hide');
      storage1.card2 = storage1.card2.classList.add('hide');
      storage1.reset();
    },1000);

    this.setState({storageCards:storage1});
}
  gameCardsMissMatch() {
    const storage = this.state.storageCards
    setTimeout(function() {
      storage.card1 = storage.card1.classList.remove('flipped');
      storage.card2 = storage.card2.classList.remove('flipped');
      storage.reset();
    }, 900);
    this.setState({storageCards:storage})
  }
  handleClick(e) {
    e.preventDefault();
    const storage = this.state.storageCards;
    const targetTile = e.target.closest('.tile');
    if(!targetTile.classList.contains('flipped')) {
      if(storage.card1flipped===false && storage.card2flipped === false) {
        targetTile.classList.add('flipped');
        storage.card1flipped = true;
        storage.card1 = targetTile;
        storage.card1id = targetTile.id;
        this.setState({
          storageCards: storage
        })
      } else if(storage.card1flipped===true && storage.card2flipped===false) {
        targetTile.classList.add('flipped');
        storage.card2flipped = true;
        storage.card2 = targetTile;
        storage.card2id = targetTile.id;
        if(storage.card1id === storage.card2id) {
          this.gameCardsMatch();
        } else {
          this.gameCardsMissMatch();
        }
        this.setState({
          storageCards: storage
        })

      }
    }
  }

  duplicateCard(arr) {
    let doubleCards = [];
    arr.forEach((item) =>
      doubleCards.push(item,item))
  }
  render() {
    console.log(this.state.cards);
    let cardsCopy = this.state.shuffleArr.slice();
    let doubleCards = [];
    let classes = ['backskirt'];
    let flippedClass = ['tile'];
    cardsCopy.forEach(function(item,i) {
        doubleCards.push(item,item);
    });
    let shufArr = this.shuffle(doubleCards);
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
export default Card1
