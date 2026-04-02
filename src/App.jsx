import { RouterProvider } from "react-router";
import { router } from "./router/index";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import MessageToast from "./components/MessageToast";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
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
