import React from "react";

import TodoItem from "../TodoItem/TodoItem";

class TodoItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      searchResult: false,
      totalData: 0,
    };
  }
  componentDidMount() {
    let todoList = localStorage.getItem("TASKMANAGER_DATA");
    if (todoList && todoList !== "") {
      todoList = JSON.parse(todoList);
    } else {
      todoList = [];
    }
    this.setState({ todoList: todoList });
  }

  refresh = () => {
    let todoList = localStorage.getItem("TASKMANAGER_DATA");
    if (todoList && todoList !== "") {
      todoList = JSON.parse(todoList);
    } else {
      todoList = [];
    }
    this.setState({ todoList: todoList });
  };

  searchTodoList = (searchText) => {
    let todoList = localStorage.getItem("TASKMANAGER_DATA");
    if (todoList && todoList !== "") {
      todoList = JSON.parse(todoList);
    } else {
      todoList = [];
    }
    let finalData = todoList.filter((item) =>
      item.taskName.includes(searchText)
    );
    this.setState({ todoList: finalData, totalData: todoList.length });
  };

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.refreshTodoList !== this.props.refreshTodoList) {
      this.refresh();
      this.setState({ searchResult: false });
    }
    if (nextProps.triggerSearch != this.props.triggerSearch) {
      this.searchTodoList(nextProps.searchText);
      this.setState({ searchResult: true });
    }
  }
  render() {
    let header = {
      id: 0,
      taskName: "Task",
      taskDueDate: "Due Date",
      Priority: "Priority",
      colorScheme: "Label",
    };
    return (
      <>
        {this.state.searchResult ? (
          <h6>
            Result:{" "}
            <span>
              <strong>{`${this.state.todoList.length} out of ${this.state.totalData}`}</strong>
            </span>
          </h6>
        ) : null}
        <ul id="sortable" className="list-unstyled">
          {this.state.todoList.length > 0 ? (
            <TodoItem key={header.id} task={header} />
          ) : null}
          {this.state.todoList
            .filter((item) => item.status === 1)
            .map((item) => {
              return (
                <TodoItem
                  task={item}
                  key={item.id}
                  refresh={this.props.updateList}
                />
              );
            })}
        </ul>
        {this.state.searchResult ? null : (
          <div className="todo-footer">
            <strong>
              <span className="count-todos">
                {this.state.todoList.filter((item) => item.status === 1).length}
              </span>
            </strong>{" "}
            Items Left
          </div>
        )}
      </>
    );
  }
}

export default TodoItemList;
