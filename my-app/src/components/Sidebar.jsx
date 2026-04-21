import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";
import SidebarSkeleton from "./skeltons/SidebarSkelton";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    getUnreadCounts,
    unreadCounts,
    getMessages,
    clearUnreadForUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    (async () => {
      await getUsers();
      await getUnreadCounts();
    })();
  }, []);

  useEffect(() => {
    subscribeToMessages();
    return () => { unsubscribeFromMessages(); };
  }, [selectedUser]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="mc-sidebar">
      {/* Header */}
      <div className="mc-sidebar-head">
        <div className="mc-sidebar-headtitle">
          <Users size={17} />
          <span>Contacts</span>
        </div>

        <div className="mc-sidebar-filter">
          <label className="mc-filter-toggle">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            Show online only
          </label>
          <span className="mc-online-badge">{onlineUsers.length - 1} online</span>
        </div>
      </div>

      {/* Contacts */}
      <div className="mc-contacts-list">
        {filteredUsers.map((user) => {
          const isActive = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);
          const unread = unreadCounts?.[user._id];

          return (
            <button
              key={user._id}
              className={`mc-contact-item${isActive ? " active" : ""}`}
              onClick={async () => {
                setSelectedUser(user);
                clearUnreadForUser(user._id);
                await getMessages(user._id);
              }}
            >
              {/* Avatar */}
              <div className="mc-contact-avatar-wrap">
                <div className="mc-contact-avatar">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.fullName} />
                  ) : (
                    user.fullName?.charAt(0).toUpperCase()
                  )}
                </div>
                {isOnline && <span className="mc-online-dot" />}
              </div>

              {/* Info */}
              <div className="mc-contact-info">
                <div className="mc-contact-name">{user.fullName}</div>
                <div className={`mc-contact-status${isOnline ? " online" : ""}`}>
                  {isOnline ? "● Online" : "Offline"}
                </div>
              </div>

              {/* Unread badge */}
              {unread > 0 && (
                <span className="mc-unread-badge">{unread > 9 ? "9+" : unread}</span>
              )}
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="mc-empty-state">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
