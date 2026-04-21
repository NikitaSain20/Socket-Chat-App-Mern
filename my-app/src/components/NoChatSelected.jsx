import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="mc-no-chat">
      <div className="mc-no-chat-icon">
        <MessageSquare size={32} color="var(--mc-primary)" />
      </div>
      <h2>Welcome to MyChat!</h2>
      <p>Select a conversation from the sidebar to start chatting</p>
    </div>
  );
};

export default NoChatSelected;
