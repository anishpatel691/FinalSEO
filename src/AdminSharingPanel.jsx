import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminSharingPanel.css"; // Make sure to create this CSS file

const AdminSharingPanel = () => {
  const [videoList, setVideoList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [loginDuration, setLoginDuration] = useState("");
  const [lastLoginTime, setLastLoginTime] = useState("");
  const navigate = useNavigate();
  const API_URL = "https://finalseobackend-1.onrender.com";

  // Update login duration every second
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

    setAdminName(name);
    setLastLoginTime(lastLogin);

    requestNotificationPermission();
    fetchVideos();
  }, []);

  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };

  const showDesktopNotification = (title, message) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body: message });
    }
  };

  const logout = () => {
    localStorage.removeItem("admin-auth");
    localStorage.removeItem("admin-username");
    localStorage.removeItem("loginTime");
    navigate("/admin-login");
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/videos`);
      const videos = res.data;

      const previousCount = Number(localStorage.getItem("lastVideoCount") || 0);
      if (videos.length > previousCount) {
        setShowNotification(true);
        showDesktopNotification("🚨 New Video Submitted", "A new YouTube URL has been added by a user.");

        setTimeout(() => setShowNotification(false), 5000);
      }

      localStorage.setItem("lastVideoCount", videos.length.toString());
      setVideoList(videos);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  const toggleShareStatus = async (id, platform) => {
    try {
      const res = await axios.patch(`${API_URL}/api/admin/videos/${id}/share`, { platform });
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
    <div className="admin-panel">
      <div className="header">
        <h2 className="title">📋 Admin Sharing Panel</h2>
        <div className="user-info">
          <p><span className="label">🕒 Logged In:</span> {loginDuration}</p>
          {lastLoginTime && (
            <p><span className="label">⏱️ Last Login:</span> {new Date(lastLoginTime).toLocaleString()}</p>
          )}
          <p><span className="label">👤 Admin:</span> {adminName}</p>
          <div className="button-group">
            <button className="btn btn-primary" onClick={logout}>🚪 Logout</button>
            <button className="btn btn-secondary" onClick={fetchVideos}>🔄 Refresh</button>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="notification">
          🚨 New YouTube URL submitted! Please share it.
        </div>
      )}

      {videoList.length === 0 ? (
        <p className="empty-message">No video URLs submitted yet.</p>
      ) : (
        <ul className="video-list">
          {videoList.map(({ _id, url, shared }) => (
            <li key={_id} className="video-item">
              <div className="video-url">
                <span className="label">🔗 URL:</span> 
                <a href={url} target="_blank" rel="noopener noreferrer" className="url-link">{url}</a>
                <button className="btn btn-copy" onClick={() => copyToClipboard(url)}>📋 Copy</button>
              </div>

              <div className="share-options">
                {["facebook", "instagram", "whatsapp", "twitter"].map((platform) => (
                  <label key={platform} className="platform-checkbox">
                    <input
                      type="checkbox"
                      checked={shared?.[platform]}
                      onChange={() => toggleShareStatus(_id, platform)}
                    />
                    <span className="platform-name">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
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
