import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Footer from "./footer";
import YouTubeSEOGuide from "./YouTubeSEOGuide";
import VideoOptimizationTips from "./VideoOptimizationTips";
import YouTubeCaseStudies from "./YouTubeCaseStudies";
import YouTubeSEOAnalyzer from "./YouTubeSEOAnalyzer";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/youtube-seo-guide" element={<YouTubeSEOGuide />} />
            <Route path="/video-optimization-tips" element={<VideoOptimizationTips />} />
            <Route path="/youtube-case-studies" element={<YouTubeCaseStudies />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/youtube-seo-analyzer" element={<YouTubeSEOAnalyzer />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
