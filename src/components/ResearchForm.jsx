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
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Microscope className="size-5" />
          Research Experience
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus className="size-4" />
          Add Research
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Add your research projects and academic research experience
      </p>

      <div className="space-y-6">
        {researches.map((research, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-4 relative"
          >
            {researches.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Microscope className="size-4" />
                  Research Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={research.title || ""}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Machine Learning in Healthcare"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Microscope className="size-4" />
                  Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={research.institution || ""}
                  onChange={(e) =>
                    handleChange(index, "institution", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Stanford University"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Users className="size-4" />
                  Supervisor/Principal Investigator
                </label>
                <input
                  type="text"
                  value={research.supervisor || ""}
                  onChange={(e) =>
                    handleChange(index, "supervisor", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Dr. Jane Smith"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Calendar className="size-4" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={research.start_date || ""}
                  onChange={(e) =>
                    handleChange(index, "start_date", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Calendar className="size-4" />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={research.current || false}
                      onChange={(e) =>
                        handleChange(index, "current", e.target.checked)
                      }
                      className="rounded"
                    />
                    Current
                  </label>
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  value={research.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm min-h-[80px] resize-y"
                  placeholder="Describe your research, methodology, findings, and contributions..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Publication/Paper (if published)
                </label>
                <input
                  type="text"
                  value={research.publication || ""}
                  onChange={(e) =>
                    handleChange(index, "publication", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Journal of AI Research, 2024"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <LinkIcon className="size-4" />
                  Publication URL
                </label>
                <input
                  type="url"
                  value={research.url || ""}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        ))}
        {researches.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Microscope className="size-12 mx-auto mb-2 opacity-50" />
            <p>
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
