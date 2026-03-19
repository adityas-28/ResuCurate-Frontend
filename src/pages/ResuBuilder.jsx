import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  Target,
  Users,
  Microscope,
  Award,
  Trophy,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";
import PersonalInfoForm from "../components/Arsenal/PersonalInfoForm";
import ProfessionalSummaryForm from "../components/Arsenal/ProfessionalSummaryForm";
import CareerObjectiveForm from "../components/Arsenal/CareerObjectiveForm";
import ProfessionalExperienceForm from "../components/Arsenal/ProfessionalExperienceForm";
import EducationForm from "../components/Arsenal/EducationForm";
import LeadershipForm from "../components/Arsenal/LeadershipForm";
import ProjectsForm from "../components/Arsenal/ProjectsForm";
import ResearchForm from "../components/Arsenal/ResearchForm";
import CertificationsForm from "../components/Arsenal/CertificationsForm";
import AwardsAndHonorsForm from "../components/Arsenal/AwardsAndHonorsForm";
import SkillsForm from "../components/Arsenal/SkillsForm";
import PublicationsForm from "../components/Arsenal/PublicationsForm";
import TemplateSelector from "../components/Arsenal/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import { supabase } from "../lib/supabase";

function ResuBuilder() {
  const { resumeId } = useParams();
  const location = useLocation();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    career_objective: "",
    experience: [],
    education: [],
    leadership: [],
    project: [],
    research: [],
    certifications: [],
    awards_and_honors: [],
    skills: [],
    publications: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [sectionIncluded, setSectionIncluded] = useState({
    personal: true,
    professional_summary: true,
    career_objective: true,
    experience: true,
    education: true,
    leadership: true,
    projects: true,
    research: true,
    certifications: true,
    awards_and_honors: true,
    skills: true,
    publications: true,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [showSectionModal, setShowSectionModal] = useState(false);

  const [isArsenal, setIsArsenal] = useState(false);

  useEffect(() => {
    setIsArsenal(resumeId === "arsenal");
    loadExistingResume();
  }, [resumeId]);

  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Information", icon: User },
    {
      id: "professional_summary",
      name: "Professional Summary",
      icon: FileText,
    },
    { id: "career_objective", name: "Career Objective", icon: Target },
    { id: "experience", name: "Professional Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "leadership", name: "Leadership & Activities", icon: Users },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "research", name: "Research Experience", icon: Microscope },
    { id: "certifications", name: "Certifications", icon: Award },
    { id: "awards_and_honors", name: "Awards & Honors", icon: Trophy },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "publications", name: "Publications", icon: BookOpen },
  ];

  useEffect(() => {
    const requested = location?.state?.section;
    if (!requested) return;

    const map = {
      personal_info: "personal",
      project: "projects",
    };

    const normalized = map[requested] || requested;
    const idx = sections.findIndex((s) => s.id === normalized);
    if (idx >= 0) setActiveSectionIndex(idx);
  }, [location?.state?.section]);

  const toggleSectionIncluded = (sectionId, e) => {
    e.stopPropagation();
    setSectionIncluded((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const monthToDateString = (value) => {
    if (!value || typeof value !== "string") return null;
    // <input type="month" /> gives "YYYY-MM"
    if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    return null;
  };

  const parseTechStack = (value) => {
    if (!value || typeof value !== "string") return null;
    const arr = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return arr.length > 0 ? arr : null;
  };

  const dateToMonthString = (value) => {
    if (!value) return "";
    // DB returns YYYY-MM-DD (date) or ISO timestamp; month input needs YYYY-MM
    const s = String(value);
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 7);
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${yyyy}-${mm}`;
  };

  const handleSave = async () => {
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user.id;

    const currentSection = sections[activeSectionIndex].id;

    try {
      switch (currentSection) {
        case "personal":
          {
            const { website, personal_website, ...rest } =
              resumeData.personal_info || {};

            const payload = {
              user_id: userId,
              ...rest,
              // DB column is `personal_website`; keep compatibility with form field `website`
              personal_website: personal_website ?? website ?? null,
            };

            const { error } = await supabase
              .from("personal_details")
              .upsert(payload);
            if (error) {
              console.error("Personal details error:", error);
              alert(error.message);
              return;
            }
          }
          break;

        case "professional_summary":
          {
            const { error } = await supabase
              .from("professional_summary")
              .upsert(
                {
                  user_id: userId,
                  professional_summary: resumeData.professional_summary,
                },
                { onConflict: "user_id" },
              );
            if (error) {
              console.error("Professional summary error:", error);
              alert(error.message);
              return;
            }
          }
          break;

        case "career_objective":
          {
            const { error: deleteError } = await supabase
              .from("career_objectives")
              .delete()
              .eq("user_id", userId);
            if (deleteError) {
              console.error("Career objective delete error:", deleteError);
              alert(deleteError.message);
              return;
            }

            const { error: insertError } = await supabase
              .from("career_objectives")
              .insert({
                user_id: userId,
                career_objective: resumeData.career_objective || null,
              });
            if (insertError) {
              console.error("Career objective error:", insertError);
              alert(insertError.message);
              return;
            }
          }
          break;

        case "experience":
          {
            const { error: deleteError } = await supabase
              .from("professional_experience")
              .delete()
              .eq("user_id", userId);
            if (deleteError) {
              console.error("Experience delete error:", deleteError);
              alert(deleteError.message);
              return;
            }

            const rows = (resumeData.experience || [])
              .filter((exp) => exp && (exp.company || exp.position))
              .map((exp) => ({
                user_id: userId,
                position: exp.position || null,
                company: exp.company || null,
                location: exp.location || null,
                start_date: monthToDateString(exp.start_date),
                end_date: exp.current ? null : monthToDateString(exp.end_date),
                description: exp.description || null,
              }));

            if (rows.length > 0) {
              const { error: insertError } = await supabase
                .from("professional_experience")
                .insert(rows);
              if (insertError) {
                console.error("Experience error:", insertError);
                alert(insertError.message);
                return;
              }
            }
          }
          break;

        case "education":
          {
            const { error: deleteError } = await supabase
              .from("education")
              .delete()
              .eq("user_id", userId);
            if (deleteError) {
              console.error("Education delete error:", deleteError);
              alert(deleteError.message);
              return;
            }

            const rows = (resumeData.education || [])
              .filter((edu) => edu && (edu.degree || edu.institution))
              .map((edu) => ({
                user_id: userId,
                degree: edu.degree || null,
                field_of_study: edu.field || null,
                institution: edu.institution || null,
                location: edu.location || null,
                start_date: monthToDateString(edu.start_date),
                end_date: edu.current ? null : monthToDateString(edu.end_date),
                gpa:
                  edu.gpa === "" || edu.gpa === null || edu.gpa === undefined
                    ? null
                    : Number(edu.gpa),
                description: edu.description || null,
              }))
              .filter((row) => row.gpa === null || Number.isFinite(row.gpa));

            if (rows.length > 0) {
              const { error } = await supabase.from("education").insert(rows);
              if (error) {
                console.error("Education error:", error);
                alert(error.message);
                return;
              }
            }
          }
          break;

        case "projects":
          {
            const { error: deleteError } = await supabase
              .from("projects")
              .delete()
              .eq("user_id", userId);
            if (deleteError) {
              console.error("Projects delete error:", deleteError);
              alert(deleteError.message);
              return;
            }

            const rows = (resumeData.project || [])
              .filter((proj) => proj && proj.name)
              .map((proj) => ({
                user_id: userId,
                project_name: proj.name,
                project_description: proj.description || null,
                tech_stack: parseTechStack(proj.technologies),
                start_date: monthToDateString(proj.start_date),
                end_date: proj.current ? null : monthToDateString(proj.end_date),
                github_url: proj.github || null,
                project_url: proj.url || null,
              }));

            if (rows.length > 0) {
              const { error } = await supabase.from("projects").insert(rows);
              if (error) {
                console.error("Projects error:", error);
                alert(error.message);
                return;
              }
            }
          }
          break;

        case "skills":
          {
            const { error: deleteError } = await supabase
              .from("skills")
              .delete()
              .eq("user_id", userId);
            if (deleteError) {
              console.error("Skills delete error:", deleteError);
              alert(deleteError.message);
              return;
            }

            const rows = (resumeData.skills || [])
              .map((skill) => (typeof skill === "string" ? skill.trim() : null))
              .filter(Boolean)
              .map((skill) => ({ user_id: userId, skill }));

            if (rows.length > 0) {
              const { error } = await supabase.from("skills").insert(rows);
              if (error) {
                console.error("Skills error:", error);
                alert(error.message);
                return;
              }
            }
          }
          break;

        default:
          alert("Section save not implemented yet");
      }

      alert(`${currentSection} saved ✅`);
    } catch (err) {
      console.error(err);
      alert("Error saving section");
    }
  };

  const handlePrevious = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    }
  };

  const navigateToSection = (index) => {
    setActiveSectionIndex(index);
    setShowSectionModal(false);
  };

  const loadExistingResume = async () => {
    if (resumeId === "arsenal") {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id;
      if (!userId) return;

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
        publications,
      ] = await Promise.all([
        supabase.from("personal_details").select("*").eq("user_id", userId).single(),
        supabase
          .from("professional_summary")
          .select("*")
          .eq("user_id", userId)
          .single(),
        supabase.from("career_objectives").select("*").eq("user_id", userId),
        supabase.from("professional_experience").select("*").eq("user_id", userId),
        supabase.from("education").select("*").eq("user_id", userId),
        supabase.from("leadership").select("*").eq("user_id", userId),
        supabase.from("projects").select("*").eq("user_id", userId),
        supabase.from("research").select("*").eq("user_id", userId),
        supabase.from("certifications").select("*").eq("user_id", userId),
        supabase.from("achievements").select("*").eq("user_id", userId),
        supabase.from("skills").select("*").eq("user_id", userId),
        supabase.from("publications").select("*").eq("user_id", userId),
      ]);

      const personalInfo = personal.data || {};
      const mappedPersonal = {
        ...personalInfo,
        // form commonly uses `website`; DB uses `personal_website`
        website: personalInfo.website ?? personalInfo.personal_website ?? "",
      };

      const objectiveText =
        objective.data && Array.isArray(objective.data) && objective.data.length > 0
          ? objective.data[0]?.career_objective || ""
          : "";

      const mappedExperience = (experience.data || []).map((exp) => ({
        company: exp.company || "",
        position: exp.position || "",
        location: exp.location || "",
        start_date: dateToMonthString(exp.start_date),
        end_date: dateToMonthString(exp.end_date),
        current: !exp.end_date,
        description: exp.description || "",
      }));

      const mappedEducation = (education.data || []).map((edu) => ({
        degree: edu.degree || "",
        field: edu.field_of_study || "",
        institution: edu.institution || "",
        location: edu.location || "",
        start_date: dateToMonthString(edu.start_date),
        end_date: dateToMonthString(edu.end_date),
        current: !edu.end_date,
        gpa:
          edu.gpa === null || edu.gpa === undefined ? "" : String(edu.gpa),
        description: edu.description || "",
      }));

      const mappedProjects = (projects.data || []).map((proj) => ({
        name: proj.project_name || "",
        description: proj.project_description || "",
        technologies: Array.isArray(proj.tech_stack)
          ? proj.tech_stack.join(", ")
          : "",
        start_date: dateToMonthString(proj.start_date),
        end_date: dateToMonthString(proj.end_date),
        current: !proj.end_date,
        url: proj.project_url || "",
        github: proj.github_url || "",
      }));

      const mappedSkills = (skills.data || []).map((s) => s.skill).filter(Boolean);

      setResumeData((prev) => ({
        ...prev,
        _id: "arsenal",
        title: "My Arsenal",
        template: "arsenal",
        personal_info: mappedPersonal,
        professional_summary: summary.data?.professional_summary || "",
        career_objective: objectiveText,
        experience: mappedExperience,
        education: mappedEducation,
        leadership: leadership.data || [],
        project: mappedProjects,
        research: research.data || [],
        certifications: certifications.data || [],
        awards_and_honors: achievements.data || [],
        skills: mappedSkills,
        publications: publications.data || [],
      }));
      document.title = "My Arsenal - ResuCurate";
      return;
    }

    // Check if it's a generated ID (from our Dashboard mock)
    if (resumeId && resumeId.startsWith("generated-")) {
      setResumeData({
        ...resumeData,
        _id: resumeId,
        title: "Generated Resume",
        // Load random subset of data to simulate "generation"
        ...dummyResumeData[0],
        personal_info: dummyResumeData[0].personal_info,
      });
      document.title = "Generated Resume - ResuCurate";
      return;
    }

    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData({
        ...resumeData,
        ...resume,
        professional_summary: resume.professional_summary || "",
        career_objective: resume.career_objective || "",
        leadership: resume.leadership || [],
        research: resume.research || [],
        certifications: resume.certifications || [],
        awards_and_honors: resume.awards_and_honors || [],
        publications: resume.publications || [],
      });
      document.title = resume.title;
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>

        {/* Form Container */}
        <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 p-6 md:p-8">
          {/* Template and Color Picker */}
          {!isArsenal && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-700 pb-4">
              <TemplateSelector
                selectedTemplate={resumeData.template}
                onChange={(template) =>
                  setResumeData((prev) => ({ ...prev, template }))
                }
              />
              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(color) =>
                  setResumeData((prev) => ({
                    ...prev,
                    accent_color: color,
                  }))
                }
              />
            </div>
          )}

          {/* Add Section Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowSectionModal(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors font-medium"
            >
              <Plus className="size-5" />
              Choose Section to Add
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
            <button
              onClick={handlePrevious}
              disabled={activeSectionIndex === 0}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            <span className="text-sm text-gray-400">
              {activeSectionIndex + 1} of {sections.length}
            </span>
            <button
              onClick={handleNext}
              disabled={activeSectionIndex === sections.length - 1}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Active Form Section Only */}
          <div>
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isIncluded = sectionIncluded[section.id];
              const isActive = activeSectionIndex === index;

              if (!isActive) return null;

              return (
                <div
                  key={section.id}
                  id={`section-${section.id}`}
                  className="border border-indigo-500/50 rounded-lg overflow-hidden shadow-lg transition-all bg-gray-800/50"
                >
                  {/* Section Header with Checkbox */}
                  <div className="w-full flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={isIncluded}
                        onChange={(e) => toggleSectionIncluded(section.id, e)}
                        className="w-4 h-4 text-indigo-600 border-gray-500 rounded focus:ring-indigo-500 cursor-pointer bg-gray-700"
                        title="Include this section in resume"
                      />
                      <Icon className="size-5 text-indigo-400" />
                      <h3 className="text-lg font-semibold text-white">
                        {section.name}
                      </h3>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="p-6 bg-gray-900">
                    {section.id === "personal" && (
                      <PersonalInfoForm
                        data={resumeData.personal_info}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal_info: data,
                          }))
                        }
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
                      />
                    )}

                    {section.id === "professional_summary" && (
                      <ProfessionalSummaryForm
                        data={resumeData.professional_summary}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            professional_summary: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "career_objective" && (
                      <CareerObjectiveForm
                        data={resumeData.career_objective}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            career_objective: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "experience" && (
                      <ProfessionalExperienceForm
                        data={resumeData.experience}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            experience: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "education" && (
                      <EducationForm
                        data={resumeData.education}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            education: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "leadership" && (
                      <LeadershipForm
                        data={resumeData.leadership}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            leadership: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "projects" && (
                      <ProjectsForm
                        data={resumeData.project}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            project: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "research" && (
                      <ResearchForm
                        data={resumeData.research}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            research: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "certifications" && (
                      <CertificationsForm
                        data={resumeData.certifications}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            certifications: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "awards_and_honors" && (
                      <AwardsAndHonorsForm
                        data={resumeData.awards_and_honors}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            awards_and_honors: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "skills" && (
                      <SkillsForm
                        data={resumeData.skills}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            skills: data,
                          }))
                        }
                      />
                    )}

                    {section.id === "publications" && (
                      <PublicationsForm
                        data={resumeData.publications}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            publications: data,
                          }))
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isArsenal && (
            <button
              onClick={handleSave}
              className="mt-6 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-medium"
            >
              Save {sections[activeSectionIndex].name}
            </button>
          )}
        </div>
      </div>

      {/* Section Selection Modal */}
      {showSectionModal && (
        <div
          onClick={() => setShowSectionModal(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                Select a Section
              </h2>
              <button
                onClick={() => setShowSectionModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-400" />
              </button>
            </div>

            {/* Sections List */}
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  const isActive = activeSectionIndex === index;
                  const isIncluded = sectionIncluded[section.id];

                  return (
                    <button
                      key={section.id}
                      onClick={() => navigateToSection(index)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                        isActive
                          ? "border-indigo-500 bg-indigo-500/20"
                          : "border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isActive
                            ? "bg-indigo-500/30 text-indigo-400"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            isActive ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {section.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              isActive
                                ? "bg-indigo-500/30 text-indigo-300"
                                : "bg-gray-800 text-gray-500"
                            }`}
                          >
                            {index + 1} of {sections.length}
                          </span>
                          {isIncluded && (
                            <span className="text-xs text-green-400 font-medium">
                              ✓ Included
                            </span>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <div className="text-indigo-400">
                          <ChevronRight className="size-5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResuBuilder;
