import { Users, Calendar, MapPin, Plus, Trash2 } from "lucide-react";
import React from "react";

function LeadershipForm({ data, onChange }) {
  const leaderships = data || [];

  const handleAdd = () => {
    onChange([
      ...leaderships,
      {
        role: "",
        organization: "",
        location: "",
        start_date: "",
        end_date: "",
        current: false,
        description: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...leaderships];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(leaderships.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Users className="size-5 text-indigo-400" />
          Leadership & Activities
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors border border-indigo-500/30"
        >
          <Plus className="size-4" />
          Add Leadership
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Add your leadership roles, volunteer work, and extracurricular
        activities
      </p>

      <div className="space-y-6">
        {leaderships.map((lead, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg p-4 space-y-4 relative bg-gray-800/50"
          >
            {leaderships.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Users className="size-4 text-indigo-400" />
                  Role/Position <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={lead.role || ""}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., President, Student Council"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Users className="size-4 text-indigo-400" />
                  Organization <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={lead.organization || ""}
                  onChange={(e) =>
                    handleChange(index, "organization", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., University Student Council"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <MapPin className="size-4 text-indigo-400" />
                  Location
                </label>
                <input
                  type="text"
                  value={lead.location || ""}
                  onChange={(e) =>
                    handleChange(index, "location", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., Stanford, CA"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Calendar className="size-4 text-indigo-400" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={lead.start_date || ""}
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
                    value={lead.end_date || ""}
                    onChange={(e) =>
                      handleChange(index, "end_date", e.target.value)
                    }
                    disabled={lead.current}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white disabled:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-400 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={lead.current || false}
                      onChange={(e) =>
                        handleChange(index, "current", e.target.checked)
                      }
                      className="rounded bg-gray-800 border-gray-600 text-indigo-600 focus:ring-indigo-500"
                    />
                    Current
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                value={lead.description || ""}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm min-h-[80px] resize-y text-white placeholder-gray-500"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
        {leaderships.length === 0 && (
          <div className="text-center py-8 text-gray-500 border border-gray-700 border-dashed rounded-lg">
            <Users className="size-12 mx-auto mb-2 opacity-50 text-gray-600" />
            <p className="text-gray-400">
              No leadership roles added yet. Click "Add Leadership" to get
              started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadershipForm;
