import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/scrollToTop";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    visible && (
      <button
        className={`backToTop ${visible ? "show" : ""}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    )
  );
}
