import React, { Component } from "react";
import { Message, Button } from "semantic-ui-react";
import { isFunction } from "lodash";
class DCMsg extends Component {
  render() {
    const { onApprove, onCancel, msg } = this.props;
    return (
      <div className="fullWidth">
        <Message warning>
          <Message.Header>{msg}</Message.Header>
          <br />
          {isFunction(onApprove) ? (
            <Button onClick={() => onApprove()} color="green">
              Approve
            </Button>
          ) : null}
          {isFunction(onCancel) ? (
            <Button
              onClick={() => isFunction(onCancel) && onCancel()}
              color="red"
            >
              Cancel
            </Button>
          ) : null}
        </Message>
      </div>
    );
  }
}

export default DCMsg;
