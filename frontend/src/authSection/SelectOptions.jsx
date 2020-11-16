import React from "react";

function SelectOptions({ setSelection, selectedOption }) {
  const options = [
    {
      id: "todos",
      title: "fas fa-tasks",
      color: "warning",
    },
    {
      id: "notes",
      title: "fas fa-file-alt",
      color: "info",
    },
    {
      id: "profile",
      title: "fas fa-user",
      color: "success",
    },
  ];
  return (
    <div
      className="mx-auto my-2 d-flex justify-content-around bg-light pt-2 vw-100"
      style={{ maxWidth: "350px" }}
    >
      {options.map((option) =>
        option.id === selectedOption ? (
          <div
            key={option.id}
            className={`text-${option.color} icons border-bottom border-primary`}
          >
            <h3>
              <i className={option.title}></i>
            </h3>
          </div>
        ) : (
          <div
            key={option.id}
            onClick={() => setSelection(option.id)}
            className="icons text-dark"
          >
            <h3>
              <i className={option.title}></i>
            </h3>
          </div>
        )
      )}
    </div>
  );
}

export default SelectOptions;
