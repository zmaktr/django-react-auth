import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  let { loggedIn, getNotes, notes, handleNoteOperation, handleNoteSubmit } =
    useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <p>You are inside the homePage</p>
      <p>Only Logged in users can access this</p>
      <p>You can add new notes here</p>
      <form onSubmit={handleNoteSubmit}>
        <textarea type="textarea" name="body" placeholder="Add note"></textarea>
        <br></br>
        <input type="submit" />
      </form>

      {notes.map((note) => (
        <form onSubmit={(e) => handleNoteOperation(e, note)} key={note.id}>
          <input name="note" defaultValue={note.body} />
          <button type="submit" name="update" value="update">
            Update
          </button>
          <button type="submit" name="delete" value="delete">
            Delete
          </button>
        </form>
      ))}
    </div>
  );
};

export default HomePage;
