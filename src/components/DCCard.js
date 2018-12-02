import React, { Component } from "react";
import ReactCardFlip from "react-card-flip";
import { getCardClass } from "../utils/functions";
import { isFunction } from "lodash";
class DCCard extends Component {
  /**
   * TO DO : add Prototypes and description
   * @param { isFlipped } props   || bool : which front the component will display
   * @param { cardNumber } props  || string : which front the component will display
   * @param { type } props        || string : one of [flippedCard, backOnly, frontOnly]; backOnly by default
   * @param { onClick } props     || function : Trigrred when the user click on the card
   */
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: props.isFlipped || true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFlipped !== this.props.isFlipped) {
      this.setState({ isFlipped: nextProps.isFlipped });
    }
  }
  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  };

  flippedCard = cardBack => {
    const { cardNumber, onClick } = this.props;
    const { isFlipped } = this.state;
    return (
      <div
        className="cardWrapper"
        onClick={() => isFunction(onClick) && onClick()}
      >
        <ReactCardFlip isFlipped={isFlipped}>
          <div key="front">
            <div className={`card ${cardNumber}`} onClick={this.handleClick} />
          </div>

          <div key="back">
            <div className={`card ${cardBack}`} onClick={this.handleClick} />
          </div>
        </ReactCardFlip>
      </div>
    );
  };

  render() {
    const { cardNumber, type, onClick } = this.props;

    // Test if this card red or black
    const cardBack = getCardClass(cardNumber);
    // let cardBackColor = cardNumber.splice(0, 4);
    switch (type) {
      case "flippedCard":
        return this.flippedCard(cardBack);
      case "frontOnly":
        return (
          <div
            onClick={() => isFunction(onClick) && onClick()}
            className={`card ${cardNumber}`}
          />
        );
      default:
        return (
          <div
            onClick={() => isFunction(onClick) && onClick()}
            className={`card ${cardBack}`}
          />
        );
    }
  }
}

export default DCCard;
