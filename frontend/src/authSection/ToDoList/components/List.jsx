import React, { Component } from "react";
import Todos from "./Todos";

export class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listName: "",
      todos: [],
      check: [],
      id: "",
      newTodo: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      listName: this.props.selectedList.listName,
      id: this.props.selectedList._id,
      todos: this.props.selectedList.todos,
      check: this.props.selectedList.check,
    });
  };

  componentDidUpdate = () => {
    if (this.state.id !== this.props.selectedList._id) {
      this.setState({
        listName: this.props.selectedList.listName,
        id: this.props.selectedList._id,
        todos: this.props.selectedList.todos,
        check: this.props.selectedList.check,
      });
    }
  };

  addNewTodo = () => {
    if (this.state.newTodo) {
      // console.log(this.state.newTodo);
      this.setState({
        todos: [...this.state.todos, this.state.newTodo],
        check: [...this.state.check, false],
        newTodo: "",
      });
    }
  };

  editTodo = (todo, index) => {
    this.setState({
      todos: this.state.todos.filter((editingTodo) => editingTodo !== todo),
      check: this.state.check.filter((eachCheck, i) => i !== index),
      newTodo: todo,
    });
  };

  deleteTodo = (removeTodo, index) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo !== removeTodo),
      check: this.state.check.filter((eachCheck, i) => i !== index),
    });
  };

  saveList = () => {
    let list = {
      listName: this.state.listName,
      todos: this.state.todos,
      check: this.state.check,
      id: this.state.id,
    };
    // console.log(list);
    this.props.saveList(list);
  };

  checkTodo = (index) => {
    let updatedChecks = this.state.check.map((eachCheck, i) => {
      if (i === index) {
        return !eachCheck;
      }
      return eachCheck;
    });
    this.setState({
      check: updatedChecks,
    });
  };

  render() {
    return (
      <div className="mt-3">
        <div className="d-flex align-items-center bg-dark rounded p-3">
          <input
            type="text"
            className="form-control bg-light"
            value={this.state.listName ? this.state.listName : ""}
            onChange={(event) =>
              this.setState({ listName: event.target.value })
            }
          />
          <button className="btn-success btn ml-2" onClick={this.saveList}>
            <strong>Save</strong>
          </button>
        </div>
        <div className="d-flex align-items-center m-2 p-2">
          <input
            type="text"
            className="form-control"
            placeholder="Add New Todos"
            value={this.state.newTodo}
            onChange={(event) => this.setState({ newTodo: event.target.value })}
          />
          <button className="btn btn-info ml-1" onClick={this.addNewTodo}>
            Add
          </button>
        </div>
        {this.state.todos.length ? (
          <Todos
            todos={this.state.todos}
            editTodo={this.editTodo}
            deleteTodo={this.deleteTodo}
            checkTodo={this.checkTodo}
            check={this.state.check}
          />
        ) : (
          <p className="text-center bg-warning m-3 p-2">
            No todos in list: {this.state.listName}
          </p>
        )}
      </div>
    );
  }
}

export default List;
