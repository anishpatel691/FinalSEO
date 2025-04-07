import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSharingPanel = () => {
  const [videoList, setVideoList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [loginDuration, setLoginDuration] = useState("");
  const navigate = useNavigate();
  const [lastLoginTime, setLastLoginTime] = useState("");
  // 🕒 Update login duration every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const loginTime = new Date(localStorage.getItem("loginTime"));
      const now = new Date();
      const diffMs = now - loginTime;

      const minutes = Math.floor(diffMs / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);
      setLoginDuration(`${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");
    const name = localStorage.getItem("admin-username");
    const lastLogin = localStorage.getItem("lastLoginTime");
    if (!isAuth || !name) {
      navigate("/admin-login");
      return;
    }

    setLastLoginTime(lastLogin);
    setAdminName(name);
    fetchVideos();
  }, []);

  const logout = () => {
    localStorage.removeItem("admin-auth");
    localStorage.removeItem("admin-username");
    localStorage.removeItem("loginTime");
    navigate("/admin-login");
  };

  const fetchVideos = async () => {
    const res = await axios.get("/api/admin/videos");
    const videos = res.data;

    const previousCount = Number(localStorage.getItem("lastVideoCount") || 0);
    if (videos.length > previousCount) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
    localStorage.setItem("lastVideoCount", videos.length.toString());

    setVideoList(videos);
  };

  const toggleShareStatus = async (id, platform) => {
    try {
      const res = await axios.patch(`/api/admin/videos/${id}/share`, { platform });
      const updated = res.data;
      setVideoList(prev => prev.map(v => (v._id === updated._id ? updated : v)));
    } catch (err) {
      console.error("Error updating share status:", err);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>📋 Admin Sharing Panel</h2>

        <div>
        <p><strong>🕒 Logged In:</strong> {loginDuration}</p>
{lastLoginTime && (
  <p><strong>⏱️ Last Login:</strong> {new Date(lastLoginTime).toLocaleString()}</p>
)}
          <p><strong>👤 Logged in as:</strong> {adminName}</p>
          <button onClick={logout}>🚪 Logout</button>
        </div>
      </div>

      {showNotification && (
        <div style={{ backgroundColor: "#ffeeba", padding: "10px" }}>
          🚨 New YouTube URL submitted! Please share it.
        </div>
      )}

      {videoList.length === 0 ? (
        <p>No video URLs submitted yet.</p>
      ) : (
        <ul>
          {videoList.map(({ _id, url, shared }) => (
            <li key={_id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
              <p><strong>🔗 URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
              <button onClick={() => copyToClipboard(url)}>📋 Copy</button>

              <div style={{ marginTop: "10px" }}>
                {["facebook", "instagram", "whatsapp", "twitter"].map((platform) => (
                  <label key={platform} style={{ marginRight: "10px" }}>
                    <input
                      type="checkbox"
                      checked={shared?.[platform]}
                      onChange={() => toggleShareStatus(_id, platform)}
                    />
                    {` ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminSharingPanel;
