import Header from "../components/front/Header";
import Footer from "../components/front/Footer";
import { Outlet } from "react-router";

export default function FrontendLayout() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
