//後台：編輯和新增商品表單：引入左側圖區＋右側主要內容

import ProductImageFields from "./ProductImageFields";

export default function ProductForm({
  register,
  handleSubmit,
  errors,
  onSubmit,
  closeModal,
  isUploading,
  isSubmitting,
  uploadImage,
  imageUrl,
  fields,
  imagesUrl,
  append,
  remove,
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <ProductImageFields
          isUploading={isUploading}
          uploadImage={uploadImage}
          register={register}
          imageUrl={imageUrl}
          fields={fields}
          imagesUrl={imagesUrl}
          append={append}
          remove={remove}
        />

        <div className="col-sm-8">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              標題
            </label>
            <input
              id="title"
              type="text"
              className="form-control"
              placeholder="請輸入標題"
              {...register("title", {
                required: "必填：請輸入標題",
              })}
            />
            {errors.title && (
              <p className="text-danger mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="category" className="form-label">
                分類
              </label>
              <input
                id="category"
                type="text"
                className="form-control"
                placeholder="請輸入分類"
                {...register("category", {
                  required: "必填：請輸入分類",
                })}
              />
              {errors.category && (
                <p className="text-danger mt-1">{errors.category.message}</p>
              )}
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="unit" className="form-label">
                單位
              </label>
              <input
                id="unit"
                type="text"
                className="form-control"
                placeholder="請輸入單位"
                {...register("unit", {
                  required: "必填：請輸入單位",
                })}
              />
              {errors.unit && (
                <p className="text-danger mt-1">{errors.unit.message}</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="origin_price" className="form-label">
                原價
              </label>
              <input
                id="origin_price"
                type="number"
                min="0"
                className="form-control"
                placeholder="請輸入原價"
                {...register("origin_price", {
                  required: "必填：請輸入原價",
                  min: {
                    value: 0,
                    message: "原價不可小於 0",
                  },
                })}
              />
              {errors.origin_price && (
                <p className="text-danger mt-1">
                  {errors.origin_price.message}
                </p>
              )}
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="price" className="form-label">
                售價
              </label>
              <input
                id="price"
                type="number"
                min="0"
                className="form-control"
                placeholder="請輸入售價"
                {...register("price", {
                  required: "必填：請輸入售價",
                  min: {
                    value: 0,
                    message: "售價不可小於 0",
                  },
                })}
              />
              {errors.price && (
                <p className="text-danger mt-1">{errors.price.message}</p>
              )}
            </div>
          </div>

          <hr />

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              產品描述
            </label>
            <textarea
              id="description"
              className="form-control"
              placeholder="請輸入產品描述"
              {...register("description")}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              說明內容
            </label>
            <textarea
              id="content"
              className="form-control"
              placeholder="請輸入說明內容"
              {...register("content")}
            />
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                id="is_enabled"
                className="form-check-input"
                type="checkbox"
                {...register("is_enabled")}
              />
              <label className="form-check-label" htmlFor="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer px-0 pb-0">
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-bs-dismiss="modal"
          onClick={closeModal}
          disabled={isSubmitting || isUploading}
        >
          取消
        </button>
        <button
          type="submit"
          className="btn btn-info"
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting ? "儲存中..." : "確認"}
        </button>
      </div>
    </form>
  );
}
