import React from "react";

const NotValidateToChat = ({ setIsValidateToChat, setUsername }) => {
  return (
    <form
      className="flex gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const username = e.target[0].value;

        if (username.trim().includes(" ")) return;
        if (username.length < 2) return;

        setUsername(username);
        setIsValidateToChat(true);
      }}
    >
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        required
        // value={username}
        placeholder="username"
        className="border outline-0 rounded px-2.5 py-2 w-1/3"
        // onChange={(e) => setUsername(e.target.value)}
      />
      <button className="bg-green-700 text-white px-8 py-2.5 rounded-full text-sm">
        Send
      </button>
    </form>
  );
};

export default NotValidateToChat;
