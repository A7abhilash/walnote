import React from "react";

function SidebarItems({ list, deleteList, selectedListIndex, selectList }) {
  return selectedListIndex === list._id ? (
    <div
      key={list._id}
      className="row border-bottom border-secondary mx-1 pt-1 align-items-center"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="col-10">
        <h5 className="listName" onClick={() => selectList(list)}>
          {list.listName}
        </h5>
      </div>
      <div className="col-2 pt-1">
        <p className="removeIcon" onClick={() => deleteList(list)}>
          <i className="fas fa-trash"></i>
        </p>
      </div>
    </div>
  ) : (
    <div
      key={list._id}
      className="row border-bottom border-secondary mx-1 pt-1 align-items-center"
    >
      <div className="col-10">
        <h5 className="listName" onClick={() => selectList(list)}>
          {list.listName}
        </h5>
      </div>
      <div className="col-2 pt-1">
        <p onClick={() => deleteList(list)} className="removeIcon">
          <i className="fas fa-trash"></i>
        </p>
      </div>
    </div>
  );
}

export default SidebarItems;
