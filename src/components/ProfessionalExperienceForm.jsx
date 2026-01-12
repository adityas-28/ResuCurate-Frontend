import { Briefcase, Calendar, MapPin, Plus, Trash2 } from "lucide-react";
import React from "react";

function ProfessionalExperienceForm({ data, onChange }) {
  const experiences = data || [];

  const handleAdd = () => {
    onChange([
      ...experiences,
      {
        company: "",
        position: "",
        location: "",
        start_date: "",
        end_date: "",
        current: false,
        description: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Briefcase className="size-5" />
          Professional Experience
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Add your work experience and professional roles
      </p>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-4 relative"
          >
            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Briefcase className="size-4" />
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={exp.position || ""}
                  onChange={(e) =>
                    handleChange(index, "position", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Briefcase className="size-4" />
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={exp.company || ""}
                  onChange={(e) =>
                    handleChange(index, "company", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Google Inc."
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <MapPin className="size-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location || ""}
                  onChange={(e) =>
                    handleChange(index, "location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Calendar className="size-4" />
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="month"
                  value={exp.start_date || ""}
                  onChange={(e) =>
                    handleChange(index, "start_date", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  required
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
                    value={exp.end_date || ""}
                    onChange={(e) =>
                      handleChange(index, "end_date", e.target.value)
                    }
                    disabled={exp.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={exp.current || false}
                      onChange={(e) =>
                        handleChange(index, "current", e.target.checked)
                      }
                      className="rounded"
                    />
                    Current
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                value={exp.description || ""}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm min-h-[80px] resize-y"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="size-12 mx-auto mb-2 opacity-50" />
            <p>
              No experience added yet. Click "Add Experience" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfessionalExperienceForm;
