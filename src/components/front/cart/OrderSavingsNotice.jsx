export default function OrderSavingsNotice({ carts = [], total = 0 }) {
  const originTotal = carts.reduce(
    (sum, item) => sum + (item?.product?.origin_price || 0) * (item?.qty || 0),
    0,
  );
  const savings = Math.max(originTotal - total, 0);
  const formatMoney = (amount) => amount.toLocaleString("zh-TW");

  return (
    <p className="mb-0 mt-2 font-zh-display text-success ">
      <small>本筆訂單節省了 NT${formatMoney(savings)}</small>
    </p>
  );
}
