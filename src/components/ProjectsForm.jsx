import {
  FolderIcon,
  Calendar,
  Link as LinkIcon,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";

function ProjectsForm({ data, onChange }) {
  const projects = data || [];

  const handleAdd = () => {
    onChange([
      ...projects,
      {
        name: "",
        description: "",
        technologies: "",
        start_date: "",
        end_date: "",
        current: false,
        url: "",
        github: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FolderIcon className="size-5" />
          Projects
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Add your personal or professional projects
      </p>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-4 relative"
          >
            {projects.length > 1 && (
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
                  <FolderIcon className="size-4" />
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., E-Commerce Platform"
                  required
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm min-h-[80px] resize-y"
                  placeholder="Describe your project, its purpose, and key features..."
                  required
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Technologies Used
                </label>
                <input
                  type="text"
                  value={project.technologies || ""}
                  onChange={(e) =>
                    handleChange(index, "technologies", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Calendar className="size-4" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={project.start_date || ""}
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
                    value={project.end_date || ""}
                    onChange={(e) =>
                      handleChange(index, "end_date", e.target.value)
                    }
                    disabled={project.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={project.current || false}
                      onChange={(e) =>
                        handleChange(index, "current", e.target.checked)
                      }
                      className="rounded"
                    />
                    Ongoing
                  </label>
                </div>
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <LinkIcon className="size-4" />
                  Project URL
                </label>
                <input
                  type="url"
                  value={project.url || ""}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="https://project-demo.com"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <LinkIcon className="size-4" />
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={project.github || ""}
                  onChange={(e) =>
                    handleChange(index, "github", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FolderIcon className="size-12 mx-auto mb-2 opacity-50" />
            <p>No projects added yet. Click "Add Project" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsForm;
