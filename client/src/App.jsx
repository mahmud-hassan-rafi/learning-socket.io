// import React, { useState, useEffect } from "react";
// import { socket } from "./socket";

// function App() {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");
//   const [joined, setJoined] = useState(false);

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [typingUser, setTypingUser] = useState("");

//   // 👉 Join Room
//   const joinRoom = () => {
//     socket.connect();

//     socket.emit("join_room", { username, room }, (res) => {
//       if (res.status === "ok") {
//         setJoined(true);
//       }
//     });
//   };

//   // 👉 Send Message
//   const sendMessage = () => {
//     socket.emit("send_message", { message }, (res) => {
//       console.log(res);
//     });
//     setMessage("");
//   };

//   useEffect(() => {
//     // receive message
//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     // typing indicator
//     socket.on("typing", (user) => {
//       setTypingUser(user);
//       setTimeout(() => setTypingUser(""), 2000);
//     });

//     return () => {
//       socket.off("receive_message");
//       socket.off("typing");
//     };
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       {!joined ? (
//         <div>
//           <h2>Join Chat</h2>
//           <input
//             placeholder="Username"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input placeholder="Room" onChange={(e) => setRoom(e.target.value)} />
//           <button onClick={joinRoom}>Join</button>
//         </div>
//       ) : (
//         <div>
//           <h2>Room: {room}</h2>

//           <div
//             style={{
//               height: 300,
//               overflowY: "scroll",
//               border: "1px solid #ccc",
//             }}
//           >
//             {messages.map((msg, i) => (
//               <div key={i}>
//                 <strong>{msg.user}: </strong> {msg.message}
//               </div>
//             ))}
//           </div>

//           {typingUser && <p>{typingUser} is typing...</p>}

//           <input
//             value={message}
//             onChange={(e) => {
//               setMessage(e.target.value);
//               socket.emit("typing");
//             }}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import NotValidateToChat from "./components/NotValidateToChat";
import Chat from "./components/Chat";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [isValidateToChat, setIsValidateToChat] = useState(false);

  console.log(username);
  return (
    <div className="min-h-screen w-full flex p-6 flex-col gap-4 items-center">
      <div>Socket: {isConnected ? "Connected" : "Disconnected"}</div>

      {!isValidateToChat ? (
        <NotValidateToChat
          setIsValidateToChat={setIsValidateToChat}
          username={username}
          setUsername={setUsername}
        />
      ) : (
        <Chat setIsConnected={setIsConnected} username={username} />
      )}
    </div>
  );
};

export default App;
