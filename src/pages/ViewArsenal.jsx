import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  X,
  Pencil,
  Trash2,
  User,
  FileText,
  Target,
  Briefcase,
  GraduationCap,
  Users,
  FolderIcon,
  Microscope,
  Award,
  Trophy,
  Sparkles,
  BookOpen,
} from "lucide-react";
// import { dummyResumeData } from "../assets/assets";
import { supabase } from "../lib/supabase";

const sectionIcons = {
  personal_info: User,
  professional_summary: FileText,
  career_objective: Target,
  experience: Briefcase,
  education: GraduationCap,
  leadership: Users,
  project: FolderIcon,
  research: Microscope,
  certifications: Award,
  awards_and_honors: Trophy,
  skills: Sparkles,
  publications: BookOpen,
};

const sectionNames = {
  personal_info: "Personal Information",
  professional_summary: "Professional Summary",
  career_objective: "Career Objective",
  experience: "Professional Experience",
  education: "Education",
  leadership: "Leadership & Activities",
  project: "Projects",
  research: "Research Experience",
  certifications: "Certifications",
  awards_and_honors: "Awards & Honors",
  skills: "Skills",
  publications: "Publications",
};

export default function ViewArsenal() {
  const navigate = useNavigate();
  const [arsenalData, setArsenalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSections, setFilteredSections] = useState({});

  useEffect(() => {
    loadArsenalData();
  }, []);

  useEffect(() => {
    filterArsenalData();
  }, [searchQuery, arsenalData]);

  const loadArsenalData = async () => {
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user.id;
  
    const [
      personal,
      summary,
      objective,
      experience,
      education,
      leadership,
      projects,
      research,
      certifications,
      achievements,
      skills,
      publications
    ] = await Promise.all([
      supabase.from("personal_details").select("*").eq("user_id", userId).single(),
      supabase.from("professional_summary").select("*").eq("user_id", userId).single(),
      supabase.from("career_objectives").select("*").eq("user_id", userId).single(),
      supabase.from("professional_experience").select("*").eq("user_id", userId),
      supabase.from("education").select("*").eq("user_id", userId),
      supabase.from("leadership").select("*").eq("user_id", userId),
      supabase.from("projects").select("*").eq("user_id", userId),
      supabase.from("research").select("*").eq("user_id", userId),
      supabase.from("certifications").select("*").eq("user_id", userId),
      supabase.from("achievements").select("*").eq("user_id", userId),
      supabase.from("skills").select("*").eq("user_id", userId),
      supabase.from("publications").select("*").eq("user_id", userId)
    ]);
  
    const arsenal = {
      personal_info: personal.data,
      professional_summary: summary.data?.professional_summary || "",
      career_objective: objective.data?.career_objective || "",
      experience: experience.data || [],
      education: education.data || [],
      leadership: leadership.data || [],
      project: projects.data || [],
      research: research.data || [],
      certifications: certifications.data || [],
      awards_and_honors: achievements.data || [],
      skills: skills.data ? skills.data.map((s) => s.skill) : [],
      publications: publications.data || []
    };
  
    setArsenalData(arsenal);
  };

  const filterArsenalData = () => {
    if (!arsenalData) return;

    if (!searchQuery.trim()) {
      setFilteredSections(arsenalData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = {};

    // Filter personal info
    if (arsenalData.personal_info) {
      const personalStr = JSON.stringify(
        arsenalData.personal_info,
      ).toLowerCase();
      if (personalStr.includes(query)) {
        filtered.personal_info = arsenalData.personal_info;
      }
    }

    // Filter strings
    ["professional_summary", "career_objective"].forEach((key) => {
      if (arsenalData[key] && arsenalData[key].toLowerCase().includes(query)) {
        filtered[key] = arsenalData[key];
      }
    });

    // Filter arrays
    [
      "experience",
      "education",
      "leadership",
      "project",
      "research",
      "certifications",
      "awards_and_honors",
      "publications",
    ].forEach((key) => {
      if (arsenalData[key] && Array.isArray(arsenalData[key])) {
        const filteredItems = arsenalData[key].filter((item) => {
          const itemStr = JSON.stringify(item).toLowerCase();
          return itemStr.includes(query);
        });
        if (filteredItems.length > 0) {
          filtered[key] = filteredItems;
        }
      }
    });

    // Filter skills array
    if (arsenalData.skills && Array.isArray(arsenalData.skills)) {
      const filteredSkills = arsenalData.skills.filter((skill) =>
        skill.toLowerCase().includes(query),
      );
      if (filteredSkills.length > 0) {
        filtered.skills = filteredSkills;
      }
    }

    setFilteredSections(filtered);
  };

  const handleEdit = (section, itemId = null) => {
    // Navigate to builder with section focus
    navigate("/app/builder/arsenal", {
      state: { section, itemId },
    });
  };

  const handleDelete = async (section, itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
  
    const tableMap = {
      experience: "professional_experience",
      education: "education",
      leadership: "leadership",
      project: "projects",
      research: "research",
      certifications: "certifications",
      awards_and_honors: "achievements",
      publications: "publications",
    };
  
    try {
      if (section === "skills") {
        // Special case: skills table
        const { data: authData } = await supabase.auth.getUser();
        const userId = authData.user.id;
  
        const skillToDelete = arsenalData.skills[itemId];
  
        await supabase
          .from("skills")
          .delete()
          .eq("user_id", userId)
          .eq("skill", skillToDelete);
      } else {
        const table = tableMap[section];
  
        await supabase
          .from(table)
          .delete()
          .eq("id", itemId);
      }
  
      // Reload data after delete
      loadArsenalData();
    } catch (err) {
      console.error(err);
      alert("Error deleting item");
    }
  };

  const renderItem = (section, item, index) => {
    switch (section) {
      case "experience":
        return (
          <div
            key={item.id || index}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-white font-semibold">{item.position}</h4>
                <p className="text-gray-400 text-sm">{item.company}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {item.start_date} - {item.end_date}
                </p>
                {item.description && (
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(section, item.id)}
                  className="p-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded transition-colors"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleDelete(section, item.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case "education":
        return (
          <div
            key={item.id || index}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-white font-semibold">
                  {item.degree} {item.field && `in ${item.field}`}
                </h4>
                <p className="text-gray-400 text-sm">{item.institution}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {item.graduation_date} {item.gpa && `• GPA: ${item.gpa}`}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(section, item.id)}
                  className="p-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded transition-colors"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleDelete(section, item.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case "project":
        return (
          <div
            key={item.id || index}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-white font-semibold">
                  {item.project_name || item.name}
                </h4>
                {item.project_description && (
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                    {item.project_description}
                  </p>
                )}
                {Array.isArray(item.tech_stack) && item.tech_stack.length > 0 && (
                  <p className="text-gray-400 text-xs mt-2">
                    Tech: {item.tech_stack.join(", ")}
                  </p>
                )}
                {(item.project_url || item.github_url) && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs">
                    {item.project_url && (
                      <a
                        href={item.project_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                      >
                        Live
                      </a>
                    )}
                    {item.github_url && (
                      <a
                        href={item.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(section, item.id)}
                  className="p-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded transition-colors"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleDelete(section, item.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case "skills":
        return (
          <div
            key={index}
            className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2"
          >
            <span className="text-white text-sm">{item}</span>
            <button
              onClick={() => handleDelete(section, index)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="size-3" />
            </button>
          </div>
        );

      default:
        return (
          <div
            key={item.id || index}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-300 text-sm">
                  {JSON.stringify(item, null, 2).substring(0, 100)}...
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(section, item.id)}
                  className="p-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded transition-colors"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleDelete(section, item.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderSection = (sectionKey, data) => {
    if (!data) return null;

    const Icon = sectionIcons[sectionKey];
    const sectionName = sectionNames[sectionKey];

    // Handle personal info (object)
    if (sectionKey === "personal_info" && typeof data === "object") {
      return (
        <div key={sectionKey} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {Icon && <Icon className="size-5 text-indigo-400" />}
            <h2 className="text-xl font-bold text-white">{sectionName}</h2>
            <button
              onClick={() => handleEdit(sectionKey)}
              className="ml-auto p-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded transition-colors"
            >
              <Pencil className="size-4" />
            </button>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                  <span className="text-gray-400 text-sm capitalize">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <p className="text-white text-sm mt-1">{value || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Handle string fields
    if (typeof data === "string" && data.trim()) {
      return (
        <div key={sectionKey} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {Icon && <Icon className="size-5 text-indigo-400" />}
            <h2 className="text-xl font-bold text-white">{sectionName}</h2>
            <button
              onClick={() => handleEdit(sectionKey)}
              className="ml-auto p-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded transition-colors"
            >
              <Pencil className="size-4" />
            </button>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-300">{data}</p>
          </div>
        </div>
      );
    }

    // Handle arrays
    if (Array.isArray(data) && data.length > 0) {
      return (
        <div key={sectionKey} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {Icon && <Icon className="size-5 text-indigo-400" />}
            <h2 className="text-xl font-bold text-white">
              {sectionName} ({data.length})
            </h2>
          </div>
          <div className="space-y-3">
            {sectionKey === "skills"
              ? data.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 mr-2 mb-2"
                  >
                    <span className="text-white text-sm">{skill}</span>
                    <button
                      onClick={() => handleDelete(sectionKey, index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))
              : data.map((item, index) => renderItem(sectionKey, item, index))}
          </div>
        </div>
      );
    }

    return null;
  };

  const sectionsToShow = [
    "personal_info",
    "professional_summary",
    "career_objective",
    "experience",
    "education",
    "leadership",
    "project",
    "research",
    "certifications",
    "awards_and_honors",
    "skills",
    "publications",
  ];

  const displayData = searchQuery ? filteredSections : arsenalData;

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Arsenal</h1>
              <p className="text-gray-400">
                View and manage all your resume content in one place
              </p>
            </div>
            <button
              onClick={() => navigate("/app/builder/arsenal")}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="size-5" />
              <span>Add Item</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items in your arsenal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {!displayData || Object.keys(displayData).length === 0 ? (
          <div className="text-center py-16">
            <FileText className="size-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {searchQuery ? "No items found" : "Your arsenal is empty"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Try adjusting your search query"
                : "Start building your arsenal by adding items"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => navigate("/app/builder/arsenal")}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center gap-2 mx-auto"
              >
                <Plus className="size-5" />
                <span>Add Your First Item</span>
              </button>
            )}
          </div>
        ) : (
          <div>
            {sectionsToShow.map((sectionKey) => {
              const data = displayData[sectionKey];
              return renderSection(sectionKey, data);
            })}
          </div>
        )}
      </div>
    </div>
  );
}
