import React, { Component, Fragment } from "react";
import DCCard from "./DCCard";
import { Card, Header, List } from "semantic-ui-react";
import { isRedCard } from "../utils/functions";
import texts from "../texts/texts";
class DCCards extends Component {
  render() {
    const { cardsTaken } = this.props;
    return cardsTaken && cardsTaken.length ? (
      <Card.Group itemsPerRow={6}>
        {cardsTaken.map(card => (
          <Card key={card} color={isRedCard(card) ? "red" : "black"} centered>
            <DCCard type="flippedCard" cardNumber={`card${card}`} />
          </Card>
        ))}
      </Card.Group>
    ) : (
      <Fragment>
        <Header as="h2">
          <Header.Subheader>
            <List bulleted>
              <List.Item>{texts.listone}</List.Item>
              <List.Item>{texts.listtwo}</List.Item>
              <List.Item>{texts.listthree}</List.Item>
              <List.Item>{texts.listfour}</List.Item>
            </List>
          </Header.Subheader>
        </Header>
      </Fragment>
    );
  }
}

export default DCCards;
