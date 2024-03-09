import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { useCookies } from "react-cookie";
import NotAuth from "./pages/NotAuth/notauth";
import { Router } from "react-router-dom";

function App() {
  const [cookies, setCookie] = useCookies();

  return (
    <Router>
      <div className="App">
        {!cookies ? <NotAuth />: <DefaultLayout />}
      </div>
    </Router>
  );
}

export default App;