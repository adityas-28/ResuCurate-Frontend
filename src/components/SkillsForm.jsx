import { Sparkles, Plus, X } from "lucide-react";
import React, { useState } from "react";

function SkillsForm({ data, onChange }) {
  const skills = data || [];
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemove = (skillToRemove) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
        <Sparkles className="size-5" />
        Skills
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Add your technical and professional skills
      </p>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
            placeholder="Enter a skill (e.g., JavaScript, Python, Leadership)"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus className="size-4" />
            Add
          </button>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 p-4 border border-gray-200 rounded-lg min-h-[100px]">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemove(skill)}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
            <Sparkles className="size-12 mx-auto mb-2 opacity-50" />
            <p>No skills added yet. Add your first skill above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillsForm;
