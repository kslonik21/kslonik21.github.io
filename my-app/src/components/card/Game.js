import React from 'react'
import ReactCardsFlip from "react-card-flip"
import arr from './cards'
import image01 from './cards'
import Card from './Card'
import './card.css'
const tiles = arr;


const stylesHeading = {
  marginBottom: "10px",
  color:'#282a2f',
  fontSize: '30px',
}
const rules = {
  marginBottom: '20px',
  fontSize: '30px',
  display: 'block'
}

const containerMenu = {
  textAlign: 'center',
  padding: '80px 20px'
}
const startButton = {
    display: 'inline-block',
    padding: '5px',
    color: '#fff',
    fontFamily: 'Indie Flower, cursive',
    fontSize: '14px',
    appearance: 'none',
    background: '#483D8B',
    border: 'none',
    borderRadius: '3px',
    boxShadow: 'none',
    cursor: 'pointer',
    width: '100px',
    height: '30px'
}
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showComp: false,
      cards: []
    }
    this.renderCards = this.renderCards.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.multipliedCards = this.multipliedCards.bind(this);
    this.wrapperFunction = this.wrapperFunction.bind(this);
  }
  componentDidMount() {
    this.setState({
      cards: this.shuffle(this.multipliedCards(tiles))
    })
  }
  multipliedCards(a) {
    let duplicatedArr = []
    a.forEach(tile => duplicatedArr.push(tile,tile))
    return duplicatedArr
  }
  shuffle(b) {
    for(var j, temp, i=b.length; i; j=parseInt(Math.random()*i),temp=b[--i],b[i]=b[j],b[j]=temp);
      return b;
  }
  wrapperFunction() {
    this.renderCards();
    this.shuffle(this.state.cards);
  }

  renderCards() {
    this.setState({
      showComp: true
    })
  }
  render() {
    const matchGame = <h2 className='start-screen-heading' style={stylesHeading}>Its my match-match game</h2>;
    const gameRules = <p className='game-rules' style={rules}>Flip the tiles and try to match them up in pairs. Pair up all the tiles to win. Try to complete the game in as few moves as possible!</p>
    const startButton = <button className='turn-button' >Try again</button>
    if(this.state.showComp) {
      return <Card til={this.state.cards}/>
    }
    return(
      <div className='start-screen' style={containerMenu}>
        {matchGame}
        {gameRules}
        <button onClick={this.wrapperFunction}></button>
      </div>
    )
  }
}

export default Game;
