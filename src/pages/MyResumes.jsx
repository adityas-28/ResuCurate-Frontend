import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  TrashIcon,
  Eye,
  Edit,
  Sparkles,
  Search,
  X,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function MyResumes() {
  const [allResumes, setAllResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const navigate = useNavigate();
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  useEffect(() => {
    loadAllResumes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResumes(allResumes);
    } else {
      const filtered = allResumes.filter((resume) =>
        resume.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResumes(filtered);
    }
  }, [searchQuery, allResumes]);

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
    setFilteredResumes(dummyResumeData);
  };

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this resume? This action cannot be undone."
    );
    if (confirm) {
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
      setFilteredResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
      setDeleteConfirmId(null);
    }
  };

  const handlePreview = (resumeId) => {
    navigate(`/view/${resumeId}`);
  };

  const handleOpen = (resumeId) => {
    navigate(`/app/builder/${resumeId}`);
  };

  const handleAtsScan = (resumeId) => {
    // Navigate to ATS Scan page - you can pass resumeId via state or query params
    navigate("/app/ats-scan", { state: { resumeId } });
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Resumes</h1>
          <p className="text-gray-400">
            Manage, preview, edit, and scan all your resumes
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resumes by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-400">
              Found {filteredResumes.length} resume{filteredResumes.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Resumes Grid */}
        {filteredResumes.length === 0 ? (
          <div className="text-center py-16">
            <FilePenLineIcon className="size-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {searchQuery ? "No resumes found" : "No resumes yet"}
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? "Try adjusting your search query"
                : "Create your first resume to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];

              return (
                <div
                  key={resume._id}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-5 hover:border-indigo-500/50 transition-all duration-300 group"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}05, ${baseColor}10)`,
                  }}
                >
                  {/* Resume Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className="p-2 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: `${baseColor}20` }}
                      >
                        <FilePenLineIcon
                          className="size-5"
                          style={{ color: baseColor }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-white font-semibold truncate"
                          style={{ color: baseColor }}
                        >
                          {resume.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Updated {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resume Info */}
                  {resume.personal_info?.profession && (
                    <p className="text-sm text-gray-400 mb-4 truncate">
                      {resume.personal_info.profession}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handlePreview(resume._id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors text-sm group/btn"
                    >
                      <Eye className="size-4 group-hover/btn:text-indigo-400 transition-colors" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleOpen(resume._id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors text-sm group/btn"
                    >
                      <Edit className="size-4 group-hover/btn:text-green-400 transition-colors" />
                      <span>Open</span>
                    </button>

                    <button
                      onClick={() => handleAtsScan(resume._id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors text-sm group/btn"
                    >
                      <Sparkles className="size-4 group-hover/btn:text-purple-400 transition-colors" />
                      <span>ATS Scan</span>
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(resume._id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-red-600/20 text-gray-300 hover:text-red-400 rounded-lg transition-colors text-sm group/btn border border-transparent hover:border-red-500/30"
                    >
                      <TrashIcon className="size-4" />
                      <span>Delete</span>
                    </button>
                  </div>

                  {/* Delete Confirmation */}
                  {deleteConfirmId === resume._id && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-red-400 mb-2">
                        Are you sure you want to delete this resume?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteResume(resume._id)}
                          className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-sm transition-colors"
                        >
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
