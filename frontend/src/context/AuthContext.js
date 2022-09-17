import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Create a context
const AuthContext = createContext();
export default AuthContext;

// Create a provider
export const AuthProvider = ({ children }) => {
  let [loggedIn, setLoggedIn] = useState(false);

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let [loading, setLoading] = useState(false);

  const history = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    let response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history("/");
      setLoggedIn(true);
      console.log("sucessAuthContent promise resolve");
    } else {
      alert("Something went wong | incorrect credentials");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history("/login");
    setLoggedIn(false);
  };

  let updateToken = async () => {
    console.log("update token called");
    let response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8000/api/create-user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      loginUser(e);
    } else alert(data.username + " Please try another username.");
  };

  ///////
  const getNotes = async () => {
    let response = await fetch("http://localhost:8000/api/notes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setNotes(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
    console.log(data);
  };
  /////
  let [notes, setNotes] = useState([]);

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    handleSignup: handleSignup,
    notes: notes,
    getNotes: getNotes,
    loggedIn: loggedIn,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let fourandHalfMinutes = 1000 * 60 * 4.5;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourandHalfMinutes);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
