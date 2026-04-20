import { forwardRef } from "react";

const AddToCartButton = forwardRef(function AddToCartButton(
  {
    onClick,
    className = "btn btn-dark",
    disabled = false,
    children = "加入購物車",
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});

export default AddToCartButton;
