import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContexts from "./Contexts/authContexts";
import LoginModal from "./Components/LoginModal";
import PrivateRoute from "./Routes/PrivateRoute";
import Search from "./Components/Search";
import PetContext from "./Contexts/petContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContexts>
          <PetContext>
          <NavBar />
          <LoginModal />
          <Routes>
            <Route path="/" element={<PrivateRoute><Search/></PrivateRoute>}></Route>
            <Route path="/profile"></Route>
            <Route path="/mypets"></Route>
            <Route path="/admin"></Route>
          </Routes>
          </PetContext>
        </AuthContexts>
      </BrowserRouter>
    </div>
  );
}

export default App;
