import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  let { loggedIn, getNotes, notes, authTokens } = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNoteOperation = async (e, note) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "delete") {
      let response = await fetch(
        `http://localhost:8000/api/delete-notes/${note.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        getNotes();
        console.log(data);
      } else {
        alert("There is some problem with your request");
        console.log(note.id);
      }
    }

    //////////////////////////
    if (e.nativeEvent.submitter.name === "update") {
      let response = await fetch(
        `http://localhost:8000/api/update-notes/${note.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            body: e.target.note.value,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        getNotes();
        console.log("PATCH request success");
      } else {
        getNotes();
        alert("PUT request failed", data);
      }
    }
  };
  //////////////////////////////////

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8000/api/create-notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        body: e.target.body.value,
      }),
    });

    let data = await response.json();
    if (response.status === 200) {
      getNotes();
    } else alert(data.body);
    console.log(data);
  };

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
