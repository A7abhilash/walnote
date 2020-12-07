import React, { Component } from "react";
//CSS
import "./../../App.css";
// components
import Sidebar from "./components/Sidebar";
import List from "./components/List";

export class ListApp extends Component {
  constructor(props) {
    super(props);

    this.selectList = this.selectList.bind(this);

    this.state = {
      lists: [],
      selectedListIndex: null,
      selectedList: null,
      loading: true,
    };
  }
  componentDidMount = () => {
    this.setState({ loading: true });
    fetch(`/lists/${this.props.userId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          lists: data,
          loading: false,
        });
      })
      .catch((error) => {
        // console.log(error)
        alert("505 Error");
        this.setState({ loading: false });
      });
  };

  selectList = (list) => {
    this.setState({
      selectedList: list,
      selectedListIndex: list._id,
    });
  };

  addNewList = (val) => {
    this.setState({ loading: true });
    let list = {
      listName: val,
      todos: [],
      check: [],
      userId: this.props.userId,
    };
    // console.log(list);
    fetch(`/lists`, {
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
          loading: false,
        });
        this.selectList(data);
      })
      .catch((error) => {
        // console.log(error)
        alert("505 Error");
        this.setState({ loading: false });
      });
  };

  deleteList = (list) => {
    this.setState({ loading: true });
    fetch(`/lists/${list._id}`, {
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
          loading: false,
        });
        if (this.state.selectedListIndex === data.id) {
          this.setState({
            selectedList: null,
            selectedListIndex: null,
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        alert("505 Error");
        this.setState({ loading: false });
      });
  };

  saveList = (list) => {
    this.setState({ loading: true });
    list["userId"] = this.props.userId;
    fetch(`/lists/${list.id}`, {
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
            loading: false,
          });
          this.selectList(data.updatedList);
        }
      })
      .catch((error) => {
        // console.log(error)
        alert("505 Error");
        this.setState({ loading: false });
      });
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
              loading={this.state.loading}
            />
          </div>
          <div className="col-md-6 mx-auto">
            {this.state.selectedList ? (
              <List
                selectedList={this.state.selectedList}
                saveList={this.saveList}
                loading={this.state.loading}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ListApp;
