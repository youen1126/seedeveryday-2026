import ProductSortSelect from "@/components/front/products/ProductSortSelect";
import ProductsTagFilter from "@/components/front/products/ProductsTagFilter";

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
        <ProductsTagFilter
          availableTags={availableTags}
          selectedTags={selectedTags}
          onToggle={onToggleTag}
        />
      </div>
      <div className="col-md-6">
        <ProductSortSelect value={sortType} onChange={onSortChange} />
      </div>
    </div>
  );
}
