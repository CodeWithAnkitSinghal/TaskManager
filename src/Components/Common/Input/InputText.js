//3rd npm import
import React from "react";

class InputText extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeHandler = (event) => {
    this.props.onChangeHandler(event.target.value);
  };
  render() {
    return (
      <input
        type="text"
        id={this.props.id}
        className={this.props.error? "form-control errorHighlighter": "form-control"}
        placeholder={this.props.placeholder}
        onChange={this.onChangeHandler}
        value={this.props.value}
      />
    );
  }
}

export default InputText;
