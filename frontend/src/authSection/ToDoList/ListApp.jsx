import React, { Component } from "react";
//CSS
import "./../../App.css";
// components
import Sidebar from "./components/Sidebar";
import List from "./components/List";

//Backend URL
const B_URL = `http://localhost:7781`;

export class ListApp extends Component {
  constructor(props) {
    super(props);

    this.selectList = this.selectList.bind(this);

    this.state = {
      lists: [],
      selectedListIndex: null,
      selectedList: null,
    };
  }
  componentDidMount = () => {
    fetch(`${B_URL}/lists/${this.props.userId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          lists: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectList = (list) => {
    this.setState({
      selectedList: list,
      selectedListIndex: list._id,
    });
  };

  addNewList = (val) => {
    let list = {
      listName: val,
      todos: [],
      check: [],
      userId: this.props.userId,
    };
    // console.log(list);
    fetch(`${B_URL}/lists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          lists: [...this.state.lists, data],
        });
        this.selectList(data);
      })
      .catch((error) => console.log(error));
  };

  deleteList = (list) => {
    fetch(`${B_URL}/lists/${list._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          lists: this.state.lists.filter(
            (eachList) => eachList._id !== data.id
          ),
        });
        if (this.state.selectedListIndex === data.id) {
          this.setState({
            selectedList: null,
            selectedListIndex: null,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  saveList = (list) => {
    fetch(`${B_URL}/lists/${list.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.updatedList._id === list.id) {
          window.alert("List saved");
          this.setState({
            lists: data.allList,
          });
          this.selectList(data.updatedList);
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-4">
            <Sidebar
              lists={this.state.lists}
              selectedListIndex={this.state.selectedListIndex}
              addNewList={this.addNewList}
              deleteList={this.deleteList}
              selectList={this.selectList}
            />
          </div>
          <div className="col-md-6 mx-auto">
            {this.state.selectedList ? (
              <List
                selectedList={this.state.selectedList}
                saveList={this.saveList}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ListApp;
