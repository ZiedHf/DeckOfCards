
import React, { Component } from 'react'
import DCCard from './DCCard';
import { Card } from 'semantic-ui-react'
import { isRedCard } from '../utils/functions';
class DCCards extends Component {
  render() {
    const { cardsTaken } = this.props;
    return (
        <Card.Group itemsPerRow={6}>
            {cardsTaken && cardsTaken.length ? cardsTaken.map(card => <Card key={card} color={isRedCard(card) ? 'red' : 'black'} centered><DCCard type='flippedCard' cardNumber={`card${card}`} /></Card>) : 'No cards'}
        </Card.Group>
    );
  }
}

export default DCCards;