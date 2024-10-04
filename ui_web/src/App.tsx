import React from "react";

import "./styles/global.scss";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { ErrorBoundary } from "./pages/errorBoundary";
import { HashRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import './config/i18n'; // Import cấu hình i18n
import { store } from "./redux/store";
function App() {
  return (
   <ReduxProvider store={store}>
     <HashRouter>
      <ErrorBoundary>
        <DefaultLayout />
      </ErrorBoundary>
    </HashRouter>
   </ReduxProvider>
  );
}

export default App;
