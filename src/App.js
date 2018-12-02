import React, { Component } from "react";
import {
  Container,
  Grid,
  Card,
  Icon,
  Dimmer,
  Loader,
  Header,
  Segment,
  Image
} from "semantic-ui-react";
import DCMenu from "./components/DCMenu";
import DCCard from "./components/DCCard";
import DCCards from "./components/DCCards";
import DCMsg from "./components/DCMsg";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { first, isEqual, cloneDeep } from "lodash";
import texts from "./texts/texts";
import {
  loadingEffectIn,
  getInitialCards,
  shuffle,
  initialWarnings,
  numberOfCards
} from "./utils/functions";

class App extends Component {
  constructor(props) {
    super(props);
    let cards = getInitialCards();
    this.state = {
      loadDeck: false,
      loadTakenCards: false,
      cardsTaken: [],
      cards: shuffle(cards),
      warnings: cloneDeep(initialWarnings),
      numberOfCards
    };
  }

  // Set the loading effect
  loadCards = (newState = {}, resetCards = false) => {
    let { cards, warnings } = this.state;
    // Don't let the user shuffle 1 card (He needs to reset all of it)
    if (!resetCards && cards.length < 2) {
      if (cards.length === 1) warnings.resetOneCard = true;
      if (cards.length === 0) warnings.shuffleZeroCard = true;
      this.setState({ warnings });
      return false;
    }
    let loading = resetCards
      ? { loadDeck: true, loadTakenCards: true }
      : { loadDeck: true };
    this.setState(loading);
    setTimeout(() => this.resetCards(newState, resetCards), loadingEffectIn);
  };

  // Reset the card
  // If we have already cards we will shuffle only these cards without the taken ones
  // If we don't have any we will shuffle all the cards again
  resetCards = (newState = {}, resetCards) => {
    const cards = !resetCards ? this.state.cards : null;
    const { numberOfCards } = this.state;
    this.setState({
      ...newState,
      ...{
        loadDeck: false,
        loadTakenCards: false,
        cards: shuffle(cards, numberOfCards)
      }
    });
  };

  // Take the next card
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

  // Click on the reset or approve buttons
  onResetAll = () => {
    let { warnings } = this.state;
    let newState = { cardsTaken: [] };
    // If the warnings in the state are different we will set them to the initial ones
    if (!isEqual(warnings, initialWarnings)) {
      Object.assign(newState, { warnings: cloneDeep(initialWarnings) });
    }
    this.loadCards(newState, true);
  };

  // Click on the cancel button will make the warning disapear
  // Calling this function without argument will hide all the warnings
  resetWarnings = warning => {
    let { warnings } = this.state;
    if (!isEqual(warnings, initialWarnings)) {
      let newWarnings;
      if (warning) {
        newWarnings = cloneDeep(warnings);
        newWarnings[warning] = false;
      } else {
        newWarnings = cloneDeep(initialWarnings);
      }
      this.setState({ warnings: newWarnings });
    }
  };

  onChangeCardNumber = value => {
    console.log("onChangeCardNumber", value);
    this.setState({ numberOfCards: +value }, () => this.onResetAll());
  };
  render() {
    const {
      cards,
      cardsTaken,
      loadDeck,
      loadTakenCards,
      warnings
    } = this.state;
    const loading = loadDeck || loadTakenCards;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <DCMenu
                disabled={!!loadTakenCards || !!loadDeck}
                onShuffle={this.loadCards}
                onDealCard={this.dealCard}
                onResetCard={this.onResetAll}
                onChangeCardNumber={this.onChangeCardNumber}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Header as="h2" icon textAlign="center">
              <Header.Content>Deck Of Cards</Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Row width={16}>
            {!loading && warnings && warnings.shuffleWarning ? (
              <DCMsg
                msg={texts.warningNoMoreCards}
                onApprove={this.onResetAll}
                onCancel={() => this.resetWarnings("shuffleWarning")}
              />
            ) : null}
            {!loading && warnings && warnings.resetOneCard ? (
              <DCMsg
                msg={texts.warningResetOneCard}
                onCancel={() => this.resetWarnings("resetOneCard")}
              />
            ) : null}
            {!loading && warnings && warnings.shuffleZeroCard ? (
              <DCMsg
                msg={texts.warningShuffleZeroCard}
                onApprove={this.onResetAll}
                onCancel={() => this.resetWarnings("shuffleZeroCard")}
              />
            ) : null}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Segment>
                {loadDeck ? (
                  <div className="shuffle" />
                ) : (
                  <Card color="green" className="sem-card">
                    <Card.Content>
                      {cards && cards.length ? (
                        <Card.Header>{texts.headerdeck}</Card.Header>
                      ) : null}
                      <Card.Description>
                        {cards && cards.length ? (
                          <DCCard
                            type="backOnly"
                            cardNumber={`card${first(cards)}`}
                            onClick={this.dealCard}
                          />
                        ) : (
                          texts.noCards
                        )}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name="chess" />
                      {(cards && cards.length) || 0} {texts.cards}
                    </Card.Content>
                  </Card>
                )}
              </Segment>
            </Grid.Column>
            <Grid.Column width={13}>
              <Grid.Row>
                <Segment>
                  <Header as="h2" icon textAlign="center">
                    <Image src="./img/cardsicon.jpeg" />
                    {texts.boardHeader}
                  </Header>
                  {loadTakenCards ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <DCCards cardsTaken={cardsTaken} />
                  )}
                </Segment>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
