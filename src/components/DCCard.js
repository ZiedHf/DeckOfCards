import React, { Component } from 'react'
import ReactCardFlip from 'react-card-flip';

class DCCard extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  };

  flippedCard = () => {
    const { cardNumber } = this.props;
    const { isFlipped } = this.state;
    return (
      <div className="cardWrapper">
        <ReactCardFlip isFlipped={isFlipped}>
          <div key="front">
            <div className={`card ${cardNumber}`} onClick={this.handleClick}/>
          </div>

          <div key="back">
            <div className='card cardBack' onClick={this.handleClick}/>
          </div>
        </ReactCardFlip>
      </div>
    );
  };

  render() {
    const { cardNumber, type } = this.props;
    // type supports one of : flippedCard, backOnly or frontOnly
    switch (type) {
      case 'flippedCard':
        return this.flippedCard();
      case 'frontOnly':
        return (<div className={`card ${cardNumber}`} />);
      default:
        return (<div className='card cardBack' />);
    }
  }
}

export default DCCard;