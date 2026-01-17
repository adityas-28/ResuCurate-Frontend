import { Target } from "lucide-react";
import React from "react";

function CareerObjectiveForm({ data, onChange }) {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
        <Target className="size-5 text-indigo-400" />
        Career Objective
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Describe your career goals and what you aim to achieve
      </p>
      <textarea
        value={data || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm min-h-[120px] resize-y text-white placeholder-gray-500"
        placeholder="Enter your career objective..."
      />
    </div>
  );
}

export default CareerObjectiveForm;
