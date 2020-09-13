import React from "react";

import InputText from "../Input/InputText";
import InputDate from "../Input/InputDate";
import Button from "../Button/Button";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFeatures: false,
      editTask: false,
      taskName: "",
      dueDate: "",
    };
  }

  featureToggle = (event) => {
    debugger;
    this.setState({ showFeatures: event.target.checked });
  };

  onEditTask = () => {
    this.setState({
      editTask: true,
      taskName: this.props.task.taskName,
      dueDate: this.props.task.taskDueDate,
    });
  };

  onMarkCompleteTask = () => {
    let todoTaskData = localStorage.getItem("TASKMANAGER_DATA");
    if (todoTaskData && todoTaskData != "") {
      todoTaskData = JSON.parse(todoTaskData);
    } else {
      todoTaskData = [];
    }
    todoTaskData.map((item) => {
      if (item.id === this.props.task.id) {
        item.status = 2;
      }
    });
    localStorage.removeItem("TASKMANAGER_DATA");
    localStorage.setItem("TASKMANAGER_DATA", JSON.stringify(todoTaskData));
    this.props.refresh();
    this.setState({
      showFeatures: false,
      editTask: false,
      taskName: "",
      dueDate: "",
    });
  };

  onAddTextChangeHandler = (value) => {
    debugger;
    this.setState({ taskName: value });
  };

  onDueDateChangeHandler = (value) => {
    this.setState({ dueDate: value });
  };

  updateTaskHandler = () => {
    let todoTaskData = localStorage.getItem("TASKMANAGER_DATA");
    if (todoTaskData && todoTaskData != "") {
      todoTaskData = JSON.parse(todoTaskData);
    } else {
      todoTaskData = [];
    }
    todoTaskData.map((item) => {
      if (item.id === this.props.task.id) {
        item.taskName = this.state.taskName;
        item.taskDueDate = this.state.dueDate;
      }
    });
    localStorage.removeItem("TASKMANAGER_DATA");
    localStorage.setItem("TASKMANAGER_DATA", JSON.stringify(todoTaskData));
    this.props.refresh();
    this.setState({
      showFeatures: false,
      editTask: false,
      taskName: "",
      dueDate: "",
    });
  };

  render() {
    return (
      <li className="ui-state-default">
        <div className="checkbox flex flexRow">
          <label className="col-md-4">
            {this.props.task.id === 0 ? null : (
              <>
                {this.state.editTask ? null : (
                  <input
                    type="checkbox"
                    value=""
                    onChange={this.featureToggle}
                  />
                )}
              </>
            )}
            {this.state.editTask ? (
              <InputText
                id="taskName"
                onChangeHandler={this.onAddTextChangeHandler}
                placeholder="Update Task"
                value={this.state.taskName}
                error={this.state.addTextError}
                errorMessage={this.state.addTextErrorMessage}
              />
            ) : (
              this.props.task.taskName
            )}
          </label>
          {this.state.showFeatures && !this.state.editTask ? (
            <>
              <span
                className="editTask"
                id={this.props.task.id}
                onClick={() => {
                  this.onEditTask();
                }}
              >
                <i
                  className="fa fa-edit"
                  style={{ color: "red", paddingRight: "10px" }}
                ></i>
              </span>
              <span
                className="completeTask"
                id={this.props.task.id}
                onClick={() => {
                  this.onMarkCompleteTask();
                }}
              >
                <i className="fa fa-thumbs-up" style={{ color: "green" }}></i>
              </span>
            </>
          ) : (
            <>
              {this.state.editTask ? (
                <InputDate
                  id="taskDueDate"
                  onChangeHandler={this.onDueDateChangeHandler}
                  placeholder="Enter Due Dates"
                  value={this.state.dueDate}
                  error={this.state.dueDateError}
                  errorMessage={this.state.dueDateErrorMessage}
                />
              ) : (
                <>
                  <div className="dueDate col-md-3">
                    {this.props.task.Priority === 1 ? (
                      <span class="badge badge-primary">HIGH</span>
                    ) : this.props.task.Priority === 2 ? (
                      <span class="badge badge-warning">MEDIUM</span>
                    ) : this.props.task.Priority === 3 ? (
                      <span class="badge badge-secondary">LOW</span>
                    ) : (
                      this.props.task.Priority
                    )}
                  </div>
                  <div className="dueDate col-md-3">
                    {this.props.task.colorScheme === 1 ? (
                      <span class="badge badge-primary">P0</span>
                    ) : this.props.task.colorScheme === 2 ? (
                      <span class="badge badge-warning">P1</span>
                    ) : this.props.task.colorScheme === 3 ? (
                      <span class="badge badge-secondary">P2</span>
                    ) : (
                      this.props.task.colorScheme
                    )}
                  </div>
                  <div className="dueDate col-md-3">
                    {this.props.task.taskDueDate}
                  </div>
                </>
              )}
            </>
          )}
          {this.state.editTask ? (
            <Button
              buttonText="Update Task"
              id="updateTask"
              buttonClickHandler={this.updateTaskHandler}
            />
          ) : null}
        </div>
      </li>
    );
  }
}

export default TodoItem;
