import React from "react";

function SignupPage() {
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(e.target);
    let response = await fetch("http://localhost:8000/api/create-user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log(data);
  };

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
