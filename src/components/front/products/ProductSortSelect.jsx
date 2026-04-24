export default function ProductSortSelect({ value, onChange }) {
  return (
    <div className="product-sort-select d-flex align-items-center justify-content-md-end justify-content-start mb-3 gap-2">
      <label
        htmlFor="product-sort"
        className="product-sort-select__label mb-0 text-muted font-zh-display"
      >
        排序方式
      </label>
      <select
        id="product-sort"
        className="form-select form-select-sm w-auto product-sort-select__control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="highToLow">價錢由高到低</option>
        <option value="lowToHigh">價錢由低到高</option>
        <option value="random">熱門</option>
      </select>
    </div>
  );
}
