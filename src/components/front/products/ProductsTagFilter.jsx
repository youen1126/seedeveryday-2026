export default function ProductsTagFilter({
  availableTags,
  selectedTags,
  onToggle,
}) {
  if (!availableTags.length) {
    return null;
  }

  return (
    <div className="products-tags-row mb-3" aria-label="關鍵字篩選">
      {availableTags.map((tag) => {
        const isActive = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            className={`products-tag-btn font-zh-display ${isActive ? "is-active" : ""}`}
            onClick={() => onToggle(tag)}
            aria-pressed={isActive}
          >
            <span>{tag}</span>
            {isActive && (
              <span className="products-tag-btn__close" aria-hidden="true">
                ×
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
