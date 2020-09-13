import React from "react";

import TodoForm from "../TodoForm/TodoForm";
import TodoItemList from "../TodoItemList/TodoItemList";

class TodoLeftContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      triggerSearch: false,
    };
  }

  refreshTodoList = () => {
    this.props.refreshTodoList();
  };
  triggerSearch = (value) => {
    this.setState({
      searchText: value,
      triggerSearch: !this.state.triggerSearch,
    });
  };
  render() {
    return (
      <div className="col-md-6">
        <div className="todolist not-done">
          <h1>Task Manager</h1>
          <TodoForm
            refreshTodoList={this.refreshTodoList}
            triggerSearch={this.triggerSearch}
          />
          <TodoItemList
            refreshTodoList={this.props.refresh}
            updateList={this.props.refreshTodoList}
            triggerSearch={this.state.triggerSearch}
            searchText={this.state.searchText}
          />
        </div>
      </div>
    );
  }
}

export default TodoLeftContainer;
