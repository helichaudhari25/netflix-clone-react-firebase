import { useAuth } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.email.charAt(0).toUpperCase()}
        </div>

        <h1 className="profile-title">My Profile</h1>

        <div className="profile-info">
          <div className="info-row">
            <span>Email</span>
            <p>{user.email}</p>
          </div>

          <div className="info-row">
            <span>User ID</span>
            <p>{user.uid}</p>
          </div>
        </div>

        <button className="profile-btn">Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;
