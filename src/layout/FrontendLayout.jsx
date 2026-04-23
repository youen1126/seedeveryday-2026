import Header from "../components/front/Header";
import Footer from "../components/front/Footer";
import CartFlyToIconEffect from "../components/front/CartFlyToIconEffect";
import { Outlet } from "react-router";

export default function FrontendLayout() {
  return (
    <div className="app-wrapper">
      <Header />
      <CartFlyToIconEffect />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
