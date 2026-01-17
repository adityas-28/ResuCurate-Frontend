import { Award, Calendar, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import React from "react";

function CertificationsForm({ data, onChange }) {
  const certifications = data || [];

  const handleAdd = () => {
    onChange([
      ...certifications,
      {
        name: "",
        issuer: "",
        issue_date: "",
        expiry_date: "",
        credential_id: "",
        url: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Award className="size-5 text-indigo-400" />
          Certifications
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors border border-indigo-500/30"
        >
          <Plus className="size-4" />
          Add Certification
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Add your professional certifications and credentials
      </p>

      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg p-4 space-y-4 relative bg-gray-800/50"
          >
            {certifications.length > 1 && (
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
                  <Award className="size-4 text-indigo-400" />
                  Certification Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={cert.name || ""}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Award className="size-4 text-indigo-400" />
                  Issuing Organization <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={cert.issuer || ""}
                  onChange={(e) =>
                    handleChange(index, "issuer", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., Amazon Web Services"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Calendar className="size-4 text-indigo-400" />
                  Issue Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="month"
                  value={cert.issue_date || ""}
                  onChange={(e) =>
                    handleChange(index, "issue_date", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Calendar className="size-4 text-indigo-400" />
                  Expiry Date
                </label>
                <input
                  type="month"
                  value={cert.expiry_date || ""}
                  onChange={(e) =>
                    handleChange(index, "expiry_date", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white"
                  placeholder="Leave empty if no expiry"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={cert.credential_id || ""}
                  onChange={(e) =>
                    handleChange(index, "credential_id", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="e.g., AWS-12345-ABCD"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <LinkIcon className="size-4 text-indigo-400" />
                  Verification URL
                </label>
                <input
                  type="url"
                  value={cert.url || ""}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        ))}
        {certifications.length === 0 && (
          <div className="text-center py-8 text-gray-500 border border-gray-700 border-dashed rounded-lg">
            <Award className="size-12 mx-auto mb-2 opacity-50 text-gray-600" />
            <p className="text-gray-400">
              No certifications added yet. Click "Add Certification" to get
              started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificationsForm;
