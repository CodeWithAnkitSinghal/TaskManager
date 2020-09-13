//3rd party npm
import React from "react";

//component import
import Button from "../Button/Button";
import InputText from "../Input/InputText";
import InputDate from "../Input/InputDate";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addText: "",
      addTextError: false,
      addTextErrorMessage: "",
      dueDate: "",
      dueDateError: false,
      dueDateErrorMessage: "",
      formError: false,
      Priority: 1,
      colorScheme: 1,
    };
  }

  onChangeHandler = (value) => {
    let finalText = value.trim();
    let itemForStorage = localStorage.getItem("TASKMANAGER_SEARCHTEXT");
    if (itemForStorage && itemForStorage !== "") {
      localStorage.removeItem("TASKMANAGER_SEARCHTEXT");
      localStorage.setItem("TASKMANAGER_SEARCHTEXT", finalText);
    } else {
      localStorage.setItem("TASKMANAGER_SEARCHTEXT", finalText);
    }
    this.setState({ searchText: finalText });
  };

  onAddTextChangeHandler = (value) => {
    debugger;
    let finalText = value;
    this.setState({ addText: finalText });
  };

  onDueDateChangeHandler = (value) => {
    this.setState({ dueDate: value });
  };

  validateForm = () => {
    let error = false;
    let addTextError = false;
    let addTextErrorMessage = "";
    let dueDateError = false;
    let dueDateErrorMessage = "";
    if (this.state.addText === "") {
      error = true;
      addTextError = true;
      addTextErrorMessage = "Please enter a Task";
    }
    if (this.state.dueDate === "") {
      error = true;
      dueDateError = true;
      dueDateErrorMessage = "Please enter the Due Date";
    }

    this.setState({
      addTextError,
      addTextErrorMessage,
      dueDateError,
      dueDateErrorMessage,
      formError: error,
    });
    return error;
  };

  addTaskClickHandler = () => {
    debugger;
    let error = this.validateForm();
    if (!error) {
      let lastStoredId = localStorage.getItem("TASKMANAGER_LASTTASKID");
      let id = 1;
      let todoTaskData = localStorage.getItem("TASKMANAGER_DATA");
      if (todoTaskData && todoTaskData != "") {
        todoTaskData = JSON.parse(todoTaskData);
      } else {
        todoTaskData = [];
      }
      let taskData = {};
      if (!lastStoredId || lastStoredId === "") {
        taskData.id = id;
        taskData.taskName = this.state.addText;
        taskData.taskDueDate = this.state.dueDate;
      } else {
        id = parseInt(lastStoredId) + 1;
        taskData.id = id;
        taskData.taskName = this.state.addText;
        taskData.taskDueDate = this.state.dueDate;
      }
      taskData.status = 1;
      taskData.Priority = this.state.Priority;
      taskData.colorScheme = this.state.colorScheme;
      todoTaskData.push(taskData);
      localStorage.removeItem("TASKMANAGER_DATA");
      localStorage.setItem("TASKMANAGER_DATA", JSON.stringify(todoTaskData));
      localStorage.setItem("TASKMANAGER_LASTTASKID", id.toString());
      this.setState({ addText: "", dueDate: "", Priority: 1, colorScheme: 1 });
      this.props.refreshTodoList();
    }
  };

  markAllDoneClickHandler = () => {
    let todoList = localStorage.getItem("TASKMANAGER_DATA");
    if (todoList && todoList !== "") {
      todoList = JSON.parse(todoList);
    } else {
      todoList = [];
    }
    todoList.map((item) => {
      item.status = 2;
    });
    localStorage.removeItem("TASKMANAGER_DATA");
    localStorage.setItem("TASKMANAGER_DATA", JSON.stringify(todoList));
    this.props.refreshTodoList();
  };

  searchClickHandler = () => {
    debugger
    this.props.triggerSearch(this.state.addText)
  }

  selectPriorioty = (value) => {
    this.setState({ Priority: value });
  };

  selectColorScheme = (value) => {
    this.setState({ colorScheme: value });
  };

  render() {
    return (
      <>
        <InputText
          id="taskName"
          onChangeHandler={this.onAddTextChangeHandler}
          placeholder="ENTER NAME"
          value={this.state.addText}
          error={this.state.addTextError}
          errorMessage={this.state.addTextErrorMessage}
        />
        <InputDate
          id="taskDueDate"
          onChangeHandler={this.onDueDateChangeHandler}
          placeholder="Enter Due Dates"
          value={this.state.dueDate}
          error={this.state.dueDateError}
          errorMessage={this.state.dueDateErrorMessage}
        />
        <br />
        <h5>
          Priority:{" "}
          <strong>
            {this.state.Priority === 1
              ? "HIGH"
              : this.state.Priority === 2
              ? "MEDIUM"
              : "LOW"}
          </strong>
        </h5>
        <div className="flex priorityConatiner" style={{ padding: "10px 0" }}>
          <span
            class="badge badge-primary"
            onClick={() => {
              this.selectPriorioty(1);
            }}
          >
            HIGH
          </span>
          <span
            class="badge badge-warning"
            onClick={() => {
              this.selectPriorioty(2);
            }}
          >
            MEDIUM
          </span>
          <span
            class="badge badge-secondary"
            onClick={() => {
              this.selectPriorioty(3);
            }}
          >
            LOW
          </span>
        </div>

        <br />
        <h5>
          Label:{" "}
          <strong>
            {this.state.colorScheme === 1
              ? "P0"
              : this.state.colorScheme === 2
              ? "P1"
              : "P2"}
          </strong>
        </h5>
        <div className="flex priorityConatiner" style={{ padding: "10px 0" }}>
          <span
            class="badge badge-primary"
            onClick={() => {
              this.selectColorScheme(1);
            }}
          >
            P0
          </span>
          <span
            class="badge badge-warning"
            onClick={() => {
              this.selectColorScheme(2);
            }}
          >
            P1
          </span>
          <span
            class="badge badge-secondary"
            onClick={() => {
              this.selectColorScheme(3);
            }}
          >
            P2
          </span>
        </div>

        {this.state.formError ? (
          <div className="errorMessage">
            {this.state.addTextError
              ? this.state.addTextErrorMessage
              : this.state.dueDateError
              ? this.state.dueDateErrorMessage
              : "Please fill the details"}
          </div>
        ) : null}
        <Button
          buttonText="Add Task"
          id="addTask"
          buttonClickHandler={this.addTaskClickHandler}
        />
        <Button
          buttonText="Mark All Done"
          id="markAllDone"
          buttonClickHandler={this.markAllDoneClickHandler}
        />
        <Button
          buttonText="Search"
          id="searchTask"
          buttonClickHandler={this.searchClickHandler}
        />
        <hr />
      </>
    );
  }
}

export default TodoForm;
