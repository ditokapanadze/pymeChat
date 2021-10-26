import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./home.css";
import { useAuth } from "../context/AuthContext";
import "./home.css";
import ChatBox from "./ChatBox";
import { useParams, useHistory } from "react-router-dom";
function Home() {
  const [userList, setUserLists] = useState();
  const { currentUser, logout } = useAuth();
  const [id, setId] = useState("");

  let paramId = useParams();
  let history = useHistory();

  // fetching users
  useEffect(() => {
    const list = [];
    db.collection("USERS")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          users.push(data);
        });
        setUserLists(users);
      });
  }, []);

  const logOut = (e) => {
    logout();
  };

  const handleClick = (e) => {
    history.push(`/home/${e}`);
    setId(e);
  };

  return (
    <div className="home__container">
      <div className="header">
        <p>Hello, {currentUser?.displayName}</p>
        <button onClick={logOut} className="sign__out">
          {" "}
          Sign Out
        </button>
      </div>
      <div className="main__content">
        <div className="users__container">
          {/* {userList?.map((user) => (
            <p className="user">{user.username}</p>
          ))} */}
          {userList?.map(
            (user) =>
              user.id !== currentUser.uid && (
                <p
                  key={user.id}
                  className={`user ${user.id === paramId.id ? "active" : ""}`}
                  onClick={() => handleClick(user.id)}
                >
                  {user.username}
                </p>
              )
          )}
        </div>

        <ChatBox id={id} />
      </div>
    </div>
  );
}

export default Home;
