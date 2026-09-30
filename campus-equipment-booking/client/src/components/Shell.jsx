import { useAuth } from "../context/AuthContext.jsx";

export default function Shell({
  tabs,
  activeTab,
  onTabChange,
  children,
  badges = {},
}) {
  const { user, logout } = useAuth();
  const visibleTabs = tabs.filter(([key]) => key !== "profile");

  return (
    <div>
      <div className="topbar">
        <div className="brand-mini">
          <span className="display">CourtSide</span>
          <span className="role-pill">{user.role}</span>
        </div>
        <div className="user-block">
          <span className="user-name">{user.name}</span>
          <button
            className="profile-top-btn"
            onClick={() => onTabChange("profile")}
            aria-current={activeTab === "profile" ? "page" : undefined}
          >
            Profile
          </button>
          <button className="logout-btn" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
      <div className="tabs">
        {visibleTabs.map(([key, label]) => (
          <button
            key={key}
            className={`tab-btn ${activeTab === key ? "active" : ""}`}
            onClick={() => onTabChange(key)}
          >
            {label}
            {badges[key] > 0 && (
              <span className="badge-count">{badges[key]}</span>
            )}
          </button>
        ))}
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
