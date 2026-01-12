import React from "react";
import ClassicTemplate from "../assets/templates/ClassicTemplate";
import ModernTemplate from "../assets/templates/ModernTemplate";
import MinimalImageTemplate from "../assets/templates/MinimalImageTemplate";
import MinimalTemplate from "../assets/templates/MinimalTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "classic":
        return <ClassicTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-slate-950 p-6 rounded-lg">
      <div className="sticky top-6">
        <div
          id="resume-preview"
          className={
            "bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden print:shadow-none print:border-none " +
            classes
          }
        >
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between print:hidden">
            <h3 className="text-sm font-semibold text-gray-700">
              Resume Preview
            </h3>
            <div className="flex items-center gap-2">
              {/* <span className="text-xs text-gray-500">A4 Size</span> */}
            </div>
          </div>
          <div className="bg-white">{renderTemplate()}</div>
        </div>
      </div>

      <style>{`
        @page {
          size: letter;
          margin: 0;
        }
        @media print {
          html,
          body {
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }
          body * {
            visibility: hidden;
          }
          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
