//3rd npm import
import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  buttonClickHandler = () => {
    this.props.buttonClickHandler();
  };

  render() {
    return (
      <button
        id={this.props.id}
        className="btn btn-success"
        onClick={this.buttonClickHandler}
      >
        {this.props.buttonText}
      </button>
    );
  }
}

export default Button;
