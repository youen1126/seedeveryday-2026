//後台：編輯和新增商品表單的左側圖片區

export default function ProductImageFields({
  isUploading,
  uploadImage,
  register,
  imageUrl,
  fields,
  imagesUrl,
  append,
  remove,
}) {
  return (
    <div className="col-sm-4">
      <div className="mb-3">
        <label htmlFor="fileUpload" className="form-label">
          上傳圖片
        </label>
        <input
          className="form-control"
          type="file"
          id="fileUpload"
          accept=".jpg,.jpeg,.png"
          onChange={uploadImage}
          disabled={isUploading}
        />

        {isUploading && (
          <div className="d-flex align-items-center gap-2 mt-2 text-secondary">
            <div
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></div>
            <span>圖片上傳中...</span>
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">
          輸入圖片網址
        </label>
        <input
          id="imageUrl"
          type="text"
          className="form-control"
          placeholder="請輸入圖片連結"
          {...register("imageUrl")}
        />
      </div>

      {imageUrl && <img className="img-fluid" src={imageUrl} alt="主圖" />}

      <div className="mt-3">
        {fields.map((field, index) => (
          <div key={field.id} className="mb-3">
            <label htmlFor={`imagesUrl-${index}`} className="form-label">
              輸入圖片網址
            </label>
            <input
              id={`imagesUrl-${index}`}
              type="text"
              className="form-control"
              placeholder={`圖片網址 ${index + 1}`}
              {...register(`imagesUrl.${index}`)}
            />
            {imagesUrl?.[index] && (
              <img
                className="img-fluid mt-2"
                src={imagesUrl[index]}
                alt={`副圖${index + 1}`}
              />
            )}
          </div>
        ))}

        {fields.length < 5 && imagesUrl?.[fields.length - 1] !== "" && (
          <button
            type="button"
            className="btn btn-outline-info btn-sm d-block w-100"
            onClick={() => append("")}
            disabled={isUploading}
          >
            新增圖片
          </button>
        )}

        <br />

        {fields.length >= 1 && (
          <button
            type="button"
            className="btn btn-outline-warning btn-sm d-block w-100"
            onClick={() => remove(fields.length - 1)}
            disabled={isUploading}
          >
            刪除圖片
          </button>
        )}
      </div>
    </div>
  );
}
