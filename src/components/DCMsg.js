
import React, { Component } from 'react';
import { Message, Button } from 'semantic-ui-react';
import { isFunction } from 'lodash';
class DCMsg extends Component {
  render() {
    const { onApprove, onCancel, msg } = this.props;
    return (
        <Message warning>
            <Message.Header>{msg}</Message.Header>
            <Button onClick={() => isFunction(onApprove) && onApprove()}>Approve</Button>
            <Button onClick={() => isFunction(onCancel) && onCancel()}>Cancel</Button>
        </Message>
    );
  }
}

export default DCMsg;