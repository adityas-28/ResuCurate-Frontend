import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ClassicTemplate from "../assets/templates/ClassicTemplate";

function dateToMonthString(value) {
  if (!value) return "";
  const s = String(value);
  // YYYY-MM-DD -> YYYY-MM
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 7);
  // YYYY-MM -> keep
  if (/^\d{4}-\d{2}$/.test(s)) return s;
  // ISO string / timestamp fallback
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
}

export default function Preview() {
  const { resumeId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [accentColor, setAccentColor] = useState("#3B82F6");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const { data: resumeRow, error: dbError } = await supabase
          .from("resumes")
          .select("file_path")
          .eq("id", resumeId)
          .single();

        if (dbError) throw dbError;
        if (!resumeRow?.file_path) throw new Error("Resume file not found");

        const { data: fileData, error: storageError } = await supabase.storage
          .from("resumes")
          .download(resumeRow.file_path);

        if (storageError) throw storageError;
        const text = await fileData.text();
        const json = JSON.parse(text);

        const mappedProjects = (json.projects || []).map((proj) => ({
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

        const mappedEducation = (json.education || []).map((edu) => ({
          degree: edu.degree || "",
          field: edu.field_of_study || "",
          institution: edu.institution || "",
          location: edu.location || "",
          start_date: dateToMonthString(edu.start_date),
          end_date: dateToMonthString(edu.end_date),
          current: !edu.end_date,
          gpa: edu.gpa ?? "",
          description: edu.description || "",
        }));

        const mappedSkills = (json.skills || [])
          .map((s) => (s && typeof s === "object" ? s.skill : s))
          .filter(Boolean);

        const data = {
          personal_info: json.personal_info || {},
          professional_summary: json.professional_summary || "",
          career_objective:
            json.career_objective ||
            json.personal_info?.career_objective ||
            "",
          experience: json.experience || [],
          education: mappedEducation,
          project: mappedProjects,
          skills: mappedSkills,
          leadership: json.leadership || [],
          research: json.research || [],
          certifications: json.certifications || [],
          awards_and_honors: json.awards_and_honors || json.awards || [],
          publications: json.publications || [],
        };

        setAccentColor(json.accent_color || "#3B82F6");
        setResumeData(data);
      } catch (e) {
        const message = e?.message || "Failed to load resume preview";
        console.error("Preview load error:", e);
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [resumeId]);

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          to="/app/my-resumes"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          Back to My Resumes
        </Link>

        {loading && <div className="text-gray-300">Loading preview...</div>}
        {error && (
          <div className="text-red-400 border border-red-500/30 bg-red-500/10 p-4 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && resumeData && (
          <ClassicTemplate data={resumeData} accentColor={accentColor} />
        )}
      </div>
    </div>
  );
}