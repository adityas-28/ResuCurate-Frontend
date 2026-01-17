import {
  Microscope,
  Calendar,
  Link as LinkIcon,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import React from "react";

function ResearchForm({ data, onChange }) {
  const researches = data || [];

  const handleAdd = () => {
    onChange([
      ...researches,
      {
        title: "",
        institution: "",
        supervisor: "",
        start_date: "",
        end_date: "",
        current: false,
        description: "",
        publication: "",
        url: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...researches];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(researches.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Microscope className="size-5 text-indigo-400" />
          Research Experience
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors border border-indigo-500/30"
        >
          <Plus className="size-4" />
          Add Research
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Add your research projects and academic research experience
      </p>

      <div className="space-y-6">
        {researches.map((research, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg p-4 space-y-4 relative bg-gray-800/50"
          >
            {researches.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Microscope className="size-4 text-indigo-400" />
                  Research Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={research.title || ""}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., Machine Learning in Healthcare"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Microscope className="size-4 text-indigo-400" />
                  Institution <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={research.institution || ""}
                  onChange={(e) =>
                    handleChange(index, "institution", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., Stanford University"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Users className="size-4 text-indigo-400" />
                  Supervisor/Principal Investigator
                </label>
                <input
                  type="text"
                  value={research.supervisor || ""}
                  onChange={(e) =>
                    handleChange(index, "supervisor", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., Dr. Jane Smith"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Calendar className="size-4 text-indigo-400" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={research.start_date || ""}
                  onChange={(e) =>
                    handleChange(index, "start_date", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Calendar className="size-4 text-indigo-400" />
                  End Date
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="month"
                    value={research.end_date || ""}
                    onChange={(e) =>
                      handleChange(index, "end_date", e.target.value)
                    }
                    disabled={research.current}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white disabled:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-400 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={research.current || false}
                      onChange={(e) =>
                        handleChange(index, "current", e.target.checked)
                      }
                      className="rounded bg-gray-800 border-gray-600 text-indigo-600 focus:ring-indigo-500"
                    />
                    Current
                  </label>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  value={research.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm min-h-[80px] resize-y text-white placeholder-gray-500"
                  placeholder="Describe your research, methodology, findings, and contributions..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Publication/Paper (if published)
                </label>
                <input
                  type="text"
                  value={research.publication || ""}
                  onChange={(e) =>
                    handleChange(index, "publication", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., Journal of AI Research, 2024"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <LinkIcon className="size-4 text-indigo-400" />
                  Publication URL
                </label>
                <input
                  type="url"
                  value={research.url || ""}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        ))}
        {researches.length === 0 && (
          <div className="text-center py-8 text-gray-500 border border-gray-700 border-dashed rounded-lg">
            <Microscope className="size-12 mx-auto mb-2 opacity-50 text-gray-600" />
            <p className="text-gray-400">
              No research experience added yet. Click "Add Research" to get
              started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResearchForm;
