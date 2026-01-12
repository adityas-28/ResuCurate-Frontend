import { FileText } from "lucide-react";
import React from "react";

function ProfessionalSummaryForm({ data, onChange }) {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <FileText className="size-5" />
        Professional Summary
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Write a brief summary of your professional background and key
        achievements
      </p>
      <textarea
        value={data || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm min-h-[120px] resize-y"
        placeholder="Enter your professional summary..."
      />
    </div>
  );
}

export default ProfessionalSummaryForm;
