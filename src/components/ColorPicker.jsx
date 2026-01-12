import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" }, // Blue-500
    { name: "Indigo", value: "#6366F1" }, // Indigo-500
    { name: "Purple", value: "#8B5CF6" }, // Purple-500
    { name: "Cyan", value: "#06B6D4" }, // Cyan-500
    { name: "Green", value: "#22C55E" }, // Green-500
    { name: "Olive", value: "#84A98C" }, // Olive (custom, muted)
    { name: "Red", value: "#EF4444" }, // Red-500
    { name: "Orange", value: "#F97316" }, // Orange-500
    { name: "Yellow", value: "#EAB308" }, // Yellow-500
    { name: "Black", value: "#111827" }, // Near-black (better than pure #000)
    { name: "Gray", value: "#6B7280" }, // Gray-500
    { name: "Lavender", value: "#C4B5FD" }, // Lavender
    { name: "Pink", value: "#EC4899" }, // Pink-500
    { name: "Teal", value: "#14B8A6" }, // Teal-500
    { name: "Mustard", value: "#D97706" }, // Mustard / Amber-600
    { name: "Emerald", value: "#10B981" }, // Emerald-500
    { name: "Brown", value: "#92400E" }, // Brown / Amber-800
    { name: "Navy", value: "#1E3A8A" },
    { name: "Slate", value: "#334155" },
    { name: "Burgundy", value: "#7F1D1D" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-b1ack/25 transition-colors"
                style={{ backgroundColor: color.value }}
              ></div>
              {selectedColor === color.value && (
                <div className="absolute inset-0 top-0 bottom-4.5 left-0 rigth-0  flex items-center justify-center">
                  <Check className="size-5 text-white" />
                </div>
              )}
              <p className="text-xs text-center mt-1 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
