import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function SignupPage() {
  let { handleSignup } = useContext(AuthContext);

  return (
    <div>
      <p>
        Please fill in to <b>signup</b> a new user
      </p>
      <form onSubmit={handleSignup}>
        <input type="text" name="username" placeholder="Username" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="on"
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SignupPage;
