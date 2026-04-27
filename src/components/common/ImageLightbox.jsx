import { useEffect } from "react";

export default function ImageLightbox({
  isOpen,
  image,
  mobileImage,
  alt,
  onClose,
  ariaLabel,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || `${alt || "圖片"} 放大檢視`}
      onClick={onClose}
    >
      <button
        type="button"
        className="image-lightbox-close"
        aria-label="關閉放大圖片"
        onClick={onClose}
      >
        X
      </button>
      <div className="image-lightbox-content">
        <picture onClick={(e) => e.stopPropagation()}>
          {mobileImage ? (
            <source media="(max-width: 767.98px)" srcSet={mobileImage} />
          ) : null}
          <img
            src={image}
            alt={alt || "放大圖片"}
            className="image-lightbox-image"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
}
