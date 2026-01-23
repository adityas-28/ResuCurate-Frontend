import React, { useEffect, useState } from "react";
import {
  FileText,
  UploadCloud,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  FilePenLineIcon,
  XIcon,
  Loader2,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function AtsScan() {
  const [allResumes, setAllResumes] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [scanningResumeId, setScanningResumeId] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadAllResumes();
  }, []);

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
    } else {
      alert("Please upload a PDF file");
    }    
  };

  const scanResume = async (resumeId = null, isUploaded = false) => {
    // For existing resumes, you can implement API call here if needed
    // For now, keeping the navigation behavior for existing resumes
    if (resumeId && !isUploaded) {
      setScanningResumeId(resumeId);
      setShowResults(false);
      setScanResults(null);

      // Simulate ATS scanning process for existing resumes
      setTimeout(() => {
        const reviewResumeId = resumeId;
        navigate(`/review/${reviewResumeId}`);
      }, 2000);
    }
    // For uploaded files, the scanUploadedResume function handles it
  };

  const scanUploadedResume = async () => {
    if (!uploadedFile) {
      alert("Please upload a resume file first");
      return;
    }
    
    setShowUploadModal(false);
    setScanningResumeId("uploaded");
    setShowResults(false);
    setScanResults(null);

    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append("file", uploadedFile);

      // Get API URL from environment variable or use default
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const apiEndpoint = `${API_URL}/api/ats-score`;

      // Call the API endpoint
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = "Failed to scan resume";
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Format the response to match the expected structure
      setScanResults({
        resumeName: data.resumeName || uploadedFile.name,
        overallScore: data.overallScore || 0,
        breakdown: data.breakdown || {},
        strengths: data.strengths || [],
        improvements: data.improvements || [],
        links: data.links || {},
        field: data.field || "Unknown"
      });
      
      setShowResults(true);
      setScanningResumeId(null);
    } catch (error) {
      console.error("Error scanning resume:", error);
      
      // Provide more helpful error messages
      let errorMessage = error.message;
      if (error.message === "Failed to fetch") {
        errorMessage = "Unable to connect to the server. Please make sure the backend server is running on port 8000.";
      }
      
      alert(`Error scanning resume: ${errorMessage}`);
      setScanningResumeId(null);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-500/20 border-green-500/50";
    if (score >= 60) return "bg-yellow-500/20 border-yellow-500/50";
    return "bg-red-500/20 border-red-500/50";
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">ATS Resume Scanner</h1>
          <p className="text-gray-400">
            Upload or select a resume to get instant ATS score and optimization suggestions
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <UploadCloud className="size-6 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Upload Resume</h2>
                  <p className="text-sm text-gray-400">Scan a new resume file</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <UploadCloud className="size-4" />
                Upload & Scan
              </button>
            </div>
          </div>
        </div>

        {/* Resumes List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Your Resumes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allResumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <FilePenLineIcon className="size-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium truncate max-w-[200px]">
                        {resume.title}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => scanResume(resume._id)}
                  disabled={scanningResumeId === resume._id}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {scanningResumeId === resume._id ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      <span>Scan Resume</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Scan Results */}
        {showResults && scanResults && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Scan Results</h2>
                  <p className="text-gray-400">{scanResults.resumeName}</p>
                </div>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              {/* Overall Score */}
              <div className={`mb-6 p-6 rounded-lg border ${getScoreBgColor(scanResults.overallScore)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="size-6 text-indigo-400" />
                    <span className="text-gray-400">Overall ATS Score</span>
                  </div>
                  <span className={`text-4xl font-bold ${getScoreColor(scanResults.overallScore)}`}>
                    {scanResults.overallScore}
                    <span className="text-xl text-gray-400">/100</span>
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      scanResults.overallScore >= 80
                        ? "bg-gradient-to-r from-green-500 to-green-400"
                        : scanResults.overallScore >= 60
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                        : "bg-gradient-to-r from-red-500 to-red-400"
                    }`}
                    style={{ width: `${scanResults.overallScore}%` }}
                  />
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(scanResults.breakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className={`text-lg font-semibold ${getScoreColor(value)}`}>
                        {value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          value >= 80
                            ? "bg-green-500"
                            : value >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths and Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="size-5 text-green-400" />
                    <h3 className="text-white font-semibold">Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {scanResults.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/50 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="size-5 text-yellow-400" />
                    <h3 className="text-white font-semibold">Areas for Improvement</h3>
                  </div>
                  <ul className="space-y-2">
                    {scanResults.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div
            onClick={() => setShowUploadModal(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gray-900 border border-gray-700 shadow-xl rounded-lg w-full max-w-md p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-100">Upload Resume for ATS Scan</h2>
              <div className="mb-4">
                <label
                  htmlFor="resume-upload-input"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Select Resume File (PDF)
                </label>
                <div
                  onClick={() => document.getElementById("resume-upload-input")?.click()}
                  className="flex flex-col items-center justify-center gap-2 border border-gray-600 border-dashed rounded-md p-8 hover:border-indigo-500 hover:bg-gray-800/50 cursor-pointer transition-colors"
                >
                  {uploadedFile ? (
                    <div className="text-center">
                      <FileText className="size-12 text-indigo-400 mx-auto mb-2" />
                      <p className="text-green-400 font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="size-12 text-gray-400" />
                      <p className="text-gray-400">Click to upload PDF resume</p>
                      <p className="text-xs text-gray-500">Max file size: 10MB</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="resume-upload-input"
                  accept=".pdf"
                  hidden
                  onChange={handleFileUpload}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={scanUploadedResume}
                  disabled={!uploadedFile}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded transition-colors flex items-center justify-center gap-2"
                >
                  {scanningResumeId === "uploaded" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      <span>Scan Resume</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadedFile(null);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
              <XIcon
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadedFile(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AtsScan;
