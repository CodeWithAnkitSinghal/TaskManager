//3rd npm import
import React from "react";

//components import
import TodoMainContainer from "./Components/Pages/TodoTaskMainContainer/TodoMainContainer";

//css import
import "./Root.css";

class Root extends React.Component {
  render() {
    return (
      <div className="App">
        <TodoMainContainer />
      </div>
    );
  }
}

export default Root;
