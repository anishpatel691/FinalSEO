import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import YouTubeSEOAnalyzer from "./YouTubeSEOAnalyzer";
import PrivacyPolicy from "./PrivacyPolicy";
import Footer from "./footer.jsx"; // Import Footer Component
import TermsConditions from "./TermsConditions.jsx";
function App() {
  return (
    <Router>
      <div >
        <main >
          <Routes>
            <Route path="/" element={<YouTubeSEOAnalyzer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
          </Routes>
        </main>
        <Footer /> {/* Add Footer */}
      </div>
    </Router>
  );
}

export default App;
