import { RouterProvider } from "react-router";
import { router } from "./router/index";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

//import "./assets/style.css";
//import "./styles/main.scss"; // 入口 Sass
import MessageToast from "./components/MessageToast";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // 動畫時間
      once: true, // 是否只播一次
      offset: 120, // 提前多少開始觸發
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <>
      <MessageToast />
      <RouterProvider router={router} />
    </>
  );
}
