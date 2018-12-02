import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { isFunction } from "lodash";
class DCMenu extends Component {
  state = { activeItem: "" };

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

  render() {
    const { activeItem } = this.state;
    const { disabled } = this.props;
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
      </Menu>
    );
  }
}

export default DCMenu;
