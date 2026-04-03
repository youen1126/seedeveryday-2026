import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import useMessage from "@/hooks/useMessage";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultProduct = {
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
  description: "",
  content: "",
  is_enabled: 0,
  imageUrl: "",
  imagesUrl: [""],
};

export default function ProductModal({
  modalType,
  templeteProduct,
  closeModal,
  getProducts,
}) {
  const { showSuccess, showError } = useMessage();
  const [uploadLoading, setUploadLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultProduct,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "imagesUrl",
  });

  const imageUrl = watch("imageUrl");
  const imagesUrl = watch("imagesUrl");

  useEffect(() => {
    if (templeteProduct) {
      reset({
        ...defaultProduct,
        ...templeteProduct,
        is_enabled: !!templeteProduct.is_enabled,
        imagesUrl:
          templeteProduct.imagesUrl?.length > 0
            ? templeteProduct.imagesUrl
            : [""],
      });
    }
  }, [templeteProduct, reset]);

  const delProduct = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`);
      await getProducts();
      showSuccess("刪除成功");
      closeModal();
    } catch (error) {
      console.error("沒刪除成功，請查看 error", error);
      showError("刪除失敗");
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadLoading(true);

      const formData = new FormData();
      formData.append("file-to-upload", file);

      const res = await axios.post(
        `${API_BASE}/api/${API_PATH}/admin/upload`,
        formData,
      );

      setValue("imageUrl", res.data.imageUrl);
      showSuccess("圖片上傳成功");
    } catch (error) {
      showError("上傳圖片失敗");
      console.error(error.response || error);
    } finally {
      setUploadLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    let url = `${API_BASE}/api/${API_PATH}/admin/product`;
    let method = "post";

    if (modalType === "edit") {
      url = `${API_BASE}/api/${API_PATH}/admin/product/${formData.id}`;
      method = "put";
    }

    const productData = {
      data: {
        ...formData,
        origin_price: Number(formData.origin_price),
        price: Number(formData.price),
        is_enabled: formData.is_enabled ? 1 : 0,
        imagesUrl: formData.imagesUrl.filter((url) => url !== ""),
      },
    };

    try {
      setUploadLoading(true);
      await axios[method](url, productData);
      await getProducts();
      showSuccess("產品已儲存");
      closeModal();
    } catch (error) {
      console.error(error.response || error);
      showError("產品儲存失敗");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <>
      {uploadLoading && (
        <div className="text-center mt-2">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content border-0">
            <div
              className={`modal-header btn-un-${modalType === "delete" ? "danger" : "produck"} text-white`}
            >
              <h5 id="productModalLabel" className="modal-title">
                <span>
                  {modalType === "delete"
                    ? "刪除"
                    : modalType === "edit"
                      ? "編輯"
                      : "新增"}
                  產品
                </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {modalType === "delete" ? (
                <p className="fs-4">
                  確定要刪除
                  <span className="text-danger">{templeteProduct?.title}</span>
                  嗎？
                </p>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    {/* 左側 */}
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
                          disabled={uploadLoading}
                        />
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

                      {imageUrl && (
                        <img className="img-fluid" src={imageUrl} alt="主圖" />
                      )}

                      <div className="mt-3">
                        {fields.map((field, index) => (
                          <div key={field.id} className="mb-3">
                            <label
                              htmlFor={`imagesUrl-${index}`}
                              className="form-label"
                            >
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

                        {fields.length < 5 &&
                          imagesUrl?.[fields.length - 1] !== "" && (
                            <button
                              type="button"
                              className="btn btn-outline-info btn-sm d-block w-100"
                              onClick={() => append("")}
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
                          >
                            刪除圖片
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 右側 */}
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
                          <p className="text-danger mt-1">
                            {errors.title.message}
                          </p>
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
                            <p className="text-danger mt-1">
                              {errors.category.message}
                            </p>
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
                            <p className="text-danger mt-1">
                              {errors.unit.message}
                            </p>
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
                            <p className="text-danger mt-1">
                              {errors.price.message}
                            </p>
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
                          <label
                            className="form-check-label"
                            htmlFor="is_enabled"
                          >
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
                    >
                      取消
                    </button>
                    <button type="submit" className="btn btn-info">
                      確認
                    </button>
                  </div>
                </form>
              )}
            </div>

            {modalType === "delete" && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => delProduct(templeteProduct.id)}
                >
                  刪除
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
