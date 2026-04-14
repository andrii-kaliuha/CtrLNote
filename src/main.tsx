// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./store/store";
// import "./shared/i18n/i18n";
// import { App } from "./App";
// import "@fontsource/roboto/index.css";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./shared/i18n/i18n";
import { App } from "./App";
import "@fontsource/roboto/index.css";
import "./index.css";

// Додаємо імпорт для реєстрації PWA
// import { regis } from "virtual:vite-plugin-pwa/register";
import { registerSW } from "virtual:pwa-register";

// Реєструємо сервіс-воркер.
// immediate: true змушує його активуватися миттєво.
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
