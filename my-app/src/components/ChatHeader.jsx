import { Video, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";

const generateRoomID = (len = 6) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < len; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, sendMessage } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const nav = useNavigate();

  const isOnline = onlineUsers.includes(selectedUser?._id);

  const handleVideoCall = () => {
    if (!selectedUser) return;
    const roomID = generateRoomID();
    const callLink = `${window.location.origin}/videoCall?roomID=${roomID}`;
    sendMessage({ text: callLink });
    nav(`/videoCall?roomID=${roomID}`);
  };

  return (
    <div className="mc-chat-header">
      {/* Left: Avatar + Name */}
      <div className="mc-chat-header-left">
        <div className="mc-header-avatar-wrap">
          <div className="mc-header-avatar">
            <img src={selectedUser.profilePic} alt={selectedUser.fullName} />
          </div>
          {isOnline && <span className="mc-header-online-dot" />}
        </div>

        <div>
          <div className="mc-header-name">{selectedUser?.fullName}</div>
          <div className={`mc-header-status${isOnline ? " online" : ""}`}>
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="mc-chat-header-actions">
        <button
          className="mc-header-action-btn"
          onClick={handleVideoCall}
          title="Video call"
        >
          <Video size={18} />
        </button>
        <button
          className="mc-header-action-btn close"
          onClick={() => setSelectedUser(null)}
          title="Close chat"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
