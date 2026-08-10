import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

import { useAuth } from "../context/AuthContext";

import "../styles/Profile.css";

const ChangePassword = () => {
  const {
    changePassword,
    clearAuthError,
  } = useAuth();

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError(
        "Please complete all password fields."
      );
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "New password must contain at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirmation do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from the current password."
      );
      return;
    }

    try {
      setSubmitting(true);

      const response = await changePassword({
        currentPassword,
        newPassword,
      });

      setMessage(
        response.message ||
          "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      window.setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to change your password."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <Link to="/profile" className="back-link">
        <span aria-hidden="true">←</span> Back to Profile
    </Link>
      <PageHeader
        title="🔒 Change Password"
        subtitle="Update your password and protect your account."
      />

      <div className="profile-form-page">
        <Card className="profile-card profile-form-card">
          <div className="profile-card-header">
            <div className="profile-card-icon security">
              🔒
            </div>

            <div>
              <h2>Account Security</h2>

              <p>
                Enter your current password before choosing
                a new one.
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
              <label htmlFor="current-password">
                Current Password
              </label>

              <div className="profile-password-field">
                <input
                  id="current-password"
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  disabled={submitting}
                  autoComplete="current-password"
                  placeholder="Enter your current password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      (current) => !current
                    )
                  }
                  disabled={submitting}
                >
                  {showCurrentPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="new-password">
                New Password
              </label>

              <div className="profile-password-field">
                <input
                  id="new-password"
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  disabled={submitting}
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  minLength="8"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      (current) => !current
                    )
                  }
                  disabled={submitting}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="confirm-password">
                Confirm New Password
              </label>

              <div className="profile-password-field">
                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  disabled={submitting}
                  autoComplete="new-password"
                  placeholder="Enter your new password again"
                  minLength="8"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  disabled={submitting}
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            <small className="profile-password-hint">
              Use at least 8 characters and avoid reusing
              your current password.
            </small>

            <div className="profile-form-actions">
              <button
                type="submit"
                className="profile-submit-btn security-btn"
                disabled={submitting}
              >
                {submitting && (
                  <span
                    className="profile-spinner"
                    aria-hidden="true"
                  />
                )}

                {submitting
                  ? "Updating Password..."
                  : "Update Password"}
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

export default ChangePassword;