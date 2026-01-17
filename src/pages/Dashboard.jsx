import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  TrendingUp,
  FileText,
  Clock,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { events } from "@react-three/fiber";

function Dashboard() {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const addItemsToArsenal = async () => {
    // Navigate directly to arsenal builder - no resume name needed
    // Using 'arsenal' as a special ID to indicate this is the shared arsenal
    navigate(`/app/builder/arsenal`);
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false);
    // TODO: Parse uploaded resume and extract info to add to arsenal
    // For now, navigate to arsenal builder where parsed data can be added
    // The actual parsing logic should extract: projects, experience, education, skills, etc.
    // and add them to the shared arsenal
    if (resume) {
      // In a real implementation, you would:
      // 1. Parse the PDF resume
      // 2. Extract sections (experience, education, projects, skills, etc.)
      // 3. Add extracted items to the arsenal
      // 4. Navigate to arsenal builder to review/edit
      console.log("Resume file:", resume.name);
      // Navigate to arsenal to review parsed data
      navigate(`/app/builder/arsenal`);
    } else {
      alert("Please select a resume file to upload");
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();
  };

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (confirm) {
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  // Mock data for ATS Overview - replace with actual data from API
  const averageATSScore = 78;
  const totalResumes = allResumes.length;
  const lastScannedResume = allResumes.length > 0 ? allResumes[0] : null;
  const scoreBreakdown = {
    keywords: 85,
    formatting: 72,
    experience: 80,
    skills: 75,
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* ATS Overview Card */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Average ATS Score */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-5 text-indigo-400" />
                      <span className="text-sm text-gray-400">Average ATS Score</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{averageATSScore}</span>
                    <span className="text-sm text-gray-400">/100</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${averageATSScore}%` }}
                    />
                  </div>
                </div>

                {/* Total Resumes */}
                <button
                  onClick={() => navigate("/app/my-resumes")}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300 text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="size-5 text-purple-400" />
                      <span className="text-sm text-gray-400">Total Resumes</span>
                    </div>
                    <ArrowRight className="size-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{totalResumes}</span>
                    <span className="text-sm text-gray-400">in arsenal</span>
                  </div>
                </button>

                {/* Last Scanned Resume */}
                {lastScannedResume && (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="size-5 text-cyan-400" />
                        <span className="text-sm text-gray-400">Last Scanned</span>
                      </div>
                    </div>
                    <p className="text-white font-medium truncate">{lastScannedResume.title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(lastScannedResume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Score Breakdown */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="size-5 text-green-400" />
                      <span className="text-sm text-gray-400">Score Breakdown</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(scoreBreakdown).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 capitalize">{key}</span>
                        <span className="text-xs font-medium text-white">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 lg:w-64">
                <button
                  onClick={() => navigate("/create/jd")}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="size-5" />
                  <span>New Resume</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/app/ats-scan")}
                  className="w-full bg-gray-800 border border-gray-700 hover:border-indigo-500/50 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="size-5 text-indigo-400" />
                  <span>AI Reviews</span>
                  <ArrowRight className="size-4 text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My Arsenal Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">My Arsenal</h2>
        </div>

        <div className="flex gap-4 mb-6">
          {/* Add Items to Arsenal */}
          <button
            onClick={addItemsToArsenal}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center
          rounded-lg gap-2 bg-gray-900 text-gray-300
          border border-dashed border-gray-700
          group hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20
          transition-all duration-300"
          >
            <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-full transition-all duration-300" />
            <p className="text-sm group-hover:text-indigo-400 transition-all duration-300">
              Add Items
            </p>
          </button>

          {/* Upload Existing */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center
          rounded-lg gap-2 bg-gray-900 text-gray-300
          border border-dashed border-gray-700
          group hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20
          transition-all duration-300"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full transition-all duration-300" />
            <p className="text-sm group-hover:text-purple-400 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-gray-700 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                key={resume.id || index}
                className="relative w-full sm:max-w-36 h-48 flex flex-col
        items-center justify-center rounded-lg gap-2 border group
        hover:shadow-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: `${baseColor}40`,
                }}
              >
                <FilePenLineIcon
                  className="size-7 transition-transform group-hover:scale-105"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm transition-transform group-hover:scale-105 px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] transition-colors duration-300 px-2 text-center"
                  style={{ color: `${baseColor}90` }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 hidden group-hover:flex items-center gap-1"
                >
                  <TrashIcon
                    onClick={() => {
                      deleteResume(resume._id);
                    }}
                    className="size-7 p-1.5 hover:bg-gray-800/80 rounded text-gray-300 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-gray-800/80 rounded text-gray-300 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>


        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gray-900 border border-gray-700 shadow-xl rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-100">
                Upload Resume to Arsenal
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Upload your resume and we'll extract all your information (projects, experience, education, skills, etc.) and add it to your shared arsenal.
              </p>
              <div className="">
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-gray-300"
                >
                  Select Resume File
                  <div
                    className="flex flex-col items-center justify-center gap-2 border group text-gray-400 border-gray-600 border-dashed
rounded-md p-4 py-10 my-4 hover:border-green-500
hover:text-green-400 cursor-pointer transition-colors bg-gray-800/50"
                  >
                    {resume ? (
                      <p className="text-green-400">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Parse & Add to Arsenal
              </button>
              <XIcon
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setResume(null);
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gray-900 border border-gray-700 shadow-xl rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-100">
                Edit Resume Title
              </h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
