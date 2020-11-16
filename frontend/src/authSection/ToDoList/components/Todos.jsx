import React from "react";

function Todos({ todos, editTodo, deleteTodo, checkTodo, check }) {
  return todos.map((todo, index) => {
    return (
      <div key={index} className="bg-light m-1 px-2 align-items-center d-flex">
        <div className="d-flex ml-2 p-1">
          <input
            type="checkbox"
            checked={check[index]}
            className="mt-1 mr-1 checked"
            onChange={() => checkTodo(index)}
          />
          <h6>{todo}</h6>
        </div>
        <div className="d-flex ml-auto pt-2">
          <p className="editIcon" onClick={() => editTodo(todo, index)}>
            <i className="fas fa-edit"></i>
          </p>
          <p
            className="removeIcon ml-2"
            onClick={() => deleteTodo(todo, index)}
          >
            <i className="fas fa-trash"></i>
          </p>
        </div>
      </div>
    );
  });
}

export default Todos;
