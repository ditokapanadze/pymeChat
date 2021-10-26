import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import "./chatBox.css";
import db from "../firebase";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";

function ChatBox({ id }) {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const { currentUser, logout } = useAuth();

  const scrollRef = useRef(null);
  let paramId = useParams();

  // sanding message ro detabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      try {
        const res = await db.collection("messages").add({
          text: message,
          sanderId: currentUser.uid,
          recieverId: id,
          messageId: uuidv4(),
          date: firebase.firestore.Timestamp.fromDate(new Date()),
        });

        setMessage("");
      } catch (err) {
        console.log(err);
      }
    }

    db.collection("USERS").doc(currentUser.uid).get("");
  };

  // Fetching messages from database
  useEffect(() => {
    db.collection("messages")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        let messages = [];
        snapshot.docs.map((doc) => {
          if (
            doc.data().sanderId === currentUser.uid ||
            doc.data().recieverId === currentUser.uid
          ) {
            messages.push(doc.data());
          }
        });

        setSentMessages(messages);
      });
    setMessage("");
  }, [id]);

  // auto scroll down
  const scrollBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollBottom();
  }, [sentMessages]);

  // deletemessage sent by you
  const handleDelete = (e) => {
    db.collection("messages")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.data().messageId === e && doc.ref.delete();
        });
      });
  };

  return (
    <div className="chatbox">
      <div className="message__box">
        <div className="chat__body">
          {sentMessages.map((message) =>
            message.sanderId === paramId.id ||
            message.recieverId === paramId.id ? (
              <div
                key={message.messageId}
                className={`chat__item ${
                  message.sanderId === currentUser.uid ? "sent" : "recieved"
                }`}
              >
                {currentUser.uid === message.sanderId && (
                  <button
                    className="delete__btn"
                    onClick={() => handleDelete(message.messageId)}
                  >
                    Delete message{" "}
                  </button>
                )}

                <p ref={scrollRef} key={message.messageId}>
                  {message.text}
                </p>
                {/* {recieverUser.id === paramId.id && (
                  <p>{recieverUser.username}</p>
                )} */}
                <p className="time">
                  {new Date(message.date?.nanoseconds / 100000)
                    .toString()
                    .slice(0, 25)}
                  {/* {new FormData(message.date)} */}
                </p>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>

      <form className="chat__form" type="submit" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          value={message}
          className="chat__input"
          placeholder="whrite a massage"
          onChange={(e) => setMessage(e.target.value)}
        />
        <i className="fas fa-paper-plane" onClick={handleSubmit}></i>
        <button style={{ display: "none" }} type="submit"></button>
      </form>
    </div>
  );
}

export default ChatBox;
