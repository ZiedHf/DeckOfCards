import React, { Component } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { isFunction } from "lodash";
import { numberOfCards } from "../utils/functions";
class DCMenu extends Component {
  state = {
    activeItem: "",
    numberOfCards: numberOfCards,
    currentValue: numberOfCards
  };

  handleItemClick = (e, { name }) => {
    const { onShuffle, onDealCard, onResetCard } = this.props;
    this.setState({ activeItem: name });
    if (name === "shuffle" && isFunction(onShuffle)) {
      onShuffle();
    } else if (name === "Deal Card" && isFunction(onDealCard)) {
      onDealCard();
    } else if (name === "Reset" && isFunction(onResetCard)) {
      onResetCard();
    }
  };

  onClick(e, item) {
    const { onChangeCardNumber } = this.props;
    this.setState({ currentValue: item.value });
    isFunction(onChangeCardNumber) && onChangeCardNumber(item.value);
  }
  render() {
    const { activeItem, numberOfCards, currentValue } = this.state;
    const { disabled } = this.props;
    let options = [];
    for (let i = 2; i < numberOfCards + 1; i++) {
      options.push({
        text: `${i} Cards`,
        value: i,
        key: `${i}`,
        onClick: (e, item) => this.onClick(e, item)
      });
    }

    return (
      <Menu secondary>
        <Menu.Item
          name="shuffle"
          active={activeItem === "shuffle"}
          onClick={this.handleItemClick}
          disabled={disabled}
        />
        <Menu.Item
          name="Deal Card"
          active={activeItem === "Deal Card"}
          onClick={this.handleItemClick}
          disabled={disabled}
        />
        <Menu.Item
          name="Reset"
          active={activeItem === "Reset"}
          onClick={this.handleItemClick}
          disabled={disabled}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Dropdown
              placeholder="Number of cards"
              // icon="chess knight"
              scrolling
              options={options}
              onChange={(e, t) => console.log(e, t)}
              value={currentValue}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default DCMenu;
