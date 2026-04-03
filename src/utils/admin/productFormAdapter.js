export const defaultProduct = {
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

export function mapProductToFormValues(product) {
  return {
    ...defaultProduct,
    ...product,
    is_enabled: !!product?.is_enabled,
    imagesUrl: product?.imagesUrl?.length > 0 ? product.imagesUrl : [""],
  };
}

export function mapFormValuesToProductPayload(formData) {
  return {
    data: {
      ...formData,
      origin_price: Number(formData.origin_price),
      price: Number(formData.price),
      is_enabled: formData.is_enabled ? 1 : 0,
      imagesUrl: formData.imagesUrl.filter((url) => url !== ""),
    },
  };
}
