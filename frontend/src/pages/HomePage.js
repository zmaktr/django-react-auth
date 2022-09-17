import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  let { loggedIn, getNotes, notes } = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNoteSubmit = () => {
    console.log("new note");
  };

  return (
    <div>
      <p>You are inside the homePage</p>
      <p>Only Logged in users can access this</p>
      <form onSubmit={handleNoteSubmit}>
        <textarea type="textarea" placeholder="Add note"></textarea>
        <br></br>
        <input type="submit" />
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
