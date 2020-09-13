import React from "react";

class TodoRightContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    };
  }

  refresh = () => {
    let todoList = localStorage.getItem("TASKMANAGER_DATA");
    if (todoList && todoList !== "") {
      todoList = JSON.parse(todoList);
    } else {
      todoList = [];
    }
    let finalData = todoList.filter((item) => item.status === 2);
    this.setState({ todoList: finalData });
  };

  componentDidMount() {
    debugger;
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.refresh != this.props.refresh) {
      this.refresh();
    }
  }

  deleteTask = (id) => {
    debugger;
    let todoList = localStorage.getItem("TASKMANAGER_DATA");
    if (todoList && todoList !== "") {
      todoList = JSON.parse(todoList);
    } else {
      todoList = [];
    }
    let finalData = [];
    todoList.map((item) => {
      if (item.id != parseInt(id)) {
        finalData.push(item);
      }
    });
    localStorage.removeItem("TASKMANAGER_DATA");
    localStorage.setItem("TASKMANAGER_DATA", JSON.stringify(finalData));
    this.props.refreshTodoList();
  };

  render() {
    debugger;
    return (
      <div className="col-md-6">
        <div className="todolist">
          <h1>Completed Task</h1>
          <ul id="done-items" className="list-unstyled">
            {this.state.todoList.map((item) => {
              return (
                <li>
                  {item.taskName}
                  <button
                    className="remove-item btn btn-default btn-xs pull-right"
                    id={item.id}
                    onClick={() => {
                      this.deleteTask(item.id)
                    }}
                  >
                    <span className="glyphicon glyphicon-remove"></span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="todo-footer">
            <strong>
              <span className="count-todos">
                {this.state.todoList.length}
              </span>
            </strong>{" "}
            Total
          </div>
        </div>
      </div>
    );
  }
}

export default TodoRightContainer;
