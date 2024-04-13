import { useStateProvider } from "@/context/StateContext";
import React from "react";

const ChatContainer = () => {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();
  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar ">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0   ">
        <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
          <div className="flex w-full">
            <div className="flex flex-col justify-end w-full gap-1 overflow-auto ">
              {messages?.map((message, index) => (
                <div
                  key={message.id}
                  className={` flex ${
                    message.senderId === currentChatUser.id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {console.log(currentChatUser, "message, ", message)}
                  {message.type === "text" && (
                    <div
                      className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] 
                    ${
                      message.senderId === currentChatUser.id
                        ? "bg-incoming-background"
                        : "bg-outgoing-background "
                    }`}
                    >
                      <span className="break-all">{message.message} </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
