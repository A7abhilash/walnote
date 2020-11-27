import React from "react";
import { useState } from "react";
import NotesApp from "./NoteTaking/NotesApp";
import Profile from "./Profile";
import SelectOptions from "./SelectOptions";
import ListApp from "./ToDoList/ListApp";

function AuthSection({ LOGGEDINUSER }) {
  const [selectedOption, setSelectedOption] = useState("todos");

  const setSelection = (id) => {
    setSelectedOption(id);
  };

  const switchOptions = () => {
    switch (selectedOption) {
      case "todos":
        return <ListApp userId={LOGGEDINUSER.UID} />;
      case "notes":
        return <NotesApp userId={LOGGEDINUSER.UID} />;
      case "profile":
        return <Profile LOGGEDINUSER={LOGGEDINUSER} />;
      default:
        return <ListApp userId={LOGGEDINUSER.UID} />;
    }
  };

  return (
    <React.Fragment>
      <header className="bg-light pt-1 pb-0 text-center">
        <h1 id="header">
          <i className="fas fa-file-word"></i> Walnote
        </h1>
        <SelectOptions
          setSelection={setSelection}
          selectedOption={selectedOption}
        />
      </header>
      {switchOptions()}
    </React.Fragment>
  );
}

export default AuthSection;
