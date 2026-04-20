import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import AddToCartButton from "@/components/front/AddToCartButton";
import YoumaylikeSwiper from "@/components/front/YoumaylikeSwiper";
import useMessage from "@/hooks/useMessage";
import { createAsyncAddCart } from "@/slice/cartSlice";
import { toggleWishlistItem } from "@/slice/wishlistSlice";

export default function WishList() {
  const dispatch = useDispatch();
  const { showSuccess } = useMessage();

  // wishlist 狀態
  const wishList = useSelector((state) => state.wishlist.items);

  // 商品資料（依你專案來源）
  const products = useSelector((state) => state.products.products);

  // 篩選出「有收藏的商品」
  const wishListItems = products.filter((item) => wishList[item.id]);

  //將商品加入購物車
  const handleAddCart = (e, id, qty = 1) => {
    e.preventDefault();
    dispatch(
      createAsyncAddCart({
        id,
        qty,
      }),
    );
    showSuccess("成功加入購物車");
  };

  return (
    <>
      <div className="container py-5">
        <h2 className="mb-4 text-center font-zh-display fw-bold">收藏列表</h2>

        {/* 空狀態 */}
        {wishListItems.length === 0 && (
          <div className="text-center py-5">
            <h1>
              <i className="fa-sharp fa-regular fa-heart text-secondary"></i>
            </h1>
            <p>目前還沒有收藏任何商品</p>
            <Link to="/product" className="btn btn-dark mt-3">
              去逛逛
            </Link>
          </div>
        )}

        {/* 有資料 */}
        <div className="row">
          {wishListItems.map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="card h-100 position-relative">
                {/* 收藏按鈕 */}
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
                  <i className="fa-solid fa-heart"></i>
                </button>

                {/* 商品圖片 */}

                <Link to={`/product/${item.id}`}>
                  <div className="img-hover ">
                    <img
                      src={item.imageUrl}
                      className="card-img-top rounded-0 img-size-middle"
                      alt={item.title}
                    />
                  </div>
                </Link>

                {/* 商品資訊 */}
                <div className="card-body font-zh-display">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">NT$ {item.price}</p>
                  <div className="py-3">
                    <AddToCartButton
                      className="text-nowrap btn btn-dark w-20 p-2"
                      onClick={(e) => handleAddCart(e, item.id)}
                    >
                      加入購物車
                    </AddToCartButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <YoumaylikeSwiper />
    </>
  );
}
