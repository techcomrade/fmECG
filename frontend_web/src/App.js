import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { useCookies } from "react-cookie";
import NotAuth from "./pages/NotAuth/notauth";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [cookies, setCookie] = useCookies();
  console.log(cookies);
  
  return (
    <BrowserRouter>
      <div className="App">
        {!cookies ? <NotAuth />: <DefaultLayout />}
      </div>
    </BrowserRouter>
  );
}

export default App;