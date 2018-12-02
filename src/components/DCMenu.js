import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { isFunction } from 'lodash';
class DCMenu extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => {
    const { shuffle, dealCard } = this.props;
    this.setState({ activeItem: name });
      if (name === 'shuffle' && isFunction(shuffle)) {
        shuffle();
      }
      if (name === 'Deal Card' && isFunction(dealCard)) {
        dealCard();
      }
  }

  render() {
    const { activeItem } = this.state
    return (
      <Menu secondary>
        <Menu.Item
          name='shuffle'
          active={activeItem === 'shuffle'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Deal Card'
          active={activeItem === 'Deal Card'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}

export default DCMenu;