export default function ProductCategoryFilter({
  categories,
  activeCategory,
  categoryCounts,
  pendingCategory,
  onCategoryChange,
}) {
  return (
    <div className="border border-bottom border-top-0 border-start-0 border-end-0 mb-3 py-2">
      <ul className="list-unstyled mb-0">
        {categories?.map((category) => {
          const isActive = activeCategory === category;

          return (
            <li key={category}>
              <button
                type="button"
                className={`py-2 d-block w-100 text-start bg-transparent border-0 icon-hover font-zh-display ${
                  isActive ? "text-dark fw-bold" : "text-muted"
                }`}
                onClick={() => onCategoryChange(category)}
              >
                <span className="d-inline-flex align-items-center gap-2">
                  <span>{`${category} (${categoryCounts?.[category] ?? 0})`}</span>
                  {pendingCategory === category && (
                    <span
                      className="spinner-border spinner-border-sm text-secondary"
                      role="status"
                      aria-label="分類載入中"
                    ></span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
