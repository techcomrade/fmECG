import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import NotAuth from "./pages/NotAuth/notauth";
import { BrowserRouter } from "react-router-dom";

function App() {
  
  const hasCookie = window.hasCookie;
  return (
    <BrowserRouter>
      <div className="App">
        {/* {!hasCookie ? <NotAuth />: <DefaultLayout />} */}
        <DefaultLayout />
      </div>
    </BrowserRouter>
  );
}

export default App;