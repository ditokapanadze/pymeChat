import React, { useState, useEffect, useRef } from "react";
import db, { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";
import "./signup.css";

function Signup() {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [signError, setSignError] = useState("");

  let history = useHistory();
  const { signup, login } = useAuth();

  // registering a user
  const registerHandler = async (e) => {
    e.preventDefault();
    if (password === repassword) {
      try {
        setErr("");
        setLoading(true);
        const res = await signup(email, password);
        db.collection("USERS")
          .doc(res.user.uid)
          .set({
            email,
            username,
            id: res.user.uid,
          })
          .catch((err) => {
            console.log(err);
          });
        // give user name

        await res.user.updateProfile({
          displayName: username,
        });
        history.push("/home");

        setSignError("");
      } catch (err) {
        setSignError(err.message);
      }
    } else {
      return setErr("passwords don't match");
    }
    setLoading(false);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push("/home");
      setSignError("");
    } catch (err) {
      setSignError(err.message);
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        history.push("/home");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // delete inputs

  const handleSignClick = () => {
    setEmail("");
    setPassword("");
    setRepassword("");
    setUsername("");
    setUsername("");
    setSignError("");
    setShowSignup(false);
  };
  const handleSignUpClick = () => {
    setEmail("");
    setPassword("");
    setRepassword("");
    setUsername("");
    setSignError("");
    setUsername("");
    setShowSignup(true);
  };

  return (
    <div className="signup__container">
      {showSignup ? (
        <form
          className="register__form"
          type="submit"
          onSubmit={registerHandler}
        >
          <input
            className="signup__input"
            required
            value={email}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {signError && <p style={{ color: "red" }}>{signError}</p>}
          <input
            className="signup__input"
            required
            value={username}
            placeholder="User Name"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            className="signup__input"
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && <span className="error">{err} </span>}

          <input
            className="signup__input"
            required
            vaule={repassword}
            placeholder="repeat password"
            type="password"
            onChange={(e) => setRepassword(e.target.value)}
          />
          <button type="submit" className="signup__btn" disabled={loading}>
            {" "}
            Create an account
          </button>
          <p className="singin__link" onClick={handleSignClick}>
            Already a memmber?
          </p>
        </form>
      ) : (
        <form className="signup__form" type="submit" onSubmit={loginHandler}>
          <input
            className="signup__input"
            required
            value={email}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {signError && <p style={{ color: "red" }}>{signError}</p>}
          <input
            className="signup__input"
            required
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signin__btn" type="submit">
            Sign In
          </button>
          <p className="signup_link" onClick={handleSignUpClick}>
            Don't have account?
          </p>
        </form>
      )}
    </div>
  );
}

export default Signup;
