import React, { Component } from "react";
//CSS
import "./../../App.css";
// components
import Sidebar from "./components/Sidebar";
import Note from "./components/Note";

//Backend URL
const B_URL = `http://localhost:7781`;

export class NotesApp extends Component {
  constructor(props) {
    super(props);

    this.selectNote = this.selectNote.bind(this);

    this.state = {
      notes: [],
      selectedNoteIndex: null,
      selectedNote: null,
    };
  }

  componentDidMount = () => {
    fetch(`${B_URL}/notes/${this.props.userId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          notes: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectNote = (note) => {
    this.setState({
      selectedNote: note,
      selectedNoteIndex: note._id,
    });
  };

  addNewNote = (val) => {
    let note = {
      noteName: val,
      note: "<h2>Start your notes...</h2>",
      userId: this.props.userId,
    };
    // console.log(list);
    fetch(`${B_URL}/notes`, {
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
        });
        this.selectNote(data);
      })
      .catch((error) => console.log(error));
  };

  deleteNote = (note) => {
    fetch(`${B_URL}/notes/${note._id}`, {
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
        });
        if (this.state.selectedNoteIndex === data.id) {
          this.setState({
            selectedNote: null,
            selectedNoteIndex: null,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  saveNote = (note) => {
    fetch(`${B_URL}/notes/${note.id}`, {
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
          window.alert("List saved");
          this.setState({
            notes: data.allNotes,
          });
          this.selectNote(data.updatedNote);
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-3 mx-auto">
            <Sidebar
              notes={this.state.notes}
              selectedNoteIndex={this.state.selectedNoteIndex}
              addNewNote={this.addNewNote}
              deleteNote={this.deleteNote}
              selectNote={this.selectNote}
            />
          </div>
          <div className="col-md-8 mx-auto">
            {this.state.selectedNote ? (
              <Note
                selectedNote={this.state.selectedNote}
                saveNote={this.saveNote}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default NotesApp;
