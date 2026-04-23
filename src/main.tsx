import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./shared/i18n/i18n";
import { App } from "./app/App";
import "@fontsource/roboto/index.css";
import "./index.css";

import { registerSW } from "virtual:pwa-register";
import { store } from "./app/store/store";
import { initializeApp } from "./app/store/initializeApp";

registerSW({ immediate: true });

initializeApp(store.dispatch).then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
});
