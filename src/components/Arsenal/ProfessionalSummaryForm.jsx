import { FileText } from "lucide-react";
import React from "react";

function ProfessionalSummaryForm({ data, onChange }) {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
        <FileText className="size-5 text-indigo-400" />
        Professional Summary
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Write a brief summary of your professional background and key
        achievements
      </p>
      <textarea
        value={data || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm min-h-[120px] resize-y text-white placeholder-gray-500"
        placeholder="Enter your professional summary..."
      />
    </div>
  );
}

export default ProfessionalSummaryForm;
