import {
  BookOpen,
  Calendar,
  Link as LinkIcon,
  Users,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";

function PublicationsForm({ data, onChange }) {
  const publications = data || [];

  const handleAdd = () => {
    onChange([
      ...publications,
      {
        title: "",
        authors: "",
        journal: "",
        year: "",
        volume: "",
        pages: "",
        doi: "",
        url: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...publications];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(publications.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="size-5" />
          Publications
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus className="size-4" />
          Add Publication
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Add your published papers, articles, and research publications
      </p>

      <div className="space-y-6">
        {publications.map((pub, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-4 relative"
          >
            {publications.length > 1 && (
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
                  <BookOpen className="size-4" />
                  Publication Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={pub.title || ""}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Machine Learning Applications in Healthcare"
                  required
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Users className="size-4" />
                  Authors
                </label>
                <input
                  type="text"
                  value={pub.authors || ""}
                  onChange={(e) =>
                    handleChange(index, "authors", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., John Doe, Jane Smith, et al."
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <BookOpen className="size-4" />
                  Journal/Conference
                </label>
                <input
                  type="text"
                  value={pub.journal || ""}
                  onChange={(e) =>
                    handleChange(index, "journal", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., Nature, IEEE Conference"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Calendar className="size-4" />
                  Year
                </label>
                <input
                  type="number"
                  value={pub.year || ""}
                  onChange={(e) => handleChange(index, "year", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., 2024"
                  min="1900"
                  max="2100"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Volume
                </label>
                <input
                  type="text"
                  value={pub.volume || ""}
                  onChange={(e) =>
                    handleChange(index, "volume", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., 15"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Pages
                </label>
                <input
                  type="text"
                  value={pub.pages || ""}
                  onChange={(e) => handleChange(index, "pages", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., 123-145"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">DOI</label>
                <input
                  type="text"
                  value={pub.doi || ""}
                  onChange={(e) => handleChange(index, "doi", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., 10.1000/xyz123"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <LinkIcon className="size-4" />
                  Publication URL
                </label>
                <input
                  type="url"
                  value={pub.url || ""}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        ))}
        {publications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="size-12 mx-auto mb-2 opacity-50" />
            <p>
              No publications added yet. Click "Add Publication" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicationsForm;
