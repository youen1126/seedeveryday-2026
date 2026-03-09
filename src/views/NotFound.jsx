import { Link } from "react-router";
import notFoundImg from "../../public/seedEveryDayLogo.png";

export default function NotFound() {
  return (
    <main className="nf">
      <section className="nf__hero">
        <div className="nf__overlay" />

        <div className="nf__content container">
          <h1 className="nf__title">啊喔...這一頁走丟了</h1>
          {/* <img src={notFoundImg} style={{ height: "300px" }} /> */}
          <p className="nf__desc">
            我們把自然留在生活裡，但這個連結沒有留下來。
          </p>

          <div className="nf__actions">
            <Link to="/" className="nf__btn nf__btn--primary">
              回到 Home
            </Link>
            <Link to="/products" className="nf__btn nf__btn--ghost">
              前往商品列表
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
