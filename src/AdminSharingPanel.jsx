import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminSharingPanel.css";

const API_URL = "https://finalseobackend-1.onrender.com";

const AdminSharingPanel = () => {
  const [videoList, setVideoList] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showNotification, setShowNotification] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [loginDuration, setLoginDuration] = useState("");
  const [lastLoginTime, setLastLoginTime] = useState("");
  const navigate = useNavigate();

  // 🕒 Track login duration
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

  // ⏳ Fetch videos & handle auth
  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");
    const name = localStorage.getItem("admin-username");
    const lastLogin = localStorage.getItem("lastLoginTime");

    if (!isAuth || !name) return navigate("/admin-login");

    setAdminName(name);
    setLastLoginTime(lastLogin);
    fetchVideos();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("admin-auth");
    localStorage.removeItem("admin-username");
    localStorage.removeItem("loginTime");
    navigate("/admin-login");
  };

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/admin/videos`);
      const videos = res.data;

      const previousCount = Number(localStorage.getItem("lastVideoCount") || 0);
      if (videos.length > previousCount) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
      localStorage.setItem("lastVideoCount", videos.length.toString());
      setVideoList(videos);
      applyFilter(videos, filter);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleShareStatus = async (id, platform) => {
    try {
      const res = await axios.patch(`${API_URL}/api/admin/videos/${id}/share`, { platform });
      const updated = res.data;
      const newList = videoList.map(v => (v._id === updated._id ? updated : v));
      setVideoList(newList);
      applyFilter(newList, filter);
    } catch (err) {
      console.error("Error updating share status:", err);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("📋 URL copied to clipboard!");
  };

  const applyFilter = (videos, selectedFilter) => {
    let filtered = [...videos];

    const today = new Date().toISOString().split("T")[0];

    switch (selectedFilter) {
      case "today":
        filtered = videos.filter(v => new Date(v.createdAt).toISOString().split("T")[0] === today);
        break;
      case "notSharedFacebook":
        filtered = videos.filter(v => !v.shared.facebook);
        break;
      case "notSharedInstagram":
        filtered = videos.filter(v => !v.shared.instagram);
        break;
      case "notSharedWhatsapp":
        filtered = videos.filter(v => !v.shared.whatsapp);
        break;
      case "notSharedTwitter":
        filtered = videos.filter(v => !v.shared.twitter);
        break;
      case "completed":
        filtered = videos.filter(v =>
          v.shared.facebook &&
          v.shared.instagram &&
          v.shared.whatsapp &&
          v.shared.twitter
        );
        break;
      default:
        break;
    }

    // Sort by newest
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredVideos(filtered);
  };

  useEffect(() => {
    applyFilter(videoList, filter);
  }, [filter, videoList]);

  return (
    <div className="admin-panel">
      <div className="header">
        <h2 className="panel-title">📋 Admin Sharing Panel</h2>
        <div className="admin-info">
          <p><strong>🕒 Logged In:</strong> {loginDuration}</p>
          {lastLoginTime && (
            <p><strong>⏱️ Last Login:</strong> {new Date(lastLoginTime).toLocaleString()}</p>
          )}
          <p><strong>👤 Logged in as:</strong> {adminName}</p>
          <button className="logout-btn" onClick={logout}>🚪 Logout</button>
        </div>
      </div>

      <div className="filter-controls">
        <label className="filter-label">Filter by: </label>
        <select className="filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">📃 All</option>
          <option value="today">🕑 Today</option>
          <option value="notSharedFacebook">❌ Not shared on Facebook</option>
          <option value="notSharedInstagram">❌ Not shared on Instagram</option>
          <option value="notSharedWhatsapp">❌ Not shared on WhatsApp</option>
          <option value="notSharedTwitter">❌ Not shared on Twitter</option>
          <option value="completed">✅ Fully Shared</option>
        </select>

        <button className="refresh-btn" onClick={fetchVideos}>
          🔄 Refresh
        </button>
      </div>

      {showNotification && (
        <div className="notification">
          🚨 New YouTube URL submitted! Please share it.
        </div>
      )}

      {loading ? (
        <p className="loading-message">⏳ Loading videos...</p>
      ) : filteredVideos.length === 0 ? (
        <p className="no-results">No video URLs found for this filter.</p>
      ) : (
        <ul className="video-list">
          {filteredVideos.map(({ _id, url, shared }) => (
            <li key={_id} className="video-item">
              <div className="video-url">
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                <button className="copy-btn" onClick={() => copyToClipboard(url)}>📋 Copy</button>
              </div>

              <div className="share-controls">
                {["facebook", "instagram", "whatsapp", "twitter"].map(platform => (
                  <label key={platform} className={`share-checkbox platform-${platform}`}>
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
