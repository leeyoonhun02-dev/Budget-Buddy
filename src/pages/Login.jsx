import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/Auth.css";

const Login = () => {
  const {
    login,
    authLoading,
    authError,
    isAuthenticated,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({
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
            <h2>Welcome Back</h2>

            <p>
              Sign in to continue managing
              your finances.
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
                  placeholder="Enter your password"
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
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={authLoading}
            >
              {authLoading ? (
                <>
                  <span className="auth-spinner"></span>

                  Signing In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;