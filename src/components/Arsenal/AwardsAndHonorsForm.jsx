import { Trophy, Calendar, Plus, Trash2 } from "lucide-react";
import React from "react";

function AwardsAndHonorsForm({ data, onChange }) {
  const awards = data || [];

  const handleAdd = () => {
    onChange([
      ...awards,
      {
        title: "",
        issuer: "",
        date: "",
        description: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...awards];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(awards.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="size-5 text-indigo-400" />
          Awards & Honors
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors border border-indigo-500/30"
        >
          <Plus className="size-4" />
          Add Award
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Add your awards, honors, and recognitions
      </p>

      <div className="space-y-6">
        {awards.map((award, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg p-4 space-y-4 relative bg-gray-800/50"
          >
            {awards.length > 1 && (
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
                  <Trophy className="size-4 text-indigo-400" />
                  Award Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={award.title || ""}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., Dean's List"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Trophy className="size-4 text-indigo-400" />
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={award.issuer || ""}
                  onChange={(e) =>
                    handleChange(index, "issuer", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., Stanford University"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Calendar className="size-4 text-indigo-400" />
                  Date Received
                </label>
                <input
                  type="month"
                  value={award.date || ""}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  value={award.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm min-h-[80px] resize-y text-white placeholder-gray-500"
                  placeholder="Additional details about the award..."
                />
              </div>
            </div>
          </div>
        ))}
        {awards.length === 0 && (
          <div className="text-center py-8 text-gray-500 border border-gray-700 border-dashed rounded-lg">
            <Trophy className="size-12 mx-auto mb-2 opacity-50 text-gray-600" />
            <p className="text-gray-400">No awards added yet. Click "Add Award" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AwardsAndHonorsForm;
