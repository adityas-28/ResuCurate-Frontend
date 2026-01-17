import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";

function PersonalInfoForm({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: Linkedin,
      type: "url",
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
    },
  ];
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Personal Information
      </h3>
      <p className="text-gray-400 text-sm mb-4">Get started with the personal information</p>
      <div className="flex items-center gap-2 mb-6">
        <label>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-500/50 hover:opacity-80 transition-opacity cursor-pointer"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer transition-colors">
              <User className="size-10 p-2.5 border border-gray-600 rounded-full" /> 
              <span className="text-sm">Upload user image</span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => {
              handleChange("image", e.target.files[0]);
            }}
          />
        </label>
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1 pl-4 text-sm">
            <p className="text-gray-400">Remove Background</p>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={(e) => setRemoveBackground(e.target.checked)}
              />

              {/* Track */}
              <div
                className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
                  removeBackground ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                {/* Knob */}
                <span
                  className={`absolute top-1 h-3 w-3 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    removeBackground
                      ? "translate-x-4 left-1"
                      : "translate-x-0 left-1"
                  }`}
                />
              </div>
            </label>
          </div>
        )}
      </div>
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-2 mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Icon className="size-4 text-indigo-400" />
              {field.label}
              {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm text-white placeholder-gray-500"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PersonalInfoForm;
