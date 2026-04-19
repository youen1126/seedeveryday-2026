import { Link } from "react-router";

const hotCategoryCards = [
  {
    category: "種子串",
    image:
      "https://i.pinimg.com/736x/89/d9/da/89d9daecc3cc675b98d8f03d0e033e29.jpg",
    alt: "分類示意圖：種子串",
    description:
      "以天然種子串製而成，保留大地色澤與自然紋理，呈現素雅輕盈的手作氣質。",
  },
  {
    category: "種子小物",
    image:
      "https://i.pinimg.com/1200x/b0/7c/e3/b07ce3b50a259a58588d7546dc086595.jpg",
    alt: "分類示意圖：種子小物",
    description: "將天然種子做成各式裝飾物，適合當作無負擔又富含心意的小禮物",
  },
  {
    category: "壓花",
    image:
      "https://i.pinimg.com/1200x/9d/9f/6f/9d9f6fff4ff44de3769f148684842e9c.jpg",
    alt: "分類示意圖：壓花",
    description:
      "我們挑選花形與色澤各具特色的植物，適合作為桌面小物、送給喜歡自然與手作的人。",
  },
];

export default function HotCategories() {
  return (
    <div className="container my-5">
      <h2 className="mb-5 text-center font-zh-display fw-bold ">熱門分類</h2>
      <div className="row">
        {hotCategoryCards.map((item) => (
          <div className="col-md-4 mb-4 card-hover hot-category-card" key={item.category}>
            <Link
              to={`/products?category=${encodeURIComponent(item.category)}`}
              className="text-decoration-none text-dark d-block"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="hot-category-image"
                data-aos="flip-left"
                loading="lazy"
              />
              <h4 className="hot-category-title font-zh-display fw-bold ">
                {item.category}
              </h4>
              <p className="text-muted hot-category-text my-3">{item.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
