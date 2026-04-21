import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const typingTimeout = useRef(null);
  const isTyping = useRef(false);

  const { sendMessage, selectedUser } = useChatStore();
  const { socket, authUser } = useAuthStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      socket?.emit("stopTyping", {
        senderId: authUser._id,
        receiverId: selectedUser._id,
      });
      isTyping.current = false;
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleTyping = (e) => {
    const value = e.target.value;
    setText(value);

    if (!socket || !selectedUser) return;

    if (!isTyping.current && value.trim()) {
      socket.emit("typing", {
        senderId: authUser._id,
        receiverId: selectedUser._id,
      });
      isTyping.current = true;
    }

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: authUser._id,
        receiverId: selectedUser._id,
      });
      isTyping.current = false;
    }, 1000);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout.current);
      if (isTyping.current && socket && selectedUser) {
        socket.emit("stopTyping", {
          senderId: authUser._id,
          receiverId: selectedUser._id,
        });
      }
    };
  }, [socket, selectedUser, authUser]);

  const canSend = text.trim() || imagePreview;

  return (
    <div className="mc-input-bar">
      {/* Image preview */}
      {imagePreview && (
        <div className="mc-img-preview">
          <div className="mc-img-preview-wrap">
            <img src={imagePreview} alt="Preview" />
            <button
              type="button"
              onClick={removeImage}
              className="mc-img-preview-remove"
            >
              <X size={10} />
            </button>
          </div>
        </div>
      )}

      {/* Input row */}
      <form onSubmit={handleSendMessage}>
        <div className="mc-input-row">
          <input
            type="text"
            className="mc-text-input"
            placeholder="Type a message…"
            value={text}
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <button
            type="button"
            className={`mc-attach-btn${imagePreview ? " has-image" : ""}`}
            onClick={() => fileInputRef.current?.click()}
            title="Attach image"
          >
            <Image size={18} />
          </button>

          <button
            type="submit"
            className="mc-send-btn"
            disabled={!canSend}
            title="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
