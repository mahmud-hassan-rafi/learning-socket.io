import React, { useRef } from "react";
import { socketConnection } from "../socket";
import { useState } from "react";
import { useEffect } from "react";
import ChatList from "./ChatList";

const Chat = ({ setIsConnected, username }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketConnection();
    socketRef.current.auth = { username };
    socketRef.current.connect();

    const socket = socketRef.current;

    const onConnect = () => {
      console.log("Connected:", socket.id);
      setIsConnected(true); // ✅ এখানে set করবি
    };

    const onDisconnect = (reason) => {
      console.log("Disconnected:", reason);
      setIsConnected(false); // ✅ এখানে reset
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [setIsConnected, username]); // ✅ empty dependency

  useEffect(() => {
    const socket = socketRef.current;

    socket.on("chat:recieve", (data, callback) => {
      console.log(data);
      setChats((prev) => [...prev, data]);

      callback({ status: "success" });
    });

    return () => {
      socket.off("chat:recieve");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message) return;

    socketRef.current.emit("chat:send", message, (res) => {
      console.log(res);
      setMessage("");
    });
  };

  return (
    <div className="relative w-125 border h-[87vh] flex flex-col gap-1 overflow-hidden">
      <img
        src="./new-theme-whatsapp.jpg"
        alt=""
        className="absolute -z-1 size-full object-cover object-center "
      />
      <ChatList chats={chats} username={username} />
      <form
        onSubmit={handleSendMessage}
        className="flex gap-4 w-full mb-2 px-2"
      >
        <input
          type="text"
          placeholder="Message"
          required
          className="border-0 outline-0 shadow-md rounded-full px-4 py-2 w-full bg-white "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-green-700 text-white px-6 py-2.5 rounded-full text-sm">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
