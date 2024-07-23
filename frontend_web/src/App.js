import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import NotAuth from "./pages/NotAuth/notauth";
import React, { useState, useEffect } from 'react';




function App() {
  const hasCookie = window.hasCookie;
  return (
      <div className="App">
        {!hasCookie.user_id || hasCookie.user_id === "null" ? <NotAuth />: <DefaultLayout />}
      </div>
  );
}

export default App;