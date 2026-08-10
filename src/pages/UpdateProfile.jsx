import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

import { useAuth } from "../context/AuthContext";

import "../styles/Profile.css";

const UpdateProfile = () => {
  const {
    user,
    updateProfile,
    clearAuthError,
  } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState(
    user?.name || ""
  );

  const [email, setEmail] = useState(
    user?.email || ""
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await updateProfile({
        name: name.trim(),
        email: email.trim(),
      });

      setMessage(
        response.message ||
          "Profile updated successfully."
      );

      window.setTimeout(() => {
        navigate("/profile");
      }, 900);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
    <Link to="/profile" className="back-link">
        <span aria-hidden="true">←</span> Back to Profile
    </Link>
      <PageHeader
        title="✏️ Update Profile"
        subtitle="Edit your personal account information."
      />

      <div className="profile-form-page">
        <Card className="profile-card profile-form-card">
          <div className="profile-card-header">
            <div className="profile-card-icon">
              ✏️
            </div>

            <div>
              <h2>Personal Information</h2>

              <p>
                Update your name or email address.
              </p>
            </div>
          </div>

          {message && (
            <div className="profile-success">
              <span>✓</span>
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="profile-error">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form
            className="profile-form"
            onSubmit={handleSubmit}
          >
            <div className="profile-field">
              <label htmlFor="update-name">
                Full Name
              </label>

              <input
                id="update-name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                disabled={saving}
                autoComplete="name"
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="update-email">
                Email Address
              </label>

              <input
                id="update-email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={saving}
                autoComplete="email"
                required
              />
            </div>

            <div className="profile-form-actions">
              <button
                type="submit"
                className="profile-submit-btn"
                disabled={saving}
              >
                {saving && (
                  <span
                    className="profile-spinner"
                    aria-hidden="true"
                  />
                )}

                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>

              <Link
                to="/profile"
                className="profile-cancel-btn"
              >
                Cancel
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default UpdateProfile;