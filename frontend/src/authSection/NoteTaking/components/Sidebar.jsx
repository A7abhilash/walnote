import React, { Component } from "react";
import SidebarItems from "./SidebarItems";

export class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteName: "",
      isOpen: false,
    };
  }

  selectNote = (note) => {
    this.props.selectNote(note);
  };

  addNewNote = () => {
    // console.log(this.state.listName);
    if (this.state.noteName) {
      this.props.addNewNote(this.state.noteName);
      this.setState({
        noteName: "",
        isOpen: true,
      });
    }
  };

  deleteNote = (note) => {
    if (window.confirm(`Are you sure to delete note: ${note.noteName}`)) {
      this.props.deleteNote(note);
    }
  };

  render() {
    const { notes, selectedNoteIndex } = this.props;
    return (
      <div>
        <div className="mt-3">
          <input
            type="text"
            className="form-control m-2"
            placeholder="Add New Note"
            value={this.state.noteName}
            onChange={(event) =>
              this.setState({ noteName: event.target.value })
            }
          />
          <button
            className="btn btn-primary m-2"
            onClick={this.addNewNote}
            disabled={this.props.loading}
          >
            Add Note
          </button>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <h4>
            Your Notes<span className="text-muted">({notes.length})</span>
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
          (notes.length ? (
            notes.map((eachNote) => {
              return (
                <div key={eachNote._id}>
                  <SidebarItems
                    note={eachNote}
                    deleteNote={this.deleteNote}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-muted ml-2">No Notes</p>
          ))}
      </div>
    );
  }
}

export default Sidebar;
