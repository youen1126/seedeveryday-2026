import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import useMessage from "@/hooks/useMessage";
import ProductForm from "./productModal/ProductForm";
import {
  createAdminProductApi,
  deleteAdminProductApi,
  updateAdminProductApi,
  uploadAdminProductImageApi,
} from "@/services/adminProduct";
import {
  defaultProduct,
  mapFormValuesToProductPayload,
  mapProductToFormValues,
} from "@/utils/admin/productFormAdapter";

export default function ProductModal({
  modalType,
  templateProduct,
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
    if (templateProduct) {
      reset(mapProductToFormValues(templateProduct));
    } else {
      reset(defaultProduct);
    }
  }, [templateProduct, reset]);

  const delProduct = async (id) => {
    try {
      await deleteAdminProductApi(id);
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

      const res = await uploadAdminProductImageApi(formData);

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
    const productData = mapFormValuesToProductPayload(formData);

    try {
      setUploadLoading(true);

      if (modalType === "edit") {
        await updateAdminProductApi(formData.id, productData);
      } else {
        await createAdminProductApi(productData);
      }

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
                  <span className="text-danger">{templateProduct?.title}</span>
                  嗎？
                </p>
              ) : (
                <ProductForm
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  onSubmit={onSubmit}
                  closeModal={closeModal}
                  uploadLoading={uploadLoading}
                  uploadImage={uploadImage}
                  imageUrl={imageUrl}
                  fields={fields}
                  imagesUrl={imagesUrl}
                  append={append}
                  remove={remove}
                />
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
                  onClick={() => delProduct(templateProduct.id)}
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
