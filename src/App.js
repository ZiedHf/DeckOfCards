import React, { Component } from 'react';
import { Container, Grid, Dimmer, Loader } from 'semantic-ui-react'
import DCMenu from './components/DCMenu';
import DCCard from './components/DCCard';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
class App extends Component {
  
  numberOfCards = 52;
  loadingEffectIn = 300;
  constructor(props) {
    super(props);
    let cards = [];
    for (let i = 0; i < this.numberOfCards; i++) {
      cards.push(i+1); 
    }
    this.state = {
      loading: false,
      cardsTaken: [],
      cards: this.shuffle(cards)
    }
  }

  shuffle = cards => {
    cards = cards ? cards : this.state.cards;
    // We will shuffle the cases 51 times here
    for (let i = 0; i < this.numberOfCards - 1; i++) {
      // Get the numbers between 1 --> i 
      const j = Math.floor(Math.random() * (i + 1) );
      // Switch using es6 (no need to temporary variable)
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  setCards = () => {
    this.setState({ loading: true });
    setTimeout(() => this.setState({ loading: false, cards: this.shuffle() }), this.loadingEffectIn);
  };

  render() {
    let { cards, loading } = this.state;
    console.log(cards);
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <DCMenu shuffle={this.setCards} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              {loading ? <Dimmer active inverted><Loader /></Dimmer> : <DCCard type='backOnly' />}
            </Grid.Column>
            <Grid.Column width={5}>
              <DCCard type='flippedCard' cardNumber='card1' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
