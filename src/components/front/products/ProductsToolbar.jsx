import ProductSortSelect from "@/components/front/ProductSortSelect";

export default function ProductsToolbar({
  hasInvalidCategory,
  categoryFromQuery,
  availableTags,
  selectedTags,
  onToggleTag,
  sortType,
  onSortChange,
}) {
  return (
    <div className="row">
      <div className="col-md-6">
        {hasInvalidCategory && (
          <p className="text-muted mb-3 font-zh-display">
            查無分類「{categoryFromQuery}」，以下顯示全部商品。
          </p>
        )}
        {availableTags.length > 0 && (
          <div className="products-tags-row mb-3" aria-label="關鍵字篩選">
            {availableTags.map((tag) => {
              const isActive = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`products-tag-btn font-zh-display ${isActive ? "is-active" : ""}`}
                  onClick={() => onToggleTag(tag)}
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
        )}
      </div>
      <div className="col-md-6">
        <ProductSortSelect value={sortType} onChange={onSortChange} />
      </div>
    </div>
  );
}
