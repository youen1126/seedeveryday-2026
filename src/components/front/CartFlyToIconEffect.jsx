import { useEffect, useRef, useState } from "react";

const FLY_ANIMATION_MS = 700;

function isElementVisible(element) {
  if (!element) {
    return false;
  }

  if (element.getClientRects().length === 0) {
    return false;
  }

  const styles = window.getComputedStyle(element);
  return (
    styles.display !== "none" &&
    styles.visibility !== "hidden" &&
    styles.opacity !== "0"
  );
}

function getElementCenter(rect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function getActiveCartEntryCenter() {
  const entries = Array.from(document.querySelectorAll("[data-cart-entry='true']"));
  const visibleEntry = entries.find((element) => isElementVisible(element));

  if (!visibleEntry) {
    return null;
  }

  return getElementCenter(visibleEntry.getBoundingClientRect());
}

export default function CartFlyToIconEffect() {
  const [sprites, setSprites] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleFly = (event) => {
      const targetPoint = getActiveCartEntryCenter();
      const fromRect = event.detail?.fromRect;

      if (!targetPoint || !fromRect) {
        return;
      }

      const startPoint = getElementCenter(fromRect);
      const id = idRef.current + 1;
      idRef.current = id;

      setSprites((prev) => [
        ...prev,
        {
          id,
          x: startPoint.x,
          y: startPoint.y,
          dx: targetPoint.x - startPoint.x,
          dy: targetPoint.y - startPoint.y,
        },
      ]);

      window.setTimeout(() => {
        setSprites((prev) => prev.filter((sprite) => sprite.id !== id));
      }, FLY_ANIMATION_MS);
    };

    window.addEventListener("cart-fly:start", handleFly);

    return () => {
      window.removeEventListener("cart-fly:start", handleFly);
    };
  }, []);

  return (
    <div className="cart-fly-layer" aria-hidden="true">
      {sprites.map((sprite) => (
        <span
          key={sprite.id}
          className="cart-fly-sprite"
          style={{
            left: `${sprite.x}px`,
            top: `${sprite.y}px`,
            "--cart-fly-dx": `${sprite.dx}px`,
            "--cart-fly-dy": `${sprite.dy}px`,
          }}
        >
          <i className="fas fa-shopping-cart"></i>
        </span>
      ))}
    </div>
  );
}
