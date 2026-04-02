import React, { useEffect, useRef } from "react";

const ChatList = ({ chats, username }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;

    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <ul
      className="flex flex-col gap-1 w-full h-full overflow-y-auto p-4"
      ref={containerRef}
    >
      {chats.map((chat, idx) => {
        const isMyChat = username === chat.sendedBy;
        return (
          <div
            key={idx}
            className={`w-full flex gap-1 ${isMyChat ? "justify-end" : chat.sendedBy === "system" ? "justify-center" : "jusfify-start"}`}
          >
            <li
              className={`list-none p-2 rounded-md shadow ${isMyChat ? "bg-lime-200" : chat.sendedBy === "system" ? "text-xs bg-white py-1" : "text-base bg-white"} w-max`}
            >
              {chat?.sendedBy} : {chat.msg}
            </li>
          </div>
        );
      })}

      <div ref={bottomRef}></div>
    </ul>
  );
};

export default ChatList;
