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
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Trophy className="size-5" />
          Awards & Honors
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus className="size-4" />
          Add Award
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Add your awards, honors, and recognitions
      </p>

      <div className="space-y-6">
        {awards.map((award, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-4 relative"
          >
            {awards.length > 1 && (
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
                  <Trophy className="size-4" />
                  Award Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={award.title || ""}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Dean's List"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Trophy className="size-4" />
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={award.issuer || ""}
                  onChange={(e) =>
                    handleChange(index, "issuer", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Stanford University"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Calendar className="size-4" />
                  Date Received
                </label>
                <input
                  type="month"
                  value={award.date || ""}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  value={award.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm min-h-[80px] resize-y"
                  placeholder="Additional details about the award..."
                />
              </div>
            </div>
          </div>
        ))}
        {awards.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="size-12 mx-auto mb-2 opacity-50" />
            <p>No awards added yet. Click "Add Award" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AwardsAndHonorsForm;
