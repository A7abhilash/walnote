import React, { Component } from "react";
import SidebarItems from "./SidebarItems";

export class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listName: "",
      isOpen: false,
    };
  }

  selectList = (list) => {
    this.props.selectList(list);
  };

  addNewList = () => {
    // console.log(this.state.listName);
    if (this.state.listName) {
      this.props.addNewList(this.state.listName);
      this.setState({
        listName: "",
        isOpen: true,
      });
    }
  };

  deleteList = (list) => {
    if (window.confirm(`Are you sure to delete list: ${list.listName}`)) {
      this.props.deleteList(list);
    }
  };

  render() {
    const { lists, selectedListIndex } = this.props;
    return (
      <div>
        <div className="mt-3">
          <input
            type="text"
            className="form-control m-2"
            placeholder="Add New List"
            value={this.state.listName}
            onChange={(event) =>
              this.setState({ listName: event.target.value })
            }
          />
          <button className="btn btn-primary m-2" onClick={this.addNewList}>
            Add List
          </button>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <h4>
            Your Lists<span className="text-muted">({lists.length})</span>
          </h4>
          <h4 onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
            {this.state.isOpen ? (
              <i className="far fa-caret-square-up"></i>
            ) : (
              <i className="fas fa-caret-square-down"></i>
            )}
          </h4>
        </div>
        {this.state.isOpen &&
          (lists.length ? (
            lists.map((eachList) => {
              return (
                <div key={eachList._id}>
                  <SidebarItems
                    list={eachList}
                    deleteList={this.deleteList}
                    selectedListIndex={selectedListIndex}
                    selectList={this.selectList}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-muted ml-2">No Lists</p>
          ))}
      </div>
    );
  }
}

export default Sidebar;
