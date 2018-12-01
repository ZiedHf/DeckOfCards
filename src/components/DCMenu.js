import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class DCMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    const { shuffle } = this.props;
    this.setState({ activeItem: name });
      if (name === 'shuffle') {
        shuffle();
      }
      if (name === 'Deal Card') {
        // dealCards();
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