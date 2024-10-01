import React from "react";

import "./styles/global.scss";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { ErrorBoundary } from "./pages/errorBoundary";
import { HashRouter } from "react-router-dom";
import './config/i18n'; // Import cấu hình i18n
function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <DefaultLayout />
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
