//3rd npm import
import React from "react";

class InputDate extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeHandler = (event) => {
    this.props.onChangeHandler(event.target.value);
  };
  render() {
    return (
      <input
        type="date"
        id={this.props.id}
        className="form-control"
        placeholder={this.props.placeholder}
        onChange={this.onChangeHandler}
      />
    );
  }
}

export default InputDate;
