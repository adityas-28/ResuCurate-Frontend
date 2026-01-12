import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import CareerObjectiveForm from "../components/CareerObjectiveForm";
import ProfessionalExperienceForm from "../components/ProfessionalExperienceForm";
import EducationForm from "../components/EducationForm";
import LeadershipForm from "../components/LeadershipForm";
import ProjectsForm from "../components/ProjectsForm";
import ResearchForm from "../components/ResearchForm";
import CertificationsForm from "../components/CertificationsForm";
import AwardsAndHonorsForm from "../components/AwardsAndHonorsForm";
import SkillsForm from "../components/SkillsForm";
import PublicationsForm from "../components/PublicationsForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";

function ResuBuilder() {
  const { resumeId } = useParams();

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

  const loadExistingResume = async () => {
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

  const toggleSectionIncluded = (sectionId, e) => {
    e.stopPropagation();
    setSectionIncluded((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
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

  useEffect(() => {
    loadExistingResume();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-300 hover:text-slate-400 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {/* Template and Color Picker */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
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

              {/* Add Section Button */}
              <div className="mb-4">
                <button
                  onClick={() => setShowSectionModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Plus className="size-4" />
                  Add Section
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
                <button
                  onClick={handlePrevious}
                  disabled={activeSectionIndex === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="size-4" /> Previous
                </button>
                <span className="text-sm text-gray-500">
                  {activeSectionIndex + 1} of {sections.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={activeSectionIndex === sections.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="border border-blue-500 rounded-lg overflow-hidden shadow-md transition-all"
                    >
                      {/* Section Header with Checkbox */}
                      <div className="w-full flex items-center justify-between p-4 bg-gray-50">
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={isIncluded}
                            onChange={(e) =>
                              toggleSectionIncluded(section.id, e)
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            title="Include this section in resume"
                          />
                          <Icon className="size-5 text-gray-700" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {section.name}
                          </h3>
                        </div>
                      </div>

                      {/* Section Content */}
                      <div className="p-6 border-t border-gray-200">
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
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <ResumePreview
              data={{
                ...resumeData,
                // Filter data based on sectionIncluded checkboxes
                personal_info: sectionIncluded.personal
                  ? resumeData.personal_info
                  : {},
                professional_summary: sectionIncluded.professional_summary
                  ? resumeData.professional_summary
                  : "",
                career_objective: sectionIncluded.career_objective
                  ? resumeData.career_objective
                  : "",
                experience: sectionIncluded.experience
                  ? resumeData.experience
                  : [],
                education: sectionIncluded.education
                  ? resumeData.education
                  : [],
                leadership: sectionIncluded.leadership
                  ? resumeData.leadership
                  : [],
                project: sectionIncluded.projects ? resumeData.project : [],
                research: sectionIncluded.research ? resumeData.research : [],
                certifications: sectionIncluded.certifications
                  ? resumeData.certifications
                  : [],
                awards_and_honors: sectionIncluded.awards_and_honors
                  ? resumeData.awards_and_honors
                  : [],
                skills: sectionIncluded.skills ? resumeData.skills : [],
                publications: sectionIncluded.publications
                  ? resumeData.publications
                  : [],
                sectionIncluded, // Also pass for template reference
              }}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
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
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Select a Section
              </h2>
              <button
                onClick={() => setShowSectionModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600" />
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
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            isActive ? "text-blue-900" : "text-gray-900"
                          }`}
                        >
                          {section.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              isActive
                                ? "bg-blue-200 text-blue-700"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {index + 1} of {sections.length}
                          </span>
                          {isIncluded && (
                            <span className="text-xs text-green-600 font-medium">
                              ✓ Included
                            </span>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <div className="text-blue-600">
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
