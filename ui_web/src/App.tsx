import React from "react";

import "./styles/global.scss";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { ErrorBoundary } from "./pages/errorBoundary";
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <DefaultLayout />
      </ErrorBoundary>
    </div>
  );
}

export default App;
