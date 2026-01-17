import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  FileText,
  PenTool,
  Target,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/Arsenal/ResumePreview";

export default function ReviewResume() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [scores, setScores] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    loadResumeData();
    generateScores();
  }, [resumeId]);

  const loadResumeData = async () => {
    // In a real app, this would load from API
    // For uploaded resumes, you'd need to handle that differently
    if (resumeId && !resumeId.startsWith("uploaded-")) {
      const resume = dummyResumeData.find((r) => r._id === resumeId);
      if (resume) {
        setResumeData(resume);
      }
    } else {
      // For uploaded files or if not found, use first dummy data
      setResumeData(dummyResumeData[0]);
    }
  };

  const generateScores = () => {
    // Generate mock scores - in real app, these would come from API
    const mockScores = {
      atsScore: Math.floor(Math.random() * 30) + 70, // 70-100
      contentScore: Math.floor(Math.random() * 25) + 70, // 70-95
      writingScore: Math.floor(Math.random() * 20) + 75, // 75-95
      jobMatch: Math.floor(Math.random() * 30) + 65, // 65-95
      ready: Math.floor(Math.random() * 30) + 70 >= 80, // Ready if score >= 80
    };
    setScores(mockScores);
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

  const getScoreBarColor = (score) => {
    if (score >= 80) return "bg-gradient-to-r from-green-500 to-green-400";
    if (score >= 60) return "bg-gradient-to-r from-yellow-500 to-yellow-400";
    return "bg-gradient-to-r from-red-500 to-red-400";
  };

  if (!resumeData || !scores) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/app/ats-scan")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to ATS Scan</span>
          </button>
          
          {/* Toggle Preview Button */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors border border-gray-700"
          >
            {showPreview ? (
              <>
                <EyeOff className="size-4" />
                <span>Hide Preview</span>
              </>
            ) : (
              <>
                <Eye className="size-4" />
                <span>Show Preview</span>
              </>
            )}
          </button>
        </div>

        <div className={`grid grid-cols-1 gap-6 ${showPreview ? "lg:grid-cols-3" : "lg:grid-cols-1 max-w-2xl mx-auto"}`}>
          {/* Left Side - Scores */}
          <div className={`space-y-4 ${showPreview ? "lg:col-span-1" : ""}`}>
            <h1 className="text-2xl font-bold text-white mb-6">Resume Review</h1>

            {/* ATS Score */}
            <div className={`p-6 rounded-lg border ${getScoreBgColor(scores.atsScore)}`}>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="size-6 text-indigo-400" />
                <div>
                  <h3 className="text-sm text-gray-400">ATS Score</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${getScoreColor(scores.atsScore)}`}>
                      {scores.atsScore}
                    </span>
                    <span className="text-gray-400 text-lg">/100</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getScoreBarColor(scores.atsScore)}`}
                  style={{ width: `${scores.atsScore}%` }}
                />
              </div>
            </div>

            {/* Content Score */}
            <div className={`p-6 rounded-lg border ${getScoreBgColor(scores.contentScore)}`}>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="size-6 text-blue-400" />
                <div>
                  <h3 className="text-sm text-gray-400">Content Score</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${getScoreColor(scores.contentScore)}`}>
                      {scores.contentScore}
                    </span>
                    <span className="text-gray-400 text-lg">/100</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getScoreBarColor(scores.contentScore)}`}
                  style={{ width: `${scores.contentScore}%` }}
                />
              </div>
            </div>

            {/* Writing Score */}
            <div className={`p-6 rounded-lg border ${getScoreBgColor(scores.writingScore)}`}>
              <div className="flex items-center gap-3 mb-4">
                <PenTool className="size-6 text-purple-400" />
                <div>
                  <h3 className="text-sm text-gray-400">Writing Score</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${getScoreColor(scores.writingScore)}`}>
                      {scores.writingScore}
                    </span>
                    <span className="text-gray-400 text-lg">/100</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getScoreBarColor(scores.writingScore)}`}
                  style={{ width: `${scores.writingScore}%` }}
                />
              </div>
            </div>

            {/* Job Match */}
            <div className={`p-6 rounded-lg border ${getScoreBgColor(scores.jobMatch)}`}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="size-6 text-cyan-400" />
                <div>
                  <h3 className="text-sm text-gray-400">Job Match</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${getScoreColor(scores.jobMatch)}`}>
                      {scores.jobMatch}
                    </span>
                    <span className="text-gray-400 text-lg">/100</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getScoreBarColor(scores.jobMatch)}`}
                  style={{ width: `${scores.jobMatch}%` }}
                />
              </div>
            </div>

            {/* Ready Status */}
            <div
              className={`p-6 rounded-lg border ${
                scores.ready
                  ? "bg-green-500/20 border-green-500/50"
                  : "bg-yellow-500/20 border-yellow-500/50"
              }`}
            >
              <div className="flex items-center gap-3">
                {scores.ready ? (
                  <CheckCircle2 className="size-6 text-green-400" />
                ) : (
                  <XCircle className="size-6 text-yellow-400" />
                )}
                <div>
                  <h3 className="text-sm text-gray-400">Ready to Apply</h3>
                  <p
                    className={`text-2xl font-bold ${
                      scores.ready ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {scores.ready ? "Yes" : "Needs Improvement"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <button
                onClick={() => navigate(`/app/builder/${resumeId}`)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
              >
                <PenTool className="size-4" />
                <span>Edit Resume</span>
              </button>
              <button
                onClick={() => navigate("/app/ats-scan")}
                className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
              >
                Scan Another Resume
              </button>
            </div>
          </div>

          {/* Right Side - Resume Preview */}
          {showPreview && (
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {resumeData.title || "Resume Preview"}
                </h2>
                <p className="text-gray-400 text-sm">
                  Review your resume below. Make edits to improve your scores.
                </p>
              </div>
              <ResumePreview
                data={resumeData}
                template={resumeData.template || "classic"}
                accentColor={resumeData.accent_color || "#3B82F6"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
