import React from "react";

interface RadioProps {
  id: string;
  label: string;
  description?: string;
  name: string;
  checked?: boolean;
}

const getRadioCss = () => {
  return `
    appearance-none 
    w-6 
    h-6
    mr-2
    bg-white 
    rounded-full 
    outline 
    outline-primary-dark_gray 
    checked:bg-blue 
    checked:border-[0.1875rem] 
    checked:border-white
  `;
};

export default function Radio({
  id,
  label,
  description = "",
  name,
  checked,
}: RadioProps) {
  return (
    <div className="flex items-start">
      <input
        type="radio"
        className={getRadioCss()}
        name={name}
        defaultChecked={checked}
      />
      <div className="flex flex-col mb-[1.93rem]">
        <label htmlFor={id} className="leading-3">
          {label}
        </label>
        <span className="leading-8">{description}</span>
      </div>
    </div>
  );
}
