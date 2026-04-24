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
  const handleClick = (event) => {
    if (typeof window !== "undefined") {
      const { currentTarget } = event;
      const rect = currentTarget?.getBoundingClientRect?.();
      if (rect) {
        window.dispatchEvent(
          new CustomEvent("cart-fly:start", {
            detail: {
              fromRect: {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
              },
            },
          }),
        );
      }
    }

    onClick?.(event);
  };

  return (
    <button
      ref={ref}
      type={type}
      className={className}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});

export default AddToCartButton;
