import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

import { useAuth } from "../context/AuthContext";

import "../styles/Profile.css";

const Profile = () => {
  const { user } = useAuth();

  const userInitials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString(
      "en-JP",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const memberSince = formatDate(user?.createdAt);
  const lastUpdated = formatDate(user?.updatedAt);

  return (
    <>
      <PageHeader
        title="👤 Profile"
        subtitle="View your Budget Buddy account information."
      />

      <section className="profile-hero">
        <div className="profile-page-avatar">
          {userInitials}
        </div>

        <div className="profile-hero-identity">
          <h2>{user?.name || "User"}</h2>
          <p>{user?.email || "No email available"}</p>

          <div className="profile-badges">
            <span className="profile-status-badge">
              <span className="status-dot" />
              Active
            </span>

            <span className="profile-member-badge">
              📅 Member since {memberSince}
            </span>
          </div>
        </div>
      </section>

      <div className="profile-view-grid">
        <Card className="profile-card profile-details-card">
          <div className="profile-card-header">
            <div className="profile-card-icon">
              👤
            </div>

            <div>
              <h2>Account Details</h2>

              <p>
                Information associated with your Budget
                Buddy account.
              </p>
            </div>
          </div>

          <div className="profile-detail-list">
            <div className="profile-detail-row">
              <div className="profile-detail-label">
                <span className="profile-detail-icon">
                  👤
                </span>

                <span>Full Name</span>
              </div>

              <strong>
                {user?.name || "Not available"}
              </strong>
            </div>

            <div className="profile-detail-row">
              <div className="profile-detail-label">
                <span className="profile-detail-icon">
                  ✉️
                </span>

                <span>Email Address</span>
              </div>

              <strong>
                {user?.email || "Not available"}
              </strong>
            </div>

            <div className="profile-detail-row">
              <div className="profile-detail-label">
                <span className="profile-detail-icon">
                  📅
                </span>

                <span>Member Since</span>
              </div>

              <strong>{memberSince}</strong>
            </div>

            <div className="profile-detail-row">
              <div className="profile-detail-label">
                <span className="profile-detail-icon">
                  🕒
                </span>

                <span>Last Updated</span>
              </div>

              <strong>{lastUpdated}</strong>
            </div>

            <div className="profile-detail-row">
              <div className="profile-detail-label">
                <span className="profile-detail-icon">
                  🛡️
                </span>

                <span>Account Status</span>
              </div>

              <strong className="account-status">
                Active
              </strong>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;