import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import NotAuth from "./pages/NotAuth/notauth";

function App() {
  const hasCookie = window.hasCookie;
  return (
      <div className="App">
        {!hasCookie.user_id ? <NotAuth />: <DefaultLayout />}
      </div>
  );
}

export default App;