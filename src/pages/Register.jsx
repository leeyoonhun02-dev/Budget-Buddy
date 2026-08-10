import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/Auth.css";

const Register = () => {
  const {
    register,
    authLoading,
    authError,
    isAuthenticated,
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({
        name,
        email,
        password,
      });
    } catch (error) {}
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-wrapper">

        <div className="auth-brand">
          <div className="auth-logo">
            📊
          </div>

          <div className="auth-brand-text">
            <h1>Budget Buddy</h1>

            <p>
              Manage your income and expenses
              with ease.
            </p>
          </div>
        </div>

        <div className="auth-card">

          <div className="auth-heading">
            <h2>Create Account</h2>

            <p>
              Start tracking your finances
              today.
            </p>
          </div>

          {authError && (
            <div className="auth-error">
              ⚠ {authError}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                disabled={authLoading}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            <div className="auth-field">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                disabled={authLoading}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="auth-field">
              <label>Password</label>

              <div className="password-field">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  value={password}
                  disabled={authLoading}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  disabled={authLoading}
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "🙈 Hide"
                    : "👁 Show"}
                </button>
              </div>

              <small className="auth-hint">
                Use at least 8 characters for
                better security.
              </small>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={authLoading}
            >
              {authLoading ? (
                <>
                  <span className="auth-spinner"></span>

                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;