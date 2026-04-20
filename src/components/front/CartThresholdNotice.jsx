export default function CartThresholdNotice({ total = 0, className = "" }) {
  const freeShippingThreshold = 1000;
  const giftThreshold = 2500;
  const freeShippingRemaining = Math.max(freeShippingThreshold - total, 0);
  const giftRemaining = Math.max(giftThreshold - total, 0);
  const formatMoney = (amount) => amount.toLocaleString("zh-TW");

  return (
    <div className={`bg-light px-3 py-3 mt-3 ${className}`.trim()}>
      <p
        className={`mb-2 font-zh-display ${
          freeShippingRemaining > 0 ? "text-danger" : "text-success"
        }`}
      >
        {freeShippingRemaining > 0
          ? `再消費 NT$${formatMoney(freeShippingRemaining)} 即可享滿千免運`
          : "已達免運金額門檻"}
      </p>
      <p
        className={`mb-0 font-zh-display ${
          giftRemaining > 0 ? "text-danger" : "text-success"
        }`}
      >
        {giftRemaining > 0
          ? `再消費 NT$${formatMoney(giftRemaining)} 即可享滿 2500 贈品`
          : "已達贈品金額門檻"}
      </p>
    </div>
  );
}
