import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

export default function FrontendLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
