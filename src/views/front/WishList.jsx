import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistItem } from "../../slice/wishlistSlice";
import { Link } from "react-router";

export default function WishList() {
  const dispatch = useDispatch();

  // wishlist 狀態
  const wishList = useSelector((state) => state.wishlist.items);

  // 商品資料（依你專案來源）
  const products = useSelector((state) => state.products.products);

  // 篩選出「有收藏的商品」
  const wishListItems = products.filter((item) => wishList[item.id]);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">我的收藏</h2>

      {/* 🟥 空狀態 */}
      {wishListItems.length === 0 && (
        <div className="text-center py-5">
          <i className="fa-regular fa-heart fs-1 mb-3"></i>
          <p>目前還沒有收藏任何商品</p>
          <Link to="/" className="btn btn-dark mt-3">
            去逛逛
          </Link>
        </div>
      )}

      {/* 🟩 有資料 */}
      <div className="row">
        {wishListItems.map((item) => (
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card h-100 position-relative">
              {/* ❤️ 收藏按鈕 */}
              <button
                type="button"
                className="p-0 border-0 bg-transparent"
                onClick={() => dispatch(toggleWishlistItem(item.id))}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 2,
                }}
              >
                <i className="fa-solid fa-heart text-danger"></i>
              </button>

              {/* 商品圖片 */}
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.title}
                />
              </Link>

              {/* 商品資訊 */}
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">NT$ {item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
