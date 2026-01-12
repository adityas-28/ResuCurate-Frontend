import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { events } from "@react-three/fiber";

function Dashboard() {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (event) => {
    event.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res123`);
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/res123`);
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
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent sm:hidden">
          Welcome, Steve Henderson
        </p>

        <div className="flex gap-4">
          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center
          rounded-lg gap-2 bg-gray-900 text-gray-300
          border border-dashed border-gray-700
          group hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20
          transition-all duration-300"
          >
            <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-full transition-all duration-300" />
            <p className="text-sm group-hover:text-indigo-400 transition-all duration-300">
              Create Resume
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

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gray-900 border border-gray-700 shadow-xl rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-100">
                Create a Resume
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
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

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
                Upload Resume
              </h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
                required
              />
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
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Upload Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
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
