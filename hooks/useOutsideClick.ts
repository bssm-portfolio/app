import { useEffect, useRef } from "react";

const useOutsideClick = <HtmlRefType extends HTMLElement>({
  click,
}: {
  click: () => void;
}) => {
  const htmlRef = useRef<HtmlRefType>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      if (htmlRef.current && !htmlRef.current.contains(target)) click();
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [htmlRef, click]);

  return { ref: htmlRef };
};

export default useOutsideClick;
