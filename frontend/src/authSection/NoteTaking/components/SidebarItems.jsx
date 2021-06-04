import React from "react";

function SidebarItems({ note, deleteNote, selectedNoteIndex, selectNote }) {
  return selectedNoteIndex === note._id ? (
    <div
      key={note._id}
      className="row border-bottom border-secondary mx-1 pt-1 align-items-center"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="col-10">
        <h5 className="noteName" onClick={() => selectNote(note)}>
          {note.noteName}
        </h5>
      </div>
      <div className="col-2 pt-1">
        <p className="removeIcon" onClick={() => deleteNote(note)}>
          <i className="fas fa-trash"></i>
        </p>
      </div>
    </div>
  ) : (
    <div
      key={note._id}
      className="row border-bottom border-secondary mx-1 pt-1 align-items-center"
    >
      <div className="col-10">
        <h5 className=" noteName" onClick={() => selectNote(note)}>
          {note.noteName}
        </h5>
      </div>
      <div className="col-2 pt-1">
        <p onClick={() => deleteNote(note)} className="removeIcon">
          <i className="fas fa-trash"></i>
        </p>
      </div>
    </div>
  );
}

export default SidebarItems;
