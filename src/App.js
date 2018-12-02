import React, { Component } from "react";
import { Container, Grid, Card, Icon, Dimmer, Loader } from "semantic-ui-react";
import DCMenu from "./components/DCMenu";
import DCCard from "./components/DCCard";
import DCCards from "./components/DCCards";
import DCMsg from "./components/DCMsg";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { first } from "lodash";
import texts from "./texts/texts";
import { loadingEffectIn, getInitialCards, shuffle } from "./utils/functions";

class App extends Component {
  constructor(props) {
    super(props);
    let cards = getInitialCards();
    this.state = {
      loading: false,
      cardsTaken: [],
      cards: shuffle(cards),
      warnings: {}
    };
  }

  loadCards = (newState = {}, resetCards = false) => {
    this.setState({ loading: true });
    setTimeout(() => this.resetCards(newState, resetCards), loadingEffectIn);
  };

  resetCards = (newState = {}, resetCards) => {
    const cards = !resetCards ? this.state.cards : null;
    // console.log("this.state.cards", this.state.cards);
    this.setState({
      ...newState,
      ...{ loading: false, cards: shuffle(cards) }
    });
  };

  dealCard = () => {
    let { cards, cardsTaken, warnings } = this.state;
    // If the shuffle warning is already set, nothing to do
    if (warnings.shuffleWarning) {
      return false;
    }
    // If there is no cards, the function will set the shuffleWarning and quit
    if (!cards || !cards.length) {
      warnings.shuffleWarning = true;
      this.setState({ warnings });
      return false;
    }
    // The button will add a card to the cardsTaken and drop it from the deck
    let card = first(cards);
    cardsTaken.push(card);
    cards.shift();
    this.setState({ cards, cardsTaken });
  };

  onApprove = () => {
    let { warnings } = this.state;
    warnings.shuffleWarning = false;
    let newState = { cardsTaken: [], warnings };
    this.loadCards(newState, true);
  };

  onCancel = () => {
    let { warnings } = this.state;
    warnings.shuffleWarning = false;
    this.setState({ warnings });
  };

  render() {
    let { cards, cardsTaken, loading, warnings } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <DCMenu shuffle={this.loadCards} dealCard={this.dealCard} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row width={16}>
            {warnings && warnings.shuffleWarning ? (
              <DCMsg
                msg={texts.warningNoMoreCards}
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
                    <Card.Header>{texts.headerdeck}</Card.Header>
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
                    {(cards && cards.length) || 0} {texts.cards}
                  </Card.Content>
                </Card>
              )}
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                {loading ? (
                  <Dimmer active inverted>
                    <Loader />
                  </Dimmer>
                ) : (
                  <DCCards cardsTaken={cardsTaken} />
                )}
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
