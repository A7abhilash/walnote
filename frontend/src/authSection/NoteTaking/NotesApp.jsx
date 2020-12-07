import React, { Component } from "react";
//CSS
import "./../../App.css";
// components
import Sidebar from "./components/Sidebar";
import Note from "./components/Note";

export class NotesApp extends Component {
  constructor(props) {
    super(props);

    this.selectNote = this.selectNote.bind(this);

    this.state = {
      notes: [],
      selectedNoteIndex: null,
      selectedNote: null,
      loading: true,
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    fetch(`/notes/${this.props.userId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          notes: data,
          loading: false,
        });
      })
      .catch((error) => {
        // console.log(error);
        alert("505 Error");
        this.setState({ loading: false });
      });
  };

  selectNote = (note) => {
    this.setState({
      selectedNote: note,
      selectedNoteIndex: note._id,
    });
  };

  addNewNote = (val) => {
    this.setState({ loading: true });
    let note = {
      noteName: val,
      note: "<h2>Start writing your notes...</h2>",
      userId: this.props.userId,
    };
    // console.log(list);
    fetch(`/notes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          notes: [...this.state.notes, data],
          loading: false,
        });
        this.selectNote(data);
      })
      .catch((error) => {
        // console.log(error)
        alert("505 Error");
        this.setState({ loading: false });
      });
  };

  deleteNote = (note) => {
    this.setState({ loading: true });
    fetch(`/notes/${note._id}`, {
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
          notes: this.state.notes.filter(
            (eachNote) => eachNote._id !== data.id
          ),
          loading: false,
        });
        if (this.state.selectedNoteIndex === data.id) {
          this.setState({
            selectedNote: null,
            selectedNoteIndex: null,
          });
        }
      })
      .catch((error) => {
        // console.log(error)
        alert("505 Error");
        this.setState({ loading: false });
      });
  };

  saveNote = (note) => {
    this.setState({ loading: true });
    note["userId"] = this.props.userId;
    fetch(`/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.updatedNote._id === note.id) {
          this.setState({
            notes: data.allNotes,
            loading: false,
          });
          window.alert("List saved");
          this.selectNote(data.updatedNote);
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
          <div className="col-md-4 ">
            <Sidebar
              notes={this.state.notes}
              selectedNoteIndex={this.state.selectedNoteIndex}
              addNewNote={this.addNewNote}
              deleteNote={this.deleteNote}
              selectNote={this.selectNote}
              loading={this.state.loading}
            />
          </div>
          <div className="col-md-6 mx-auto">
            {this.state.selectedNote ? (
              <Note
                selectedNote={this.state.selectedNote}
                saveNote={this.saveNote}
                loading={this.state.loading}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default NotesApp;
