import React from "react";

export default function RecommendIcon({
  size = 12,
  fill = "#3E73FB",
}: {
  size?: number;
  fill?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5627 5.99861L11.1933 4.4158L11.4373 2.31185L9.29453 1.86833L8.19404 0L6.28136 0.884269L4.36868 0L3.28205 1.8711L1.12543 2.31462L1.36937 4.41857L0 5.99861L1.36937 7.59529L1.12543 9.69924L3.28205 10.1428L4.36868 12L6.28136 11.1157L8.19404 12L9.29453 10.1428L11.4373 9.69924L11.1933 7.59529L12.5627 5.99861ZM5.68538 8.03881L3.5343 5.90159L4.37145 5.08108L5.68815 6.45322L8.20513 3.96396L9.03396 4.71795L5.68538 8.03604V8.03881Z"
        fill={fill}
      />
    </svg>
  );
}
