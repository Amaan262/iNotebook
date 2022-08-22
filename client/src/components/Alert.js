import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Alert() {
  const capitalize = (word) => {
    // if (word === "danger") {
    //   word = "Error";
    // }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const context = useContext(noteContext);
  const { alert } = context;
  

  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`position-absolute w-100 text-center alert alert-${alert.type}`}
          role="alert"
        >
         {/* <strong>{capitalize(alert.type)}</strong> :: */}
          <strong>{capitalize(alert.msg)}</strong>
        </div>
      )}
    </div>
  );
}
