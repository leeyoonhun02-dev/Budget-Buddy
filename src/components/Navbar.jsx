import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const [profileMenuOpen, setProfileMenuOpen] =
    useState(false);

  const userInitials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleNavigate = (path) => {
    setProfileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setProfileMenuOpen(false);
    logout();
    navigate("/login");
  };

  const isCurrentPath = (path) =>
    location.pathname === path;

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div
          className="navbar-logo"
          aria-hidden="true"
        >
          📊
        </div>

        <div className="navbar-brand-text">
          <span className="navbar-title">
            Budget Buddy
          </span>

          <span className="navbar-tagline">
            Personal Finance Tracker
          </span>
        </div>
      </div>

      <div className="navbar-links">
        <NavLink to="/">Dashboard</NavLink>

        <NavLink to="/transactions">
          Transactions
        </NavLink>

        <NavLink to="/reports">
          Reports
        </NavLink>
      </div>

      <div
        className="navbar-user"
        ref={menuRef}
      >
        <button
          type="button"
          className={`profile-menu-button ${
            profileMenuOpen ? "open" : ""
          }`}
          onClick={() =>
            setProfileMenuOpen(
              (current) => !current
            )
          }
          aria-haspopup="menu"
          aria-expanded={profileMenuOpen}
        >
          <span className="profile-avatar">
            {userInitials}
          </span>

          <span className="profile-button-text">
            <span className="profile-button-name">
              {user?.name || "User"}
            </span>

            <span className="profile-button-label">
              My Account
            </span>
          </span>

          <span
            className="profile-chevron"
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        {profileMenuOpen && (
          <div
            className="profile-dropdown"
            role="menu"
          >
            <div className="profile-dropdown-header">
              <span className="profile-avatar profile-avatar-large">
                {userInitials}
              </span>

              <div className="profile-dropdown-identity">
                <strong>
                  {user?.name || "User"}
                </strong>

                <span>{user?.email || ""}</span>
              </div>
            </div>

            <div className="profile-dropdown-divider" />

            <button
              type="button"
              className={`profile-dropdown-item ${
                isCurrentPath("/profile")
                  ? "profile-dropdown-active"
                  : ""
              }`}
              onClick={() =>
                handleNavigate("/profile")
              }
              role="menuitem"
            >
              <span className="profile-dropdown-icon">
                👤
              </span>

              <span className="profile-dropdown-content">
                <strong>View Profile</strong>
                <small>View your account details</small>
              </span>

              <span className="profile-item-arrow">
                ›
              </span>
            </button>

            <button
              type="button"
              className={`profile-dropdown-item ${
                isCurrentPath("/profile/edit")
                  ? "profile-dropdown-active"
                  : ""
              }`}
              onClick={() =>
                handleNavigate("/profile/edit")
              }
              role="menuitem"
            >
              <span className="profile-dropdown-icon">
                ✏️
              </span>

              <span className="profile-dropdown-content">
                <strong>Update Profile</strong>
                <small>
                  Edit your personal information
                </small>
              </span>

              <span className="profile-item-arrow">
                ›
              </span>
            </button>

            <button
              type="button"
              className={`profile-dropdown-item ${
                isCurrentPath("/profile/password")
                  ? "profile-dropdown-active"
                  : ""
              }`}
              onClick={() =>
                handleNavigate("/profile/password")
              }
              role="menuitem"
            >
              <span className="profile-dropdown-icon">
                🔒
              </span>

              <span className="profile-dropdown-content">
                <strong>Change Password</strong>
                <small>
                  Update your account security
                </small>
              </span>

              <span className="profile-item-arrow">
                ›
              </span>
            </button>

            <div className="profile-dropdown-divider" />

            <button
              type="button"
              className="profile-dropdown-item profile-logout"
              onClick={handleLogout}
              role="menuitem"
            >
              <span className="profile-dropdown-icon">
                🚪
              </span>

              <span className="profile-dropdown-content">
                <strong>Log Out</strong>
                <small>
                  Sign out of Budget Buddy
                </small>
              </span>

              <span className="profile-item-arrow">
                ›
              </span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;