import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="mc-profile-page">
      <div className="mc-profile-card">
        <div className="mc-profile-inner">
          {/* Banner */}
          <div className="mc-profile-banner" />

          <div className="mc-profile-body">
            {/* Avatar */}
            <div className="mc-profile-avatar-wrap">
              <div className="mc-profile-avatar">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`mc-profile-cam-btn${isUpdatingProfile ? " uploading" : ""}`}
                >
                  <Camera size={13} />
                  <input
                    type="file"
                    id="avatar-upload"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>

            <div className="mc-profile-name">{authUser?.fullName}</div>
            <div className="mc-profile-upload-hint">
              {isUpdatingProfile
                ? "Uploading…"
                : "Click the camera icon to update your photo"}
            </div>

            {/* Fields */}
            <div>
              <div className="mc-profile-field-label">
                <User size={13} />
                Full Name
              </div>
              <div className="mc-profile-field-value">{authUser?.fullName}</div>

              <div className="mc-profile-field-label">
                <Mail size={13} />
                Email Address
              </div>
              <div className="mc-profile-field-value">{authUser?.email}</div>
            </div>

            <hr className="mc-profile-divider" />

            {/* Account info */}
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--mc-text)", marginBottom: 12 }}>
              Account Information
            </div>
            <div>
              <div className="mc-profile-info-row">
                <span className="mc-profile-info-label">Member Since</span>
                <span className="mc-profile-info-value">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="mc-profile-info-row">
                <span className="mc-profile-info-label">Account Status</span>
                <span className="mc-profile-info-value active">● Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;