import React, { Component } from "react";
import { Container, Grid, Card, Icon } from "semantic-ui-react";
import DCMenu from "./components/DCMenu";
import DCCard from "./components/DCCard";
import DCCards from "./components/DCCards";
import DCMsg from "./components/DCMsg";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { first } from "lodash";
class App extends Component {
  numberOfCards = 52;
  loadingEffectIn = 2000;
  constructor(props) {
    super(props);
    let cards = this.getInitialCards();
    this.state = {
      loading: false,
      cardsTaken: [],
      cards: this.shuffle(cards)
    };
  }

  /** Get the initial card numbers */
  getInitialCards = () => {
    let cards = [];
    for (let i = 0; i < this.numberOfCards; i++) {
      cards.push(i + 1);
    }
    return cards;
  };

  /** Shuffle cards and get random order */
  shuffle = cards => {
    cards = cards ? cards : this.state.cards;
    // We will shuffle the cases 51 times here
    for (let i = 0; i < this.numberOfCards - 1; i++) {
      // Get a random number between 0 and (i+1)
      const j = Math.floor(Math.random() * (i + 1));
      // Switch using es6 (no need to temporary variable)
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  setCards = () => {
    this.setState({ loading: true });
    setTimeout(() => this.resetCards(), this.loadingEffectIn);
  };

  resetCards = () => {
    this.setState({ loading: false, cards: this.shuffle() });
  };

  dealCard = () => {
    let { cards, cardsTaken, warnings } = this.state;
    // If there is no cards, the function will quit
    if (!cards || !cards.length) {
      warnings.shuffleWarning = true;
      this.setState({ warnings });
      return false;
    }
    let card = first(cards);
    cardsTaken.push(card);
    cards.shift();
    console.log("cards", cards);
    console.log("cardsTaken", cardsTaken);
    this.setState({ cards, cardsTaken });
  };

  onApprove = () => {
    console.log("onApprove");
  };

  onCancel = () => {
    console.log("onCancel");
  };
  render() {
    let { cards, cardsTaken, loading, warnings } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <DCMenu shuffle={this.setCards} dealCard={this.dealCard} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {warnings && warnings.shuffleWarning ? (
              <DCMsg
                msg="There is no cards ! Do you want to shuffle the cards again ?"
                onApprove={this.onApprove}
                onCancel={this.onCancel}
              />
            ) : null}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              {loading ? (
                <div className="shuffle" />
              ) : (
                <Card color="green" className="sem-card">
                  <Card.Content>
                    <Card.Header>Deck Of Cards</Card.Header>
                    <Card.Description>
                      {cards && cards.length ? (
                        <DCCard
                          type="backOnly"
                          cardNumber={`card${first(cards)}`}
                        />
                      ) : (
                        "No Cards"
                      )}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="chess" />
                    {(cards && cards.length) || 0} Cards
                  </Card.Content>
                </Card>
              )}
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <DCCards cardsTaken={cardsTaken} />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
