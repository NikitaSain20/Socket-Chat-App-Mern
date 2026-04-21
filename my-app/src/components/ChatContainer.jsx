import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import MessageSkeleton from "./skeltons/MessageSkelton";

const ChatContainer = () => {
  const {
    messages,
    users,
    typingUsers,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    subscribeToTyping,
    unsubscribeFromTyping,
    sendMessage,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [incomingCalls, setIncomingCalls] = useState([]);

  useEffect(() => {
    if (!selectedUser?._id) return;
    subscribeToMessages();
    subscribeToTyping();
    return () => {
      unsubscribeFromMessages();
      unsubscribeFromTyping();
    };
  }, [selectedUser?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const calls = messages.filter(
      (msg) =>
        msg.text?.includes("/videoCall?roomID=") &&
        msg.senderId !== authUser._id
    );
    const timeout = setTimeout(() => {
      setIncomingCalls(Array.from(new Map(calls.map((c) => [c._id, c])).values()));
    }, 0);
    return () => clearTimeout(timeout);
  }, [messages, authUser._id]);

  const handleDeclineCall = (message) => {
    setIncomingCalls((prev) => prev.filter((c) => c._id !== message._id));
    sendMessage({
      text: `📞 ${authUser.name || "user"} declined the call.`,
      senderId: authUser._id,
      receiverId: message.senderId,
      type: "callDeclined",
      createdAt: new Date().toISOString(),
    });
  };

  const handleRemoveCall = (id) => {
    setIncomingCalls((prev) => prev.filter((c) => c._id !== id));
  };

  const typingUserNames = Object.keys(typingUsers)
    .filter((id) => id !== authUser._id)
    .map((id) => users.find((u) => u._id === id)?.name)
    .filter(Boolean);

  const getMessageDateLabel = (dateStr) => {
    const msgDate = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const sameDay = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (sameDay(msgDate, today)) return "Today";
    if (sameDay(msgDate, yesterday)) return "Yesterday";
    return msgDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isMessagesLoading) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  const uniqueMessages = Array.from(
    new Map(messages.map((m) => [m._id, m])).values()
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ChatHeader />

      {/* Messages */}
      <div className="mc-messages-area">
        {uniqueMessages.map((message, index) => {
          const prevMessage = uniqueMessages[index - 1];
          const showDateBadge =
            !prevMessage ||
            getMessageDateLabel(prevMessage.createdAt) !==
              getMessageDateLabel(message.createdAt);

          const isLast = index === uniqueMessages.length - 1;
          const isOut = message.senderId === authUser._id;
          const isCall = message.text?.includes("/videoCall?roomID=");
          const isIncomingCall = incomingCalls.some((c) => c._id === message._id);

          return (
            <div key={message._id}>
              {/* Date Badge */}
              {showDateBadge && (
                <div className="mc-date-badge">
                  <span>{getMessageDateLabel(message.createdAt)}</span>
                </div>
              )}

              {/* Message Row */}
              <div
                ref={isLast ? messageEndRef : null}
                className={`mc-msg-row${isOut ? " out" : ""}`}
              >
                {/* Incoming avatar */}
                {!isOut && (
                  <div className="mc-msg-avatar">
                    <img
                      src={
                        users.find((u) => u._id === message.senderId)?.profilePic ||
                        authUser.profilePic
                      }
                      alt="Avatar"
                    />
                  </div>
                )}

                {/* Bubble + time */}
                <div className="mc-msg-content">
                  <div className={`mc-bubble${isOut ? " out" : " in"}`}>
                    {/* Call message */}
                    {isCall ? (
                      isOut ? (
                        <div className="mc-call-bubble">
                          <p>📞 You started a call</p>
                        </div>
                      ) : isIncomingCall ? (
                        <div className="mc-call-bubble">
                          <p>📞 Incoming Call</p>
                          <div className="mc-call-actions">
                            <a
                              href={message.text}
                              target="_self"
                              className="mc-call-join-btn"
                              onClick={() => handleRemoveCall(message._id)}
                            >
                              Join
                            </a>
                            <button
                              onClick={() => handleDeclineCall(message)}
                              className="mc-call-decline-btn"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      ) : null
                    ) : message.type === "callDeclined" ? (
                      <p style={{ textAlign: "center", fontSize: 13, opacity: 0.7 }}>
                        {message.text}
                      </p>
                    ) : (
                      <>
                        {message.text && <p>{message.text}</p>}
                        {message.image && (
                          <img src={message.image} alt="Sent image" />
                        )}
                      </>
                    )}
                  </div>

                  <time className="mc-msg-time">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Typing indicator */}
      {typingUserNames.length > 0 && (
        <div className="mc-typing">
          <div className="mc-typing-dots">
            <span /><span /><span />
          </div>
          <span>
            {typingUserNames.join(", ")}{" "}
            {typingUserNames.length === 1 ? "is" : "are"} typing
          </span>
        </div>
      )}

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
