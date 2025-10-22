import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import NoConversationPlaceholder from "./NoChatPlaceholder.jsx";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [getMessagesByUserId, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!selectedUser) {
    return <NoConversationPlaceholder />;
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8 ">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto">
            {messages.map((msg) => (
              <div
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
                key={msg._id}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && <p className="mt-2"> {msg.text} </p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
