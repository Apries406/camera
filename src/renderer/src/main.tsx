import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/base.scss";
import useDrag from "./utils/useDrag"; // 引入拖拽功能
const { drag } = useDrag(); // 实例化拖拽功能
drag.run();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
