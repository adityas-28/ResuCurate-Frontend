import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, Check } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function GenerateResume() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobDescription: "",
    experienceLevel: "Mid Level",
    category: "",
    subCategory: "",
    singlePageOnly: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobCategories = {
    "Software Development": [
      "Backend",
      "Frontend",
      "Fullstack",
      "Mobile",
      "DevOps",
      "Game Dev",
    ],
    "Data & AI": [
      "Data Scientist",
      "Data Engineer",
      "Machine Learning",
      "AI Researcher",
      "Data Analyst",
    ],
    "Product Management": ["Technical PM", "Growth PM", "Product Owner"],
    Design: ["UI/UX", "Product Design", "Graphic Design", "Motion Design"],
    Cybersecurity: ["Security Analyst", "Ethical Hacker", "Security Engineer"],
    Marketing: ["Digital Marketing", "Content Strategy", "SEO Specialist"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (formData.jobDescription.length < 20) {
      alert("Job description must be at least 20 characters");
      return;
    }
    if (
      !formData.jobDescription ||
      !formData.category ||
      !formData.subCategory
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError) {
        console.error("Auth error:", authError);
        alert(authError.message);
        return;
      }
      const userId = authData?.user?.id;
      if (!userId) {
        alert("Please sign in again.");
        return;
      }

      const payload = {
        user_id: userId,
        job_description: formData.jobDescription,
        experience_level: formData.experienceLevel,
        category: formData.category,
        sub_category: formData.subCategory,
        single_page_only: formData.singlePageOnly,
      };

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/generate-resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message =
          data?.message || data?.error || `Request failed (${res.status})`;
        console.error("Generate resume error:", data);
        alert(message);
        return;
      }

      const resumeId = data?.resume_id || data?.resumeId || data?.id;
      if (!resumeId) {
        console.error("Generate resume error: missing resume id in response", data);
        alert("Generation succeeded but no resume ID was returned from the server.");
        return;
      }

      navigate(`/app/builder/${resumeId}`, {
        state: {
          formData,
          apiPayload: payload,
          apiResponse: data.data, // 🔥 IMPORTANT FIX
          resumeId: data.resume_id,
          isNewResume: true,
        },
      });
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to generate resume");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    if (field === "category") {
      // Reset subCategory when category changes
      setFormData({
        ...formData,
        category: value,
        subCategory: "",
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <button
          onClick={() => navigate("/app")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Generate New Resume
          </h1>
          <p className="text-gray-400">
            Provide details about the job you're applying for, and we'll
            generate a tailored resume from your Arsenal.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl"
        >
          <div className="space-y-6">
            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.jobDescription}
                onChange={(e) => handleChange("jobDescription", e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-40 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors resize-none"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Paste the complete job description to help us tailor your resume
              </p>
            </div>

            {/* Experience Level and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience Level <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    handleChange("experienceLevel", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="Entry Level">Entry Level (0-2 years)</option>
                  <option value="Mid Level">Mid Level (3-5 years)</option>
                  <option value="Senior Level">Senior Level (5+ years)</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              {/* Job Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Category <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {Object.keys(jobCategories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sub Category <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.subCategory}
                onChange={(e) => handleChange("subCategory", e.target.value)}
                disabled={!formData.category}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                required
              >
                <option value="" disabled>
                  {formData.category
                    ? "Select Sub-category"
                    : "Select Category first"}
                </option>
                {formData.category &&
                  jobCategories[formData.category].map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>

            {/* Single Page Only Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="singlePageOnly"
                  checked={formData.singlePageOnly}
                  onChange={(e) =>
                    handleChange("singlePageOnly", e.target.checked)
                  }
                  className="sr-only"
                />
                <label
                  htmlFor="singlePageOnly"
                  className={`flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all ${
                    formData.singlePageOnly
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-gray-800 border-gray-600 hover:border-gray-500"
                  }`}
                >
                  {formData.singlePageOnly && (
                    <Check className="size-3.5 text-white" />
                  )}
                </label>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="singlePageOnly"
                  className="text-sm font-medium text-gray-300 cursor-pointer block"
                >
                  Keep resume to single page only
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Enable this to ensure the generated resume fits on one page
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/app")}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !formData.jobDescription ||
                !formData.category ||
                !formData.subCategory ||
                isSubmitting
              }
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              <Sparkles className="size-5" />
              <span>
                {isSubmitting ? "Generating..." : "Generate Tailored Resume"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
