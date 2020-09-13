//3rd npm import
import React from "react";

import TodoLeftContainer from "../../Common/TodoLeftContainer/TodoLeftContainer";
import TodoRightContainer from "../../Common/TodoRightContainer/TodoRightContainer";

//css import
import "./TodoMainContainer.css";

class TodoMainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshList: false,
    };
  }

  refreshTodoList = () => {
    debugger
    this.setState({ refreshList: !this.state.refreshList });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <TodoLeftContainer
            refreshTodoList={this.refreshTodoList}
            refresh={this.state.refreshList}
          />
          <TodoRightContainer
            refreshTodoList={this.refreshTodoList}
            refresh={this.state.refreshList}
          />
        </div>
      </div>
    );
  }
}

export default TodoMainContainer;
