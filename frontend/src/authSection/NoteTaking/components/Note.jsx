import React, { Component } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css"; // ES6

export class List extends Component {
  constructor(props) {
    super(props);

    this.handleNotesChange = this.handleNotesChange.bind(this);

    this.state = {
      noteName: "",
      note: "",
      id: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      noteName: this.props.selectedNote.noteName,
      id: this.props.selectedNote._id,
      note: this.props.selectedNote.note,
    });
  };

  componentDidUpdate = () => {
    if (this.state.id !== this.props.selectedNote._id) {
      this.setState({
        noteName: this.props.selectedNote.noteName,
        id: this.props.selectedNote._id,
        note: this.props.selectedNote.note,
      });
    }
  };

  handleNotesChange = (value) => {
    this.setState({
      note: value,
    });
  };

  saveNote = () => {
    let note = {
      noteName: this.state.noteName,
      id: this.state.id,
      note: this.state.note,
    };
    this.props.saveNote(note);
  };

  render() {
    return (
      <div className="mt-3">
        <div className="d-flex align-items-center bg-dark rounded mb-3 p-3">
          <input
            type="text"
            className="form-control bg-light"
            value={this.state.noteName ? this.state.noteName : ""}
            onChange={(event) =>
              this.setState({ noteName: event.target.value })
            }
          />
          <button
            className="btn-success btn ml-2"
            onClick={this.saveNote}
            disabled={this.props.loading}
          >
            <strong>Save</strong>
          </button>
        </div>
        <ReactQuill value={this.state.note} onChange={this.handleNotesChange} />
      </div>
    );
  }
}

export default List;
