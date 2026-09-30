import { useEffect, useState } from "react";
import api from "../api.js";
import { errorMessage } from "../hooks.js";
import { useAuth } from "../context/AuthContext.jsx";

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function formatDate(value) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function ProfileTab() {
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [form, setForm] = useState({ name: "", department: "", phone: "" });

  useEffect(() => {
    let active = true;
    api
      .get("/users/me")
      .then((res) => {
        if (active) {
          setProfile(res.data);
          setForm({
            name: res.data.Name || "",
            department: res.data.Department || "",
            phone: res.data.Phone || "",
          });
        }
      })
      .catch((err) => {
        if (active) setError(errorMessage(err, "Could not load your profile."));
      });
    return () => {
      active = false;
    };
  }, []);

  function startEditing() {
    setSaveMessage("");
    setForm({
      name: profile.Name || "",
      department: profile.Department || "",
      phone: profile.Phone || "",
    });
    setEditing(true);
  }

  async function saveProfile(event) {
    event.preventDefault();
    setSaving(true);
    setSaveMessage("");
    try {
      const res = await api.patch("/users/me", form);
      setProfile(res.data);
      updateUser({
        name: res.data.Name,
        department: res.data.Department,
        phone: res.data.Phone,
      });
      setEditing(false);
      setSaveMessage("Profile updated.");
    } catch (err) {
      setSaveMessage(errorMessage(err, "Could not update your profile."));
    } finally {
      setSaving(false);
    }
  }

  if (error) return <div className="error-banner">{error}</div>;
  if (!profile) return <div className="center-spinner">Loading profile...</div>;

  const name = profile.Name || "CourtSide user";
  const role = profile.Role || "Student";
  const isAdmin = role === "Admin";

  return (
    <div className="profile-page">
      <div className="section-head">
        <div>
          <h2>My Profile</h2>
          <div className="section-sub">
            Your CourtSide account details and campus identity.
          </div>
        </div>
      </div>
      <section className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">
          {initials(name)}
        </div>
        <div className="profile-identity">
          <span className="mono profile-kicker">
            {isAdmin ? "COURTSIDE ADMIN" : "CAMPUS ATHLETE"}
          </span>
          <h3>{name}</h3>
          <p>{profile.Email}</p>
        </div>
        <span className="profile-role">{role}</span>
      </section>
      <section className="profile-details">
        <div className="profile-details-heading">
          <span className="mono">ACCOUNT DETAILS</span>
          {!editing && (
            <button
              className="profile-edit-button"
              type="button"
              onClick={startEditing}
            >
              Edit profile
            </button>
          )}
        </div>
        {saveMessage && (
          <div
            className={`profile-message ${saveMessage === "Profile updated." ? "success" : ""}`}
          >
            {saveMessage}
          </div>
        )}
        {editing ? (
          <form className="profile-edit-form" onSubmit={saveProfile}>
            <label className="field-label">
              Full name
              <input
                className="input"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
                maxLength={120}
              />
            </label>
            <label className="field-label">
              Department
              <input
                className="input"
                value={form.department}
                onChange={(event) =>
                  setForm({ ...form, department: event.target.value })
                }
              />
            </label>
            <label className="field-label">
              Phone
              <input
                className="input"
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
              />
            </label>
            <div className="profile-edit-actions">
              <button
                className="row-btn neutral"
                type="button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button className="btn-primary profile-save" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-fields">
            <ProfileField label="Full name" value={name} />
            <ProfileField label="Email address" value={profile.Email} />
            <ProfileField
              label="Department"
              value={profile.Department || "Not provided"}
            />
            <ProfileField
              label="Phone"
              value={profile.Phone || "Not provided"}
            />
            <ProfileField
              label="Member since"
              value={formatDate(profile.CreatedAt)}
            />
            <ProfileField
              label="Access level"
              value={
                isAdmin ? "Full equipment management" : "Equipment booking"
              }
            />
          </div>
        )}
      </section>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="profile-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
