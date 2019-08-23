import React from 'react'
import ReactCardsFlip from "react-card-flip"
import arr from './cards'
import image01 from './cards'
import './card.css'
class Card extends React.Component {
  constructor(){
    super();
    this.cleck = this.cleck.bind(this);

  }
  cleck(e) {
    console.log(e.target);
  }
  render() {
  let doubleCards = [];
  arr.forEach((item,i) =>
      doubleCards.push(item,item)
  );
  return (
    <div className="contents-game">
        {doubleCards.map((item) => <div onClick={this.cleck} className={`tile-inner tile-${item.id}`}><img src={item.img} /></div>)}
    </div>


    )
  }
}
export default Card
